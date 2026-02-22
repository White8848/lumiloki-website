interface Env {
  RESEND_API_KEY: string
  TO_EMAIL: string
  ALLOWED_ORIGINS: string
}

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(email: string): boolean {
  // 限制长度防止 ReDoS 攻击
  if (email.length > 254) return false
  // 基础格式检查：包含 @，@ 前后都有内容，@ 后有点
  const atIndex = email.indexOf('@')
  if (atIndex < 1 || atIndex === email.length - 1) return false
  const domain = email.slice(atIndex + 1)
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) return false
  // 不允许空格
  if (email.includes(' ')) return false
  return true
}

function validateFormData(data: unknown): ContactFormData {
  if (!data || typeof data !== 'object') {
    throw new Error('无效的表单数据')
  }

  const form = data as Record<string, unknown>

  if (typeof form.name !== 'string' || !form.name.trim()) {
    throw new Error('请输入姓名')
  }
  if (typeof form.email !== 'string' || !isValidEmail(form.email)) {
    throw new Error('请输入有效的邮箱地址')
  }
  if (typeof form.message !== 'string' || !form.message.trim()) {
    throw new Error('请输入留言内容')
  }

  return {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: typeof form.phone === 'string' ? form.phone.trim() : undefined,
    subject: typeof form.subject === 'string' ? form.subject.trim() : '网站咨询',
    message: form.message.trim(),
  }
}

function getCorsHeaders(origin: string | null, allowedOrigins: string): HeadersInit {
  const allowed = allowedOrigins.split(',').map(o => o.trim())
  const isAllowed = origin && allowed.includes(origin)

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowed[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin')
    const corsHeaders = getCorsHeaders(origin, env.ALLOWED_ORIGINS)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: '只支持 POST 请求' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    try {
      const rawData = await request.json()
      const formData = validateFormData(rawData)

      const emailHtml = `
        <h2>网站联系表单 - ${escapeHtml(formData.subject)}</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">姓名</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(formData.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">邮箱</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(formData.email)}</td>
          </tr>
          ${formData.phone ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">电话</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(formData.phone)}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">主题</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(formData.subject)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">留言内容</td>
            <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(formData.message)}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          此邮件由 Lumiloki 官网联系表单自动发送
        </p>
      `

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Lumiloki 官网 <noreply@lumiloki.com>',
          to: env.TO_EMAIL,
          reply_to: formData.email,
          subject: `[官网咨询] ${formData.subject} - ${formData.name}`,
          html: emailHtml,
        }),
      })

      if (!resendResponse.ok) {
        throw new Error('邮件发送失败，请稍后重试')
      }

      return new Response(
        JSON.stringify({ success: true, message: '留言已发送，我们会尽快回复您！' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : '提交失败，请稍后重试'
      return new Response(
        JSON.stringify({ error: message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  },
}
