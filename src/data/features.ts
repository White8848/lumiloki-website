import sensorBg from '../assets/images/features/sensor-bg.webp'
import ledBg from '../assets/images/features/led-bg.webp'
import bluetoothBg from '../assets/images/features/bluetooth-bg.webp'
import batteryBg from '../assets/images/features/battery-bg.webp'

export interface Feature {
  title: string
  description: string
  bgImage: string
}

export const features: Feature[] = [
  {
    title: '智能感知',
    description: '内置高精度六轴传感器，实时追踪每一次旋转，毫秒级响应让你的操作数据尽在掌握。',
    bgImage: sensorBg,
  },
  {
    title: '炫彩光效',
    description: '全面LED矩阵覆盖，支持1600万色自定义灯效，让每一款产品成为全场焦点。',
    bgImage: ledBg,
  },
  {
    title: '蓝牙互联',
    description: 'BLE 5.0低功耗连接，配合专属APP实现实时计时、复盘分析和在线对战。',
    bgImage: bluetoothBg,
  },
  {
    title: '超长续航',
    description: '800mAh大容量锂电池，Type-C快充，单次充电可连续使用20小时以上。',
    bgImage: batteryBg,
  },
]
