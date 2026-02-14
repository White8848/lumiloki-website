import { useState, type FormEvent } from 'react'
import { SiWechat, SiSinaweibo, SiTiktok, SiBilibili, SiXiaohongshu } from 'react-icons/si'
import SectionHeading from '../components/ui/SectionHeading'
import GlowButton from '../components/ui/GlowButton'
import GlowCard from '../components/ui/GlowCard'
import ScrollReveal from '../components/ui/ScrollReveal'
import { SOCIAL_LINKS } from '../utils/constants'
import { cn } from '../utils/cn'
import styles from './ContactPage.module.css'

const socialIconMap: Record<string, React.ReactNode> = {
  wechat: <SiWechat />,
  weibo: <SiSinaweibo />,
  douyin: <SiTiktok />,
  bilibili: <SiBilibili />,
  xiaohongshu: <SiXiaohongshu />,
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '产品咨询',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = '请输入姓名'
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }
    if (!formData.message.trim()) newErrors.message = '请输入留言内容'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className={cn('container', styles.page)}>
      <SectionHeading
        label="联系我们"
        title="期待你的消息"
        subtitle="有任何问题、建议或合作意向，欢迎随时联系我们"
      />

      <div className={styles.grid}>
        <ScrollReveal direction="left">
          {submitted ? (
            <div className={styles.success}>
              感谢你的留言！我们会在 1-2 个工作日内回复你。
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>姓名 *</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="你的姓名"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>邮箱 *</label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>电话</label>
                <input
                  className={styles.input}
                  type="tel"
                  placeholder="你的联系电话（选填）"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>主题</label>
                <select
                  className={styles.select}
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                >
                  <option>产品咨询</option>
                  <option>售后服务</option>
                  <option>商务合作</option>
                  <option>媒体采访</option>
                  <option>其他</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>留言 *</label>
                <textarea
                  className={styles.textarea}
                  placeholder="请输入你的留言..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                />
                {errors.message && (
                  <span className={styles.error}>{errors.message}</span>
                )}
              </div>

              <GlowButton type="submit" size="large">
                发送消息
              </GlowButton>
            </form>
          )}
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.2}>
          <div className={styles.sidebar}>
            <GlowCard className={styles.infoCard}>
              <h3 className={styles.infoTitle}>联系信息</h3>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📧</span>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>邮箱</span>
                  <span className={styles.infoValue}>hello@lumiloki.com</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📞</span>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>电话</span>
                  <span className={styles.infoValue}>400-888-LUMI</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📍</span>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>地址</span>
                  <span className={styles.infoValue}>
                    深圳市南山区科技园创新大厦 18F
                  </span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>🕐</span>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>工作时间</span>
                  <span className={styles.infoValue}>
                    周一至周五 9:00 - 18:00
                  </span>
                </div>
              </div>
            </GlowCard>

            <GlowCard className={styles.socialCard}>
              <h3 className={styles.socialTitle}>关注我们</h3>
              <div className={styles.socialGrid}>
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className={styles.socialItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.socialItemIcon}>
                      {socialIconMap[social.icon]}
                    </span>
                    <span className={styles.socialItemLabel}>
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </GlowCard>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
