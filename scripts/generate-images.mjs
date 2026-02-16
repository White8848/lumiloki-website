#!/usr/bin/env node
/**
 * 批量生成 Lumiloki 网站图片
 * 使用火山引擎即梦 AI API (jimeng_t2i_v40)
 *
 * 用法: node scripts/generate-images.mjs [category] [index]
 * category: products | news | brand | backgrounds | features | all
 * index: 可选，只生成该类别中的第 N 张 (0-based)
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import https from 'https';

const AK = process.env.JIMENG_ACCESS_KEY;
const SK = process.env.JIMENG_SECRET_KEY;
const HOST = 'visual.volcengineapi.com';
const ENDPOINT = 'https://visual.volcengineapi.com';
const REGION = 'cn-north-1';
const SERVICE = 'cv';
const BASE_DIR = '/home/hqh/lumiloki-website/src/assets/images';

if (!AK || !SK) {
  console.error('需要设置 JIMENG_ACCESS_KEY 和 JIMENG_SECRET_KEY');
  process.exit(1);
}

// ===== V4 签名 =====

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = crypto.createHmac('sha256', key).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
  const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
  return crypto.createHmac('sha256', kService).update('request').digest();
}

async function callJimengAPI(prompt) {
  const t = new Date();
  const currentDate = t.toISOString().replace(/[:\-]|\.\d{3}/g, '');
  const datestamp = currentDate.substring(0, 8);

  const body = JSON.stringify({
    req_key: 'jimeng_t2i_v40',
    prompt: prompt,
    return_url: true,
    size: 4194304
  });

  const query = 'Action=CVProcess&Version=2022-08-31';
  const payloadHash = crypto.createHash('sha256').update(body).digest('hex');

  const canonicalHeaders = [
    'content-type:application/json',
    'host:' + HOST,
    'x-content-sha256:' + payloadHash,
    'x-date:' + currentDate
  ].join('\n') + '\n';

  const canonicalRequest = ['POST', '/', query, canonicalHeaders, 'content-type;host;x-content-sha256;x-date', payloadHash].join('\n');
  const credentialScope = datestamp + '/' + REGION + '/' + SERVICE + '/request';
  const stringToSign = ['HMAC-SHA256', currentDate, credentialScope, crypto.createHash('sha256').update(canonicalRequest).digest('hex')].join('\n');
  const signingKey = getSignatureKey(SK, datestamp, REGION, SERVICE);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  const headers = {
    'X-Date': currentDate,
    'Authorization': 'HMAC-SHA256 Credential=' + AK + '/' + credentialScope + ', SignedHeaders=content-type;host;x-content-sha256;x-date, Signature=' + signature,
    'X-Content-Sha256': payloadHash,
    'Content-Type': 'application/json'
  };

  const res = await fetch(ENDPOINT + '?' + query, { method: 'POST', headers, body });
  const text = await res.text();
  const cleaned = text.replace(/\\u0026/g, '&');
  const result = JSON.parse(cleaned);

  if (result.code === 10000 && result.data?.image_urls?.length > 0) {
    return result.data.image_urls[0];
  }
  throw new Error(`API错误: ${result.message || 'Unknown'} (code: ${result.code})`);
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ===== 图片定义 =====

// 统一后缀模板 — 确保所有产品图视觉一致
const PRODUCT_SUFFIX = '，干净纯白背景，正方形构图，产品居中，四周留有充足空间，柔和的左上方摄影灯打光，产品底部有淡淡的接触阴影，无任何文字标签水印，3D写实渲染风格，高端科技产品质感，8K超高清';

const PRODUCTS = [
  { name: 'lumi-pro', prompt: '旗舰3x3智能魔方，白色磨砂机身搭配半透明面板，内置LED灯珠发出柔和蓝紫色光芒，魔方微微倾斜悬浮展示三个可见面' + PRODUCT_SUFFIX },
  { name: 'lumi-lite', prompt: '轻盈3x3入门智能魔方，光滑白色机身，内置LED灯珠发出清新薄荷绿色光芒，整体造型轻巧友好' + PRODUCT_SUFFIX },
  { name: 'lumi-speed', prompt: '竞速3x3智能魔方，拉丝金属银色机身精密切割线条，橙色LED指示灯亮起，充满专业运动感和速度感' + PRODUCT_SUFFIX },
  { name: 'lumi-mini', prompt: '迷你4x4可爱智能魔方，约50mm超小巧尺寸，内置LED灯珠发出紫色柔光，萌系口袋尺寸造型' + PRODUCT_SUFFIX },
  { name: 'lumi-x', prompt: '三角金字塔形智能魔方（Pyraminx），黑色框架搭配半透明三角面板，内置彩虹LED发出多色光芒，独特几何造型' + PRODUCT_SUFFIX },
  { name: 'lumi-neo', prompt: '涂鸦艺术3x3智能魔方，表面有青色品红色黄色街头风彩绘图案，边缘有霓虹LED灯效，潮酷时尚设计' + PRODUCT_SUFFIX },
  { name: 'lumi-go', prompt: '智能围棋棋盘，温暖木纹表面刻有19x19线格，交叉点位置有青色LED小灯点亮，棋盘上摆放几颗黑白棋子，四分之三俯视角度展示棋盘纤薄侧面' + PRODUCT_SUFFIX },
  { name: 'lumi-go-lite', prompt: '入门智能围棋棋盘，浅色木纹表面13x13较小尺寸线格，LED点发出青绿色柔光，棋盘上摆放几颗棋子，友好亲切的教育感设计' + PRODUCT_SUFFIX },
  { name: 'lumi-chess', prompt: '智能国际象棋棋盘，深浅交替木纹方格棋盘，部分格子有紫青色LED背光亮起，棋盘上摆放几枚深色金属质感棋子包括王马兵，优雅高端设计' + PRODUCT_SUFFIX },
];

const NEWS = [
  { name: 'news-launch', prompt: '一个发光的智能魔方放在简洁明亮的新品发布会展台中央，柔和的聚光灯照射，温暖明亮的色调，16:9横幅构图，现代科技产品发布场景，商业活动摄影风格，8K超高清' },
  { name: 'news-competition', prompt: '魔方竞速比赛场景特写，选手双手快速旋转一个发光魔方，背景虚化可见计时器，明亮的室内灯光环境，紧张刺激的竞赛氛围，16:9横幅构图，体育赛事摄影风格，8K超高清' },
  { name: 'news-tech', prompt: '微距特写展示智能魔方内部精密电子元器件，PCB电路板上有传感器芯片和LED灯珠，科技感十足，浅色背景，16:9横幅构图，科技产品微距摄影，8K超高清' },
  { name: 'news-collab', prompt: '潮流跨界联名概念场景，一个发光魔方与街头潮流元素融合展示，周围有潮牌贴纸和涂鸦艺术，色彩丰富和谐，浅色背景，16:9横幅构图，时尚创意摄影风格，8K超高清' },
  { name: 'news-app', prompt: '智能手机屏幕展示精美魔方APP界面，旁边放着一个发光智能魔方通过蓝牙连接，干净简洁的桌面场景，柔和自然光，16:9横幅构图，科技生活方式摄影，8K超高清' },
];

const BRAND = [
  { name: 'brand-origin', prompt: '创业团队在明亮现代的办公室围坐讨论产品设计原型，桌上有魔方和电子零件，阳光透过大窗户照进来，充满创造力的工作氛围，温暖色调，16:9构图，纪实摄影风格，8K超高清' },
  { name: 'brand-vision', prompt: '超宽全景概念图，展示未来智能玩具与生活融合的场景，发光魔方元素融入美好城市生活，明亮天空和温暖阳光，科幻但温馨的未来感，21:9超宽画幅构图，概念艺术风格，8K超高清' },
  { name: 'value-innovation', prompt: '一双手托起一个发光的智能魔方，周围有柔和的光粒子环绕，象征科技创新，干净浅色背景，温暖光线，16:10构图，现代概念摄影风格，8K超高清' },
  { name: 'value-inclusion', prompt: '不同年龄的人们开心地一起玩发光魔方，温馨和谐的室内场景，每人手中一个发光魔方，温暖明亮的环境光，快乐多元化氛围，16:10构图，温馨纪实摄影，8K超高清' },
  { name: 'value-fun', prompt: '充满乐趣的魔方游戏场景，彩色发光魔方在空中旋转飞舞，彩色光线和粒子效果，欢乐活泼的氛围，浅色明亮背景，16:10构图，创意摄影风格，8K超高清' },
  { name: 'brand-tech', prompt: '智能魔方科技爆炸图展示，半透明魔方展示内部电路板传感器和LED灯珠结构，精密科技细节，干净浅灰白背景，16:10构图，工业设计产品展示风格，8K超高清' },
  { name: 'brand-design', prompt: '精致生活场景中的发光魔方，放在设计感桌面上作为潮流装饰品，旁边有绿植和设计杂志，现代家居美学氛围，柔和自然光，16:10构图，生活方式摄影风格，8K超高清' },
];

const BACKGROUNDS = [
  { name: 'hero-bg', prompt: '抽象几何渐变背景，柔和的粉色珊瑚色和淡紫色渐变光晕，大面积留白，微妙的几何线条和光点装饰，朦胧梦幻感，适合网页背景，极简抽象艺术设计，无文字，8K超高清' },
  { name: 'brand-bg', prompt: '抽象艺术渐变背景，柔和紫色和蓝绿色渐变光晕，浅色调底色，细腻纹理质感，朦胧优雅，大面积留白，品牌视觉背景，无文字，极简设计，8K超高清' },
  { name: 'cta-bg', prompt: '温暖抽象几何背景，珊瑚粉和金黄色渐变，柔和几何光线和粒子效果，明亮温暖色调，有激励感，大面积留白，极简现代设计，无文字，8K超高清' },
  { name: 'contact-bg', prompt: '简洁抽象渐变背景，淡蓝色和浅灰色柔和渐变，微妙圆形光晕和细线条装饰，专业友好氛围，大面积留白，极简商务设计风格，无文字，8K超高清' },
];

const FEATURES = [
  { name: 'sensor', prompt: '一个精致简洁的传感器芯片扁平化图标，微型IMU芯片配三维坐标轴标识，科技蓝色调，干净白色背景，正方形构图居中，现代扁平图标设计，8K超高清' },
  { name: 'led', prompt: '一颗彩色RGB LED灯珠发出美丽彩虹色光芒的扁平化图标，光线向四周柔和扩散，温暖色彩，干净白色背景，正方形构图居中，现代扁平图标设计，8K超高清' },
  { name: 'bluetooth', prompt: '蓝牙连接扁平化图标，经典蓝牙标志配合无线信号波纹扩散效果，科技蓝色调，干净白色背景，正方形构图居中，现代扁平图标设计，8K超高清' },
  { name: 'battery', prompt: '满电电池扁平化图标，带闪电充电标志和绿色电量指示，干净白色背景，正方形构图居中，现代扁平图标设计风格，8K超高清' },
];

const ALL_CATEGORIES = {
  products: { items: PRODUCTS, dir: 'products' },
  news: { items: NEWS, dir: 'news' },
  brand: { items: BRAND, dir: 'brand' },
  backgrounds: { items: BACKGROUNDS, dir: 'backgrounds' },
  features: { items: FEATURES, dir: 'features' },
};

// ===== 主流程 =====

async function generateAndSave(item, dir) {
  const outDir = path.join(BASE_DIR, dir);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n📷 生成: ${dir}/${item.name}`);
  console.log(`   提示词: ${item.prompt.substring(0, 80)}...`);

  try {
    const url = await callJimengAPI(item.prompt);
    console.log(`   ✅ 生成成功，下载中...`);

    // 先下载为临时文件
    const tmpPath = path.join(outDir, `${item.name}.tmp`);
    const finalPath = path.join(outDir, `${item.name}.webp`);
    await downloadFile(url, tmpPath);

    // 重命名为 webp
    fs.renameSync(tmpPath, finalPath);
    const stat = fs.statSync(finalPath);
    console.log(`   💾 已保存: ${finalPath} (${(stat.size / 1024).toFixed(1)}KB)`);
    return true;
  } catch (err) {
    console.error(`   ❌ 错误: ${err.message}`);
    return false;
  }
}

async function main() {
  const category = process.argv[2] || 'all';
  const index = process.argv[3] !== undefined ? parseInt(process.argv[3]) : undefined;

  console.log('🎨 Lumiloki 网站图片批量生成');
  console.log('============================');

  let categories;
  if (category === 'all') {
    categories = Object.entries(ALL_CATEGORIES);
  } else if (ALL_CATEGORIES[category]) {
    categories = [[category, ALL_CATEGORIES[category]]];
  } else {
    console.error(`未知类别: ${category}\n可选: products | news | brand | backgrounds | features | all`);
    process.exit(1);
  }

  let total = 0, success = 0;

  for (const [catName, catData] of categories) {
    const items = index !== undefined ? [catData.items[index]].filter(Boolean) : catData.items;
    console.log(`\n📁 ${catName} (${items.length} 张)`);

    for (const item of items) {
      total++;
      if (await generateAndSave(item, catData.dir)) success++;
      // 避免 API 限流 - 等待 3 秒
      await sleep(3000);
    }
  }

  console.log('\n============================');
  console.log(`📊 完成! 总计: ${total}, 成功: ${success}, 失败: ${total - success}`);
}

main().catch(console.error);
