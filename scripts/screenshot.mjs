/**
 * 跨平台 Playwright 截图脚本（路由自动发现）
 *
 * 路由从 src/main.tsx 自动读取，新增静态页面无需修改此脚本。
 * 仅动态路由（含 :param）需要在 DYNAMIC_ROUTE_EXAMPLES 中配置示例值。
 *
 * 用法:
 *   node scripts/screenshot.mjs                      # 截取所有页面（桌面端）
 *   node scripts/screenshot.mjs --mobile             # 截取所有页面（移动端 375x812）
 *   node scripts/screenshot.mjs --route home         # 截取首页（使用路由名称）
 *   node scripts/screenshot.mjs --route products     # 截取产品页
 *   node scripts/screenshot.mjs --full-page          # 全页截图（含滚动区域）
 *   node scripts/screenshot.mjs --route home --mobile --full-page
 */

import { chromium } from '@playwright/test'
import { mkdirSync, existsSync, readFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PROJECT_ROOT = resolve(__dirname, '..')
const SCREENSHOT_DIR = join(PROJECT_ROOT, 'screenshots')
const MAIN_TSX = join(PROJECT_ROOT, 'src', 'main.tsx')

const DEFAULT_PORT = 5173

/** 探测 dev server 实际运行的端口（依次检测 5173-5180） */
async function detectPort() {
  for (let port = DEFAULT_PORT; port <= DEFAULT_PORT + 7; port++) {
    try {
      const res = await fetch(`http://localhost:${port}`, { signal: AbortSignal.timeout(500) })
      if (res.ok) return port
    } catch { /* port not available, try next */ }
  }
  return null
}

/**
 * 动态路由示例值 — 仅含 :param 的路由需要在此配置
 * key: main.tsx 中的原始 path（如 'products/:id'）
 * value: { example: 实际路径, name: 截图文件名 }
 */
const DYNAMIC_ROUTE_EXAMPLES = {
  'products/:id': { example: '/products/lumi-pro', name: 'product-detail' },
  'news/:id': { example: '/news/lumi-pro-launch', name: 'news-detail' },
}

/**
 * 从 src/main.tsx 自动解析路由列表
 * - index: true → home (/)
 * - 静态 path（如 'products'）→ 自动提取
 * - 动态 path（含 ':'）→ 从 DYNAMIC_ROUTE_EXAMPLES 取示例值
 * - path: '*' → 跳过（404 页面）
 */
function discoverRoutes() {
  const source = readFileSync(MAIN_TSX, 'utf-8')
  const routes = []

  // 匹配 index route（首页）
  if (/\{\s*index:\s*true/.test(source)) {
    routes.push({ path: '/', name: 'home' })
  }

  // 匹配所有 children 中的 path: 'xxx'
  const pathRegex = /\{\s*path:\s*['"]([^'"]+)['"]/g
  let match
  while ((match = pathRegex.exec(source)) !== null) {
    const rawPath = match[1]

    // 跳过根路由 '/' 和通配符 '*'
    if (rawPath === '/' || rawPath === '*') continue

    if (rawPath.includes(':')) {
      // 动态路由 — 查找示例配置
      const config = DYNAMIC_ROUTE_EXAMPLES[rawPath]
      if (config) {
        routes.push({ path: config.example, name: config.name })
      } else {
        console.warn(`   ⚠ 跳过动态路由 "${rawPath}"，未在 DYNAMIC_ROUTE_EXAMPLES 中配置示例值`)
      }
    } else {
      // 静态路由 — 自动生成
      routes.push({
        path: `/${rawPath}`,
        name: rawPath.replace(/\//g, '-'),
      })
    }
  }

  return routes
}

const ALL_ROUTES = discoverRoutes()

const VIEWPORTS = {
  desktop: { width: 1280, height: 720 },
  mobile: { width: 375, height: 812 },
}

/** 根据名称或路径查找路由 */
function resolveRoute(nameOrPath) {
  return ALL_ROUTES.find((r) => r.name === nameOrPath)
    || ALL_ROUTES.find((r) => r.path === nameOrPath)
    || null
}

function parseArgs() {
  const args = process.argv.slice(2)
  const config = {
    mobile: false,
    fullPage: false,
    routes: /** @type {string[]} */ ([]),
  }

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--mobile':
        config.mobile = true
        break
      case '--full-page':
        config.fullPage = true
        break
      case '--route':
        if (args[i + 1]) {
          config.routes.push(args[++i])
        }
        break
      case '--help': {
        const routeList = ALL_ROUTES.map((r) => `  ${r.name.padEnd(18)} ${r.path}`).join('\n')
        console.log(`
Lumiloki 截图工具

用法: node scripts/screenshot.mjs [选项]

选项:
  --mobile        使用移动端视口 (375x812)，默认桌面端 (1280x720)
  --full-page     全页截图，包含滚动区域
  --route <name>  指定路由名称，可多次使用
  --help          显示帮助信息

可用路由名称（自动从 src/main.tsx 发现）:
${routeList}

示例:
  node scripts/screenshot.mjs                             截取所有页面
  node scripts/screenshot.mjs --mobile                    移动端截取所有页面
  node scripts/screenshot.mjs --route products            截取产品页
  node scripts/screenshot.mjs --route home --full-page    首页全页截图
`)
        process.exit(0)
      }
    }
  }

  return config
}

async function takeScreenshots() {
  const config = parseArgs()
  const device = config.mobile ? 'mobile' : 'desktop'
  const viewport = VIEWPORTS[device]

  // 探测 dev server 端口
  const port = await detectPort()
  if (!port) {
    console.error('   ✗ 未检测到 dev server，请先运行 npm run dev')
    process.exit(1)
  }
  const baseUrl = `http://localhost:${port}`

  // 确定要截图的路由
  let routes
  if (config.routes.length > 0) {
    routes = []
    for (const input of config.routes) {
      const route = resolveRoute(input)
      if (route) {
        routes.push(route)
      } else {
        console.error(`   ✗ 未知路由: "${input}"，运行 --help 查看可用路由名称`)
        process.exit(1)
      }
    }
  } else {
    routes = ALL_ROUTES
  }

  // 创建输出目录
  if (!existsSync(SCREENSHOT_DIR)) {
    mkdirSync(SCREENSHOT_DIR, { recursive: true })
  }

  console.log(`\n📸 Lumiloki 截图工具`)
  console.log(`   服务: ${baseUrl}`)
  console.log(`   视口: ${device} (${viewport.width}x${viewport.height})`)
  console.log(`   全页: ${config.fullPage ? '是' : '否'}`)
  console.log(`   路由: ${routes.map((r) => r.path).join(', ')}`)
  console.log(`   输出: ${SCREENSHOT_DIR}\n`)

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: config.mobile ? 2 : 1,
  })
  const page = await context.newPage()

  let success = 0
  let failed = 0

  for (const route of routes) {
    const url = `${baseUrl}/#${route.path}`
    const filename = `${route.name}-${device}${config.fullPage ? '-full' : ''}.png`
    const filepath = join(SCREENSHOT_DIR, filename)

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
      // 等待懒加载组件和动画渲染
      await page.waitForTimeout(1000)

      // 全页截图：滚动触发动画 + 修正 fixed 元素重复渲染问题
      if (config.fullPage) {
        // 1. 滚动页面触发所有 whileInView / IntersectionObserver 动画
        await page.evaluate(async () => {
          const scrollHeight = document.documentElement.scrollHeight
          const viewportHeight = window.innerHeight
          for (let y = 0; y < scrollHeight; y += viewportHeight * 0.5) {
            window.scrollTo(0, y)
            await new Promise(r => setTimeout(r, 200))
          }
          window.scrollTo(0, scrollHeight)
          await new Promise(r => setTimeout(r, 300))
          window.scrollTo(0, 0)
          await new Promise(r => setTimeout(r, 300))
        })
        // 2. 将导航栏 fixed→absolute，隐藏移动菜单和滚动进度条
        await page.addStyleTag({
          content: [
            // navbar: fixed→absolute 保留在页面顶部
            '[class*="navbar" i] { position: absolute !important; }',
            // 隐藏移动端菜单、遮罩层、滚动进度条
            '[class*="overlay" i], [class*="MobileMenu" i], [class*="mobileMenu" i],',
            '[class*="ScrollProgress" i], [class*="scrollProgress" i]',
            '{ display: none !important; }',
          ].join('\n'),
        })
      }

      await page.screenshot({
        path: filepath,
        fullPage: config.fullPage,
      })

      console.log(`   ✓ ${route.path} → ${filename}`)
      success++
    } catch (err) {
      console.error(`   ✗ ${route.path} — ${err.message}`)
      failed++
    }
  }

  await browser.close()

  console.log(`\n   完成: ${success} 成功, ${failed} 失败`)
  console.log(`   截图保存至: ${SCREENSHOT_DIR}\n`)

  if (failed > 0) process.exit(1)
}

takeScreenshots().catch((err) => {
  console.error('截图失败:', err.message)
  process.exit(1)
})
