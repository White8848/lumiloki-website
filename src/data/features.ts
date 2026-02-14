import sensorImg from '../assets/images/features/sensor.webp'
import ledImg from '../assets/images/features/led.webp'
import bluetoothImg from '../assets/images/features/bluetooth.webp'
import batteryImg from '../assets/images/features/battery.webp'

export interface Feature {
  icon: string
  title: string
  description: string
  image?: string
}

export const features: Feature[] = [
  {
    icon: '🧠',
    title: '智能感知',
    description: '内置高精度六轴传感器，实时追踪每一次旋转，毫秒级响应让你的操作数据尽在掌握。',
    image: sensorImg,
  },
  {
    icon: '🌈',
    title: '炫彩光效',
    description: '全面LED矩阵覆盖，支持1600万色自定义灯效，让你的魔方成为全场焦点。',
    image: ledImg,
  },
  {
    icon: '📡',
    title: '蓝牙互联',
    description: 'BLE 5.0低功耗连接，配合专属APP实现实时计时、复盘分析和在线对战。',
    image: bluetoothImg,
  },
  {
    icon: '⚡',
    title: '超长续航',
    description: '800mAh大容量锂电池，Type-C快充，单次充电可连续使用20小时以上。',
    image: batteryImg,
  },
]
