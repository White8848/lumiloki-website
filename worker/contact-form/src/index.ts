import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'

interface Env {
  EMAIL_SENDER: SendEmail
  FROM_EMAIL: string
  TO_EMAIL: string
  ALLOWED_ORIGINS: string
}

interface SendEmail {
  send(message: EmailMessage): Promise<void>
}

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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

function buildEmailContent(formData: ContactFormData): string {
  const phoneRow = formData.phone
    ? `电话: ${formData.phone}\n`
    : ''

  return `
网站联系表单 - ${formData.subject}
================================

姓名: ${formData.name}
邮箱: ${formData.email}
${phoneRow}主题: ${formData.subject}

留言内容:
${formData.message}

--------------------------------
此邮件由 Lumiloki 官网联系表单自动发送
`.trim()
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

      const msg = createMimeMessage()
      msg.setSender({ name: 'Lumiloki 官网', addr: env.FROM_EMAIL })
      msg.setRecipient(env.TO_EMAIL)
      msg.setSubject(`[官网咨询] ${formData.subject} - ${formData.name}`)
      msg.setHeader('Reply-To', formData.email)
      msg.addMessage({
        contentType: 'text/plain',
        data: buildEmailContent(formData),
      })

      const emailMessage = new EmailMessage(env.FROM_EMAIL, env.TO_EMAIL, msg.asRaw())
      await env.EMAIL_SENDER.send(emailMessage)

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
