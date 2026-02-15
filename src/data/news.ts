import type { NewsArticle } from '../types/news'

import newsLaunchImg from '../assets/images/news/news-launch.webp'
import newsCompetitionImg from '../assets/images/news/news-competition.webp'
import newsTechImg from '../assets/images/news/news-tech.webp'
import newsCollabImg from '../assets/images/news/news-collab.webp'
import newsAppImg from '../assets/images/news/news-app.webp'
import newsGoLaunchImg from '../assets/images/news/news-go-launch.webp'
import newsGoAiImg from '../assets/images/news/news-go-ai.webp'
import newsGoCupImg from '../assets/images/news/news-go-cup.webp'
import newsBrand2025Img from '../assets/images/news/news-brand-2025.webp'

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
  {
    id: 'lumi-go-launch',
    title: 'Lumiloki 进军智能棋盘：Lumi Go 发布',
    summary:
      '从魔方到棋盘，Lumiloki 正式发布首款智能围棋产品 Lumi Go，19×19路LED棋盘搭载AI对弈引擎，开启智能棋类新篇章。',
    content: `Lumiloki 今天正式宣布进军智能棋盘领域，发布首款智能围棋产品 Lumi Go！

这是 Lumiloki 品牌发展史上的重要里程碑。从2021年创立至今，我们一直在用科技重新定义传统玩具的体验。继智能发光魔方获得全球玩家认可后，我们将目光投向了拥有数千年历史的围棋。

Lumi Go 搭载 19×19路标准围棋棋盘，每个交叉点都嵌入了独立RGB LED。内置的围棋AI引擎达到业余5段水平，支持让子对弈和实时形势判断。Wi-Fi 6模块让你随时接入云端棋谱库和在线对弈平台。

电容感应矩阵技术实现了精准的落子识别，无需特殊棋子，普通围棋子即可使用。5000mAh大容量电池确保了8小时以上的续航。

同步发布的还有入门版 Lumi Go Lite（9/13路可切换）和智能国际象棋 Lumi Chess，三款产品共同组成 Lumiloki 智能棋类产品线。

Lumi Go 首发价 ¥1,299，即日起接受预订。`,
    category: '产品发布',
    date: '2025-09-15',
    emoji: '⚫',
    image: newsGoLaunchImg,
    featured: true,
  },
  {
    id: 'go-ai-engine',
    title: '牵手围棋AI实验室：Lumi Go 引擎技术揭秘',
    summary:
      'Lumiloki 与顶尖围棋AI研究团队合作，为 Lumi Go 打造了高效能的端侧围棋引擎，本文深入揭秘其背后的技术架构。',
    content: `今天我们来深入聊聊 Lumi Go 背后的围棋AI引擎技术。

为了在有限的嵌入式算力上实现高水平的围棋AI，Lumiloki 与国内顶尖的围棋AI研究团队展开了深度合作。经过半年多的联合攻关，我们成功将原本需要高性能GPU运行的围棋神经网络，压缩到可以在 ARM Cortex-A53 芯片上流畅运行。

核心技术突破包括：

1. 模型量化与剪枝：将原始模型体积压缩了95%，推理速度提升8倍，同时棋力损失控制在0.5段以内。

2. 动态搜索深度：根据棋局复杂度自动调整蒙特卡洛树搜索的深度，在关键局面投入更多算力。

3. 端云协同：日常对弈使用端侧引擎（业余5段），联网时可调用云端更强的引擎进行深度分析。

4. 增量学习：AI引擎会根据用户的对弈记录逐步调整策略，让陪练体验更加个性化。

目前 Lumi Go 的端侧引擎在标准测试中稳定达到业余5段水平，在部分局面下甚至可以挑战业余6段。后续我们会通过OTA持续优化引擎性能。`,
    category: '技术分享',
    date: '2025-10-20',
    emoji: '🧠',
    image: newsGoAiImg,
  },
  {
    id: 'lumi-go-cup-2025',
    title: '首届 Lumi Go Cup 线上围棋赛开启报名',
    summary:
      '首届 Lumi Go Cup 线上围棋赛正式开启报名，面向所有 Lumi Go 用户，设置入门组和进阶组，总奖池超5万元。',
    content: `首届 Lumi Go Cup 线上围棋赛正式开启报名！

继 Lumiloki Speed Cup 魔方赛事的成功举办后，我们很高兴地宣布，专为 Lumi Go 用户打造的线上围棋赛事——Lumi Go Cup 正式启动。

赛事详情：
- 报名时间：2025年11月10日 - 11月30日
- 比赛时间：2025年12月6日 - 12月22日（周末进行）
- 参赛要求：拥有 Lumi Go 或 Lumi Go Lite 设备
- 分组设置：入门组（9路/13路）、进阶组（19路）
- 赛制：瑞士制积分赛 + 淘汰赛
- 总奖池：超过5万元（实物奖品 + 现金奖励）

所有比赛将通过 Lumi Go 设备进行，AI裁判系统自动记录棋谱并判定胜负，确保比赛公平公正。观众可以通过 Lumiloki APP 实时观战，体验AI解说功能。

入门组特别为围棋新手设计，使用9路或13路小棋盘，鼓励更多人迈出围棋竞技的第一步。

扫描APP内赛事页面即可报名。让我们在棋盘上一决高下！`,
    category: '赛事报道',
    date: '2025-11-10',
    emoji: '🏆',
    image: newsGoCupImg,
  },
  {
    id: 'brand-review-2025',
    title: 'Lumiloki 2025 年度回顾：从魔方到棋盘',
    summary:
      '回顾 Lumiloki 2025年的品牌发展历程——从智能魔方领军品牌到智能潮玩生态的全面进化。',
    content: `2025年即将过去，让我们一起回顾 Lumiloki 这一年的精彩历程。

品类拓展：从魔方到棋盘
2025年最大的里程碑，无疑是我们正式进军智能棋盘领域。9月发布的 Lumi Go 智能围棋、Lumi Go Lite 围棋入门版和 Lumi Chess 智能国际象棋，标志着 Lumiloki 从"智能魔方品牌"进化为"智能潮玩品牌"。

技术突破：端侧AI引擎
与顶尖围棋AI团队的合作让我们在嵌入式AI领域取得了重大突破。Lumi Go 的端侧围棋引擎在业内首次实现了在低功耗芯片上运行业余5段水平的AI，这项技术也将应用到未来更多产品中。

社区增长：用户突破50万
截至12月，Lumiloki 全球注册用户突破50万，覆盖45个国家和地区。Lumiloki Speed Cup 和首届 Lumi Go Cup 共吸引了超过5000名选手参赛。

产品矩阵：9款在售产品
从入门级 Lumi Lite 到旗舰级 Lumi Go，从经典魔方到智能棋盘，Lumiloki 已经构建起覆盖多品类、多价位的完整产品矩阵。

展望2026年，我们将继续拓展智能棋盘品类，探索更多智能玩具形态，目标是让每一个家庭都能感受到 Lumiloki 带来的科技乐趣。

感谢每一位用户的支持与陪伴。未来，一起发光！`,
    category: '品牌活动',
    date: '2025-12-25',
    emoji: '🎄',
    image: newsBrand2025Img,
  },
]

export const newsCategories = ['全部', '产品发布', '品牌活动', '技术分享', '赛事报道'] as const
