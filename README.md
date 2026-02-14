# Lumiloki Website

Lumiloki 发光智能魔方品牌官网 — 基于 React + TypeScript + Vite 构建的纯静态 SPA。

## 技术栈

- **框架**: React 18 + TypeScript 5.6
- **构建**: Vite 5.4
- **路由**: React Router DOM v7（HashRouter + 懒加载）
- **动画**: motion@12 + CSS keyframes
- **样式**: CSS Modules + CSS 变量
- **字体**: Nunito + Noto Sans SC（Google Fonts）
- **测试**: Vitest + Testing Library
- **截图调试**: Playwright（headless Chromium）
- **AI 图片生成**: 即梦 API（火山引擎 MCP）
- **部署**: GitHub Pages（GitHub Actions 自动构建）

## 页面结构

| 路由 | 页面 |
|------|------|
| `/` | 首页（Hero + 特性 + 产品展示 + 品牌亮点 + CTA） |
| `/products` | 产品中心 |
| `/products/:id` | 产品详情 |
| `/brand` | 品牌故事 |
| `/news` | 新闻动态 |
| `/news/:id` | 新闻详情 |
| `/contact` | 联系我们 |
| `/careers` | 加入我们 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview

# 代码检查
npm run lint

# 运行测试
npm run test

# 清理临时文件（截图、构建产物）
npm run clean
```

## 项目结构

```
src/
├── components/
│   ├── effects/      # 视觉特效组件
│   ├── layout/       # 布局组件（Navbar, Footer）
│   ├── sections/     # 首页区块组件
│   └── ui/           # 通用 UI 组件
├── pages/            # 页面组件
├── data/             # 静态数据
├── hooks/            # 自定义 Hooks
├── types/            # TypeScript 类型定义
├── styles/           # 全局样式与 CSS 变量
├── assets/           # 图片资源（WebP）
└── utils/            # 工具函数
```

## 部署

推送到 `main` 分支后，GitHub Actions 自动执行构建并部署至 GitHub Pages。

- 运行时: Node 20
- 构建命令: `npm ci && npm run build`
- 输出目录: `dist/`

## AI 工作流

本项目使用 AI 辅助开发，工作流规范定义在 [`CLAUDE.md`](./CLAUDE.md) 中。核心流程：

1. **规划** — 评估任务复杂度，复杂任务自动进入 Plan 模式进行方案设计，简单任务直接拆分为小任务清单
2. **分支** — 从最新 main 创建功能分支（`<type>/<description>`），禁止直接在 main 上开发
3. **迭代** — 每个小任务循环执行：实现 → lint + test + build 验证 → git commit
4. **自查** — `git diff` 审查改动，确认无调试代码或无关修改
5. **PR** — 完成后创建 Pull Request，经 code review + CI 通过后合并

其他能力：
- **视觉调试** — 通过 Playwright headless 截图验证页面渲染效果
- **图片生成** — 通过即梦 API（MCP）生成品牌风格图片素材
- **上下文管理** — 长任务自动 compact，保留关键进度信息
