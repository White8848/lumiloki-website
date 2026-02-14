import type { Product } from '../types/product'

import lumiProImg from '../assets/images/products/lumi-pro.svg'
import lumiLiteImg from '../assets/images/products/lumi-lite.svg'
import lumiSpeedImg from '../assets/images/products/lumi-speed.svg'
import lumiMiniImg from '../assets/images/products/lumi-mini.svg'
import lumiXImg from '../assets/images/products/lumi-x.svg'
import lumiNeoImg from '../assets/images/products/lumi-neo.svg'

export const products: Product[] = [
  {
    id: 'lumi-pro',
    name: 'Lumi Pro 旗舰版',
    series: '经典系列',
    description: '全新旗舰级智能发光魔方，六轴传感器 + 全面LED + BLE 5.0，竞速与炫彩兼得。',
    longDescription:
      'Lumi Pro 是 Lumiloki 的旗舰之作。搭载最新一代六轴高精度传感器，配合全面覆盖的LED矩阵和BLE 5.0蓝牙模块，在竞速计时与炫彩灯效之间实现完美平衡。无论你是竞速爱好者还是潮流玩家，Lumi Pro 都能满足你的所有期待。',
    price: '¥599',
    emoji: '🟦',
    image: lumiProImg,
    featured: true,
    specs: [
      { label: '处理器', value: 'ARM Cortex-M4 @ 120MHz' },
      { label: '传感器', value: '六轴IMU（加速度计+陀螺仪）' },
      { label: 'LED', value: '全面RGB LED矩阵 x54' },
      { label: '蓝牙', value: 'BLE 5.0' },
      { label: '电池', value: '800mAh 锂电池' },
      { label: '续航', value: '20小时+' },
      { label: '充电', value: 'Type-C 快充' },
      { label: 'OTA', value: '支持固件空中升级' },
    ],
    features: [
      {
        title: '全面LED矩阵',
        description: '54颗独立可控RGB LED，覆盖魔方每一个可见面，支持1600万色自定义，让你的每一次旋转都光彩夺目。',
        emoji: '🌈',
      },
      {
        title: '精准计时系统',
        description: '毫秒级计时精度，自动识别起始和结束状态，配合APP实现成绩记录、历史曲线和全球排行榜。',
        emoji: '⏱️',
      },
      {
        title: '智能复盘回放',
        description: '完整记录解题步骤，支持3D可视化回放，逐步分析优化空间，科学提升你的速拧水平。',
        emoji: '📊',
      },
    ],
  },
  {
    id: 'lumi-lite',
    name: 'Lumi Lite 青春版',
    series: '经典系列',
    description: '轻量化设计，入门级智能发光魔方，体验全彩灯效与蓝牙连接。',
    longDescription:
      'Lumi Lite 是开启智能魔方之旅的理想选择。保留了核心的灯效与蓝牙功能，同时以更轻盈的体积和更亲民的价格，让更多人感受到 Lumiloki 的魅力。',
    price: '¥299',
    emoji: '🟩',
    image: lumiLiteImg,
    specs: [
      { label: '处理器', value: 'ARM Cortex-M0 @ 48MHz' },
      { label: '传感器', value: '三轴加速度计' },
      { label: 'LED', value: 'RGB LED x24' },
      { label: '蓝牙', value: 'BLE 5.0' },
      { label: '电池', value: '500mAh 锂电池' },
      { label: '续航', value: '15小时+' },
      { label: '充电', value: 'Type-C' },
      { label: 'OTA', value: '支持' },
    ],
    features: [
      {
        title: '轻量化设计',
        description: '仅重85g，手感轻盈灵动，长时间把玩也不疲劳。',
        emoji: '🪶',
      },
      {
        title: '多彩灯效',
        description: '24颗RGB LED灯珠，预设12种灯效模式，一键切换。',
        emoji: '💡',
      },
      {
        title: 'APP互联',
        description: '蓝牙连接专属APP，基础计时和灯效自定义一应俱全。',
        emoji: '📱',
      },
    ],
  },
  {
    id: 'lumi-speed',
    name: 'Lumi Speed 竞速版',
    series: '竞速系列',
    description: '专为速拧选手打造，极致手感与精准计时完美结合。',
    longDescription:
      'Lumi Speed 聚焦极致速拧体验。采用磁力定位系统和可调节松紧度设计，配合最高精度的传感器和极低延迟的蓝牙连接，为竞速选手提供专业级别的训练工具。',
    price: '¥499',
    emoji: '🟧',
    image: lumiSpeedImg,
    specs: [
      { label: '处理器', value: 'ARM Cortex-M4 @ 120MHz' },
      { label: '传感器', value: '六轴IMU + 磁力定位' },
      { label: 'LED', value: '状态指示LED x6' },
      { label: '蓝牙', value: 'BLE 5.0（低延迟模式）' },
      { label: '电池', value: '600mAh 锂电池' },
      { label: '续航', value: '25小时+' },
      { label: '充电', value: 'Type-C 快充' },
      { label: '特色', value: '磁力定位 + 可调松紧' },
    ],
    features: [
      {
        title: '磁力定位系统',
        description: '52颗高品质磁铁精准定位，每一步旋转都有清晰的段落感和回弹手感。',
        emoji: '🧲',
      },
      {
        title: '极低延迟',
        description: '蓝牙低延迟模式下仅8ms传输延迟，确保每一步记录精准无误。',
        emoji: '⚡',
      },
      {
        title: '竞赛模式',
        description: 'WCA标准计时协议，支持线上竞赛和排名系统，在家也能参加比赛。',
        emoji: '🏆',
      },
    ],
  },
  {
    id: 'lumi-mini',
    name: 'Lumi Mini 迷你版',
    series: '经典系列',
    description: '掌心大小的发光魔方，便携潮玩新选择。',
    longDescription:
      'Lumi Mini 将Lumiloki的魅力浓缩到50mm的小巧体积中。作为钥匙扣挂件或桌面摆件，它是展示个性的绝佳方式。虽然体积小，但灯效同样精彩。',
    price: '¥199',
    emoji: '🟪',
    image: lumiMiniImg,
    specs: [
      { label: '尺寸', value: '50 x 50 x 50mm' },
      { label: 'LED', value: 'RGB LED x12' },
      { label: '蓝牙', value: 'BLE 5.0' },
      { label: '电池', value: '200mAh' },
      { label: '续航', value: '10小时+' },
      { label: '充电', value: 'Type-C' },
      { label: '附件', value: '钥匙扣 + 底座' },
      { label: '重量', value: '45g' },
    ],
    features: [
      {
        title: '极致便携',
        description: '50mm小巧机身，随身携带毫无负担。',
        emoji: '🎒',
      },
      {
        title: '氛围灯模式',
        description: '内置多种氛围灯效，可作为桌面装饰和夜灯使用。',
        emoji: '🌙',
      },
      {
        title: '社交互动',
        description: '两台Mini靠近时可触发互动灯效，和朋友一起玩更有趣。',
        emoji: '🤝',
      },
    ],
  },
  {
    id: 'lumi-x',
    name: 'Lumi X 异形版',
    series: '限定版',
    description: '突破三阶形态，金字塔造型的发光智能魔方。',
    longDescription:
      'Lumi X 大胆突破传统三阶形态，以金字塔（Pyraminx）为原型加入Lumiloki智能灯效系统。独特的三角面LED排列带来全新视觉体验，限量发售，收藏价值极高。',
    price: '¥799',
    emoji: '🔺',
    image: lumiXImg,
    specs: [
      { label: '形态', value: 'Pyraminx 金字塔' },
      { label: '处理器', value: 'ARM Cortex-M4' },
      { label: 'LED', value: 'RGB LED x36（三角排列）' },
      { label: '蓝牙', value: 'BLE 5.0' },
      { label: '电池', value: '500mAh' },
      { label: '续航', value: '18小时+' },
      { label: '限量', value: '全球限量 2000 台' },
      { label: '附赠', value: '定制展示底座 + 收藏证书' },
    ],
    features: [
      {
        title: '异形灯效',
        description: '三角面LED排列带来独特的视觉效果，灯效模式针对金字塔形态专属定制。',
        emoji: '🔮',
      },
      {
        title: '限量收藏',
        description: '全球限量2000台，每台带有独立编号和收藏证书。',
        emoji: '💎',
      },
      {
        title: '展示底座',
        description: '附赠定制水晶展示底座，带底部灯光效果，完美展示你的珍藏。',
        emoji: '🏛️',
      },
    ],
  },
  {
    id: 'lumi-neo',
    name: 'Lumi Neo 联名版',
    series: '限定版',
    description: '与知名潮牌联名设计，限量涂装与专属灯效。',
    longDescription:
      'Lumi Neo 是 Lumiloki 与潮流品牌的跨界联名之作。独家设计的涂装配色，搭配联名专属灯效主题，将街头文化与智能科技完美融合。每一台都是独一无二的潮流单品。',
    price: '¥699',
    emoji: '🎨',
    image: lumiNeoImg,
    specs: [
      { label: '处理器', value: 'ARM Cortex-M4 @ 120MHz' },
      { label: '传感器', value: '六轴IMU' },
      { label: 'LED', value: '全面RGB LED矩阵 x54' },
      { label: '蓝牙', value: 'BLE 5.0' },
      { label: '电池', value: '800mAh' },
      { label: '涂装', value: '联名限定涂装' },
      { label: '限量', value: '全球限量 1000 台' },
      { label: '附赠', value: '联名礼盒 + 贴纸 + 帆布袋' },
    ],
    features: [
      {
        title: '联名涂装',
        description: '独家设计的街头风格涂装，潮流感拉满。',
        emoji: '🎭',
      },
      {
        title: '专属灯效',
        description: '联名品牌专属灯效主题，独家动态效果。',
        emoji: '🔥',
      },
      {
        title: '豪华礼盒',
        description: '限定礼盒包装，包含联名贴纸和帆布袋，送礼自用皆宜。',
        emoji: '🎁',
      },
    ],
  },
]

export const seriesOptions = ['全部', '经典系列', '竞速系列', '限定版'] as const
