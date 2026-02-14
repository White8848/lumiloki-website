import { Link } from 'react-router-dom'
import { SiWechat, SiSinaweibo, SiTiktok, SiBilibili, SiXiaohongshu } from 'react-icons/si'
import { SOCIAL_LINKS } from '../../utils/constants'
import styles from './Footer.module.css'

const socialIconMap: Record<string, React.ReactNode> = {
  wechat: <SiWechat />,
  weibo: <SiSinaweibo />,
  douyin: <SiTiktok />,
  bilibili: <SiBilibili />,
  xiaohongshu: <SiXiaohongshu />,
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3>LUMILOKI</h3>
            <p>
              点亮你的每一次旋转。Lumiloki
              将前沿科技与潮流设计融合，重新定义魔方体验。
            </p>
          </div>

          <div className={styles.column}>
            <h4>产品</h4>
            <ul>
              <li><Link to="/products">全部产品</Link></li>
              <li><Link to="/products">经典系列</Link></li>
              <li><Link to="/products">竞速系列</Link></li>
              <li><Link to="/products">限定版</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>公司</h4>
            <ul>
              <li><Link to="/brand">品牌故事</Link></li>
              <li><Link to="/news">新闻动态</Link></li>
              <li><Link to="/contact">联系我们</Link></li>
              <li><Link to="/careers">招贤纳士</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>社交媒体</h4>
            <div className={styles.socialLinks}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className={styles.socialLink}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialIconMap[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Lumiloki. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#">隐私政策</a>
            <a href="#">使用条款</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
