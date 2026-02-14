import type { NewsArticle } from '../types/news'

import newsLaunchImg from '../assets/images/news/news-launch.svg'
import newsCompetitionImg from '../assets/images/news/news-competition.svg'
import newsTechImg from '../assets/images/news/news-tech.svg'
import newsCollabImg from '../assets/images/news/news-collab.svg'
import newsAppImg from '../assets/images/news/news-app.svg'

export const newsArticles: NewsArticle[] = [
  {
    id: 'lumi-pro-launch',
    title: 'Lumi Pro 旗舰版正式发布：重新定义智能魔方',
    summary:
      '经过两年的研发打磨，Lumi Pro 带来全面升级的六轴传感器、全面LED矩阵和BLE 5.0蓝牙连接，为魔方爱好者开启全新体验。',
    content: `经过两年的深入研发和反复打磨，我们非常激动地宣布 Lumi Pro 旗舰版正式发布！

作为 Lumiloki 的旗舰之作，Lumi Pro 在硬件和软件层面都实现了全面升级。全新的六轴高精度传感器模组，能够以毫秒级精度追踪你的每一次旋转操作。配合覆盖魔方全部54个可见面的RGB LED矩阵，实现了真正意义上的"全面发光"。

在连接性方面，Lumi Pro 采用BLE 5.0低功耗蓝牙技术，不仅连接更稳定，延迟也降低到了前所未有的水平。配合全新升级的Lumiloki APP，支持实时计时、3D复盘回放、在线对战等丰富功能。

800mAh大容量锂电池确保了20小时以上的续航能力，Type-C快充接口让充电更加便捷。此外，Lumi Pro 还支持OTA空中固件升级，未来将持续获得新功能和灯效更新。

Lumi Pro 现已正式开售，首发价 ¥599。`,
    category: '产品发布',
    date: '2024-03-15',
    emoji: '🚀',
    image: newsLaunchImg,
    featured: true,
  },
  {
    id: 'speed-cup-2024',
    title: 'Lumiloki Speed Cup 2024 线上赛圆满落幕',
    summary:
      '首届 Lumiloki Speed Cup 线上速拧比赛吸引了来自15个国家的1200名选手参赛，冠军以6.82秒的成绩刷新平台纪录。',
    content: `首届 Lumiloki Speed Cup 线上速拧比赛圆满落幕！

本次比赛吸引了来自全球15个国家的1200名魔方爱好者参赛，比赛通过Lumiloki APP进行，所有数据由智能魔方实时采集，确保了比赛的公平性和精准性。

经过预赛、复赛和决赛三轮激烈角逐，来自中国的选手 CubeKing 以6.82秒的惊人成绩夺得冠军，同时刷新了平台最快纪录。

我们还在比赛中首次启用了"灯效挑战赛"特别赛道，选手需要在旋转过程中完成指定灯效图案，兼顾速度与创意。这一全新赛制获得了参赛者的一致好评。

感谢所有参赛选手和观众的热情参与！Lumiloki Speed Cup 将成为年度常规赛事，下一届比赛预计在今年秋季举行。`,
    category: '品牌活动',
    date: '2024-02-20',
    emoji: '🏆',
    image: newsCompetitionImg,
  },
  {
    id: 'sensor-tech',
    title: '深度解析：Lumiloki 六轴传感器技术原理',
    summary:
      '本文详细解析了Lumiloki自研六轴传感器模组的工作原理，以及如何在毫秒级精度下实现魔方旋转的实时追踪。',
    content: `今天我们来深入聊聊 Lumiloki 的核心技术之一——六轴传感器模组。

传统的智能魔方通常依赖磁铁和霍尔传感器来检测旋转，但这种方案在精度和响应速度上存在天然限制。Lumiloki 另辟蹊径，采用了自研的六轴IMU（惯性测量单元），将三轴加速度计和三轴陀螺仪集成在微小的芯片中。

通过先进的传感器融合算法，我们能够在1毫秒内精确判断每一层的旋转方向和角度。这意味着即使是最快的速拧操作（TPS超过10），也不会出现丢步或误判。

在硬件层面，我们为每一层都配备了独立的传感器模组，并通过高速I2C总线与主控芯片通信。主控芯片上运行的实时操作系统确保了传感器数据的低延迟处理。

这套技术方案的另一个优势是支持手势识别——摇动魔方可以切换灯效模式，双击可以开始/暂停计时。未来我们还会开放更多手势自定义功能。`,
    category: '技术分享',
    date: '2024-01-10',
    emoji: '🔬',
    image: newsTechImg,
  },
  {
    id: 'collab-streetwear',
    title: 'Lumiloki × URBAN CUBE 联名系列即将发售',
    summary:
      '与知名街头潮牌 URBAN CUBE 达成联名合作，限量版将于下月正式发售，融合街头文化与智能科技。',
    content: `我们非常高兴地宣布，Lumiloki 与知名街头潮牌 URBAN CUBE 的联名合作正式达成！

Lumi Neo 联名版将融合 URBAN CUBE 标志性的涂鸦艺术风格和 Lumiloki 的智能灯效技术，打造一款独一无二的潮流科技单品。

联名版采用特别定制的涂装配色方案，由 URBAN CUBE 设计团队亲自操刀。同时，我们还为联名版专门开发了一套街头风格灯效主题，霓虹灯管、波普色块、涂鸦线条等元素将以灯光形式在魔方上呈现。

全球限量1000台，每台附赠联名礼盒、限定贴纸套装和联名帆布袋。预计下月正式开售，具体日期请关注我们的社交媒体。`,
    category: '产品发布',
    date: '2024-01-05',
    emoji: '🎨',
    image: newsCollabImg,
  },
  {
    id: 'app-update-3',
    title: 'Lumiloki APP 3.0 大版本更新：全新UI与社交功能',
    summary:
      'APP 3.0 带来全面重设计的用户界面、好友系统、实时对战匹配和成绩分享功能，让魔方社交更有趣。',
    content: `Lumiloki APP 3.0 现已上线！这是迄今为止最大的一次版本更新。

全新设计的用户界面更加直观易用，深色主题与魔方灯效完美呼应。首页增加了个人数据面板，你的练习时长、平均成绩、进步曲线一目了然。

社交功能是3.0版本的最大亮点。新增好友系统让你可以关注其他玩家、查看他们的成绩和灯效作品。实时对战匹配功能支持1v1速拧对决，系统会根据你的实力自动匹配对手。

成绩分享功能让你可以一键生成精美的成绩卡片，分享到微信、微博等社交平台。卡片包含你的成绩、使用的魔方型号和当时的灯效截图。

此外，APP 3.0 还引入了成就系统、每日挑战和赛季排行榜等玩法，让日常练习更有动力。`,
    category: '技术分享',
    date: '2023-12-20',
    emoji: '📱',
    image: newsAppImg,
  },
]

export const newsCategories = ['全部', '产品发布', '品牌活动', '技术分享'] as const
