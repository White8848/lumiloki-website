import { motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'
import GlowCard from '../components/ui/GlowCard'
import GlowButton from '../components/ui/GlowButton'
import ScrollReveal from '../components/ui/ScrollReveal'
import styles from './CareersPage.module.css'

const benefits = [
  {
    icon: '🚀',
    title: '创新文化',
    description: '鼓励大胆尝试，每个人的创意都有机会变成产品。',
  },
  {
    icon: '🌱',
    title: '成长空间',
    description: '完善的培训体系与晋升通道，助你持续进阶。',
  },
  {
    icon: '🤝',
    title: '扁平管理',
    description: '没有层级壁垒，开放透明的沟通，高效协作。',
  },
  {
    icon: '🎁',
    title: '丰厚福利',
    description: '有竞争力的薪酬、弹性工作、团建旅行、免费零食。',
  },
]

interface Job {
  title: string
  department: string
  location: string
  type: string
}

const jobs: { category: string; positions: Job[] }[] = [
  {
    category: '研发工程',
    positions: [
      { title: '嵌入式软件工程师', department: '研发部', location: '深圳', type: '全职' },
      { title: '硬件电路工程师', department: '研发部', location: '深圳', type: '全职' },
      { title: '前端开发工程师', department: '研发部', location: '深圳 / 远程', type: '全职' },
    ],
  },
  {
    category: '设计创意',
    positions: [
      { title: '工业设计师', department: '设计部', location: '深圳', type: '全职' },
      { title: 'UI/UX 设计师', department: '设计部', location: '深圳', type: '全职' },
    ],
  },
  {
    category: '市场营销',
    positions: [
      { title: '品牌营销经理', department: '市场部', location: '深圳', type: '全职' },
      { title: '社交媒体运营', department: '市场部', location: '深圳 / 远程', type: '全职' },
      { title: '短视频创作者', department: '市场部', location: '深圳', type: '全职 / 实习' },
    ],
  },
  {
    category: '运营支持',
    positions: [
      { title: '供应链管理专员', department: '运营部', location: '深圳', type: '全职' },
      { title: '客户成功经理', department: '运营部', location: '深圳', type: '全职' },
    ],
  },
]

const processSteps = [
  { step: '01', title: '投递简历', description: '发送简历至招聘邮箱' },
  { step: '02', title: '简历筛选', description: '1-3 个工作日内反馈' },
  { step: '03', title: '面试沟通', description: '1-2 轮技术与文化面试' },
  { step: '04', title: '发放 Offer', description: '欢迎加入 Lumiloki' },
]

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            加入 LUMILOKI
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            与热爱创新的团队一起，点亮未来
          </motion.p>
        </div>
      </div>

      <div className="container">
        <div className={styles.section}>
          <SectionHeading
            label="为什么选择我们"
            title="在这里，做有意义的事"
            subtitle="我们相信好的产品来自好的团队，好的团队需要好的环境"
          />
          <div className={styles.benefitsGrid}>
            {benefits.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <GlowCard className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>{item.icon}</div>
                  <h3 className={styles.benefitTitle}>{item.title}</h3>
                  <p className={styles.benefitDesc}>{item.description}</p>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <SectionHeading
            label="在招职位"
            title="找到属于你的位置"
            subtitle="我们正在寻找志同道合的伙伴"
          />
          <div className={styles.jobList}>
            {jobs.map((group, groupIndex) => (
              <ScrollReveal key={group.category} delay={groupIndex * 0.1}>
                <div className={styles.jobGroup}>
                  <h3 className={styles.jobCategory}>{group.category}</h3>
                  <div className={styles.jobCards}>
                    {group.positions.map((job) => (
                      <GlowCard key={job.title} className={styles.jobCard}>
                        <div className={styles.jobInfo}>
                          <h4 className={styles.jobTitle}>{job.title}</h4>
                          <div className={styles.jobMeta}>
                            <span className={styles.jobTag}>{job.department}</span>
                            <span className={styles.jobTag}>{job.location}</span>
                            <span className={styles.jobTag}>{job.type}</span>
                          </div>
                        </div>
                        <a href="mailto:hr@lumiloki.com" className={styles.jobApply}>
                          投递
                        </a>
                      </GlowCard>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <SectionHeading
            label="招聘流程"
            title="简单透明的流程"
          />
          <div className={styles.processGrid}>
            {processSteps.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.1}>
                <div className={styles.processItem}>
                  <div className={styles.processStep}>{item.step}</div>
                  <h4 className={styles.processTitle}>{item.title}</h4>
                  <p className={styles.processDesc}>{item.description}</p>
                  {index < processSteps.length - 1 && (
                    <div className={styles.processArrow}>→</div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>没有找到合适的职位？</h2>
            <p className={styles.ctaText}>
              我们随时欢迎优秀的人才。发送你的简历至
              <a href="mailto:hr@lumiloki.com" className={styles.ctaEmail}> hr@lumiloki.com</a>
              ，让我们认识你。
            </p>
            <GlowButton onClick={() => window.location.href = 'mailto:hr@lumiloki.com'} size="large">
              发送简历
            </GlowButton>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
