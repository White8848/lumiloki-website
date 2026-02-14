# Lumiloki Website - AI 工作流规范

## 项目概述
Lumiloki 发光智能魔方品牌官网，基于 React 18 + Vite 5 + TypeScript 构建的纯静态 SPA，部署于 GitHub Pages。

## 技术栈
- **框架**: React 18.3 + TypeScript 5.6
- **构建**: Vite 5.4，base 路径 `/lumiloki-website/`
- **路由**: React Router DOM v7（HashRouter），所有页面组件通过 `React.lazy` 懒加载
- **动画**: motion@12 + CSS keyframes（18+ 预定义动画）
- **样式**: CSS Modules + CSS 变量（100+ 变量定义在 `variables.css`）
- **工具**: clsx（类名拼接）、sharp（图片压缩生成 WebP）
- **AI 图片生成**: 即梦 API（火山引擎），通过 MCP 集成（`jimeng-mcp-v4@4.0.0`）
- **字体**: Nunito（展示）+ Noto Sans SC（正文），Google Fonts CDN 加载
- **无测试框架、无状态管理库、无 i18n、无后端 API**，所有数据为静态 JSON

## 项目结构
```
src/
├── components/
│   ├── effects/      # 视觉特效（GradientText, GlitchText, ParticleField, CursorGlow, MeshGrid, TypewriterText）
│   ├── layout/       # 布局组件（Navbar, Footer, MobileMenu）
│   ├── sections/     # 首页区块（HeroSection, FeaturesSection, ProductShowcase, BrandHighlights, CTASection, Timeline）
│   └── ui/           # 通用 UI（GlowButton, GlowCard, FlipCard, CubeSpinner, ProductCard, NewsCard, ScrollReveal, OptimizedImage 等 15+）
├── pages/            # 页面组件（Home, Products, ProductDetail, BrandStory, News, NewsDetail, Contact, NotFound）
├── data/             # 静态数据（产品、新闻、常量）
├── hooks/            # 自定义 Hooks（useScrollProgress, useMediaQuery, useMagnetic, useTilt 等 5 个）
├── types/            # TypeScript 类型定义
├── styles/           # 全局样式（global.css, variables.css, animations.css）
├── assets/           # 图片资源（WebP 格式）
└── utils/            # 工具函数
```

## 路由结构
- `/` — 首页（Hero + 特性 + 产品展示 + 品牌亮点 + CTA）
- `/products` — 产品中心（按系列筛选）
- `/products/:id` — 产品详情
- `/brand` — 品牌故事（历史时间线、理念、愿景）
- `/news` — 新闻动态列表
- `/news/:id` — 新闻详情
- `/contact` — 联系我们（表单）
- `*` — 404 页面

## 开发规范
- 组件使用函数式组件 + TypeScript，状态管理仅用 React Hooks（useState/useEffect/useRef/useCallback）
- 样式使用 CSS Modules，文件命名 `ComponentName.module.css`
- 所有颜色/间距/字号/阴影/圆角/z-index 使用 CSS 变量（定义在 `variables.css`）
- 动画优先使用 CSS keyframes（定义在 `animations.css`），复杂交互使用 motion 库
- 图片使用 WebP 格式，通过 OptimizedImage 组件实现懒加载 + 骨架屏
- 响应式设计：移动端优先，断点 sm(640px) / md(768px) / lg(1024px) / xl(1280px)
- 主题：亮色主题（白色背景 #FFFFFF，浅灰 #F8F9FC），主色系 红/青/黄/紫/蓝

## Git 提交规范
- 每完成一个独立小任务就提交
- 提交信息格式：`<type>: <description>`
- type: feat(新功能), style(样式), refactor(重构), fix(修复), chore(工具配置), docs(文档)
- 示例：`feat: add Navbar component with responsive mobile menu`

## 任务执行流程

### 1. 规划阶段
1. 读取当前任务描述
2. **将大任务拆分为多个独立的小任务**，每个小任务应满足：
   - 有明确的完成标准
   - 可独立构建验证
   - 粒度适中（一个组件、一个功能点、一组相关样式等）
3. 列出完整的小任务清单（包括涉及的文件、修改内容），**等待用户确认后再开始实现**

### 2. 迭代执行（对每个小任务循环）
1. **实现** — 完成当前小任务的代码编写
2. **验证** — 运行 `npm run build` 检查是否有错误
3. **处理结果**：
   - **构建通过** → git commit 当前小任务，进入下一个小任务
   - **构建失败** → 进入修复流程（见下方）

### 3. 构建失败修复流程
1. 分析错误信息，定位问题原因
2. 尝试修复（最多 3 次）
3. 每次修复后重新运行 `npm run build` 验证
4. **修复成功** → git commit，继续下一个小任务
5. **修复失败（3 次后仍未通过）** → 执行回退：
   - `git checkout -- .` 撤销当前所有未提交的修改
   - 通知用户该小任务失败及原因
   - 等待用户指示（跳过 / 调整方案 / 手动介入）

## 常用命令
- `npm run dev` — 启动开发服务器（Vite HMR）
- `npm run build` — TypeScript 检查 + 生产构建
- `npm run lint` — ESLint 代码检查
- `npm run preview` — 预览生产构建

## 部署
- GitHub Actions 自动部署（push to main → build → deploy to GitHub Pages）
- Node 20 运行时，`npm ci` + `npm run build`，输出 `dist/` 目录
