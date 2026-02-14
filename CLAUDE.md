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
- **测试**: Vitest + @testing-library/react + @testing-library/jest-dom
- **无状态管理库、无 i18n、无后端 API**，所有数据为静态 JSON

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
├── test/             # 测试文件（setup、组件测试、路由测试）
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

## Git 提交与推送规范
- 每完成一个独立小任务就提交
- 提交信息格式：`<type>: <description>`
- type: feat(新功能), style(样式), refactor(重构), fix(修复), chore(工具配置), docs(文档)
- 示例：`feat: add Navbar component with responsive mobile menu`
- **推送时机**：所有小任务全部完成后统一 `git push`，或用户明确要求时推送

## 多人协作规范

### PR 审查流程
- AI 完成任务后创建 PR，**不直接合并到 main**
- PR 描述需包含：
  - **改动摘要**：本次改动的目的和内容概述
  - **影响范围**：涉及哪些模块/页面
  - **截图/录屏**：UI 相关变更必须附带截图
- 合并要求：
  - 至少 1 人 code review 后才能合并
  - CI 检查（lint + test + build）全部通过
  - 无未解决的 review 评论
- PR 标题格式与提交信息一致：`<type>: <description>`

### 冲突预防机制
- **开始工作前必须同步主分支**：
  ```bash
  git fetch origin main
  git rebase origin/main
  ```
- 如有冲突，先解决冲突再开始新任务，**不跳过冲突直接开发**
- **高风险文件**（修改前需团队沟通确认）：
  - `src/styles/variables.css` — CSS 变量影响全站样式
  - `src/styles/global.css` — 全局样式
  - `src/styles/animations.css` — 共享动画定义
  - `src/App.tsx` — 路由配置与全局布局
  - `src/data/*` — 共享静态数据源
  - `package.json` — 依赖变更
  - `vite.config.ts` — 构建配置
- 多人并行开发时，通过 GitHub Issues 标注各自负责的文件范围，避免同时修改同一文件

## 任务执行流程

### 1. 规划阶段
1. 读取当前任务描述
2. **评估任务复杂度**，满足以下任一条件即视为复杂任务：
   - 涉及 3 个以上文件的联动修改
   - 需要新增页面或大型组件
   - 涉及架构调整或跨模块重构
   - 需求描述模糊，存在多种实现路径
3. **复杂任务自动启动 Plan 模式**：
   - 使用 Plan 子代理进行深度分析（代码探索、依赖梳理、方案对比）
   - 输出结构化实施计划，包含：任务拆分、文件清单、修改要点、风险点
   - 计划经用户确认后再进入实现阶段
4. **简单任务直接拆分**：将任务拆分为多个独立的小任务，每个小任务应满足：
   - 有明确的完成标准
   - 可独立构建验证
   - 粒度适中（一个组件、一个功能点、一组相关样式等）
5. 列出完整的小任务清单（包括涉及的文件、修改内容），**等待用户确认后再开始实现**

### 2. 迭代执行（对每个小任务循环）
1. **实现** — 完成当前小任务的代码编写
2. **验证** — 依次运行以下检查，全部通过才算验证成功：
   - `npm run lint` — 代码规范检查
   - `npm run test` — 单元测试（Vitest）
   - `npm run build` — TypeScript 类型检查 + 生产构建
3. **自查** — 运行 `git diff` 审查改动，确认无调试代码（console.log）、注释掉的代码、无关改动
4. **处理结果**：
   - **验证通过** → git commit 当前小任务，进入下一个小任务
   - **验证失败** → 进入修复流程（见下方）

### 3. 构建失败修复流程
1. 分析错误信息，定位问题原因
2. 尝试修复（最多 3 次）
3. 每次修复后重新运行 `npm run lint` + `npm run test` + `npm run build` 验证
4. **修复成功** → git commit，继续下一个小任务
5. **修复失败（3 次后仍未通过）** → 执行回退：
   - `git checkout -- .` 撤销已追踪文件的修改
   - `git clean -fd` 删除新建的未追踪文件
   - 通知用户该小任务失败及原因
   - 等待用户指示（跳过 / 调整方案 / 手动介入）

### 4. 自动 Compact（上下文管理）
长任务会产生大量工具调用和输出，为避免上下文窗口溢出导致丢失关键信息：
- **每完成一个小任务并 commit 后**，主动执行 `/compact` 压缩上下文
- compact 时自动保留：当前任务清单进度、已完成/未完成的小任务、最近一次构建状态
- 如果单个小任务的实现过程中上下文已接近限制（如多次修复循环），在 commit 或回退后立即 compact
- compact 后按以下清单恢复工作状态，确保无缝继续：
  1. 读取 CLAUDE.md 了解项目规范
  2. 运行 `git log --oneline -10` 查看最近提交进度
  3. 读取任务清单，确认当前在第几个小任务
  4. 运行 `git status` 检查是否有未提交的改动
  5. 确认最近一次构建状态（通过/失败），如不确定则重新运行验证

## 即梦 AI 图片生成流程
当需要为页面生成图片素材时，通过 MCP 调用即梦 API（`jimeng-mcp-v4@4.0.0`）：
1. **分析需求** — 确定图片用途、尺寸、风格（需与网站整体视觉风格一致）
2. **编写提示词** — 结合品牌调性（科技感、发光效果、魔方元素）撰写英文提示词
3. **生成图片** — 调用即梦 API 生成，审查结果是否符合预期
4. **后处理** — 将图片转为 WebP 格式，放入 `src/assets/` 对应目录
5. **集成** — 通过 `OptimizedImage` 组件引入，确保懒加载和骨架屏正常工作

## 常用命令
- `npm run dev` — 启动开发服务器（Vite HMR）
- `npm run build` — TypeScript 检查 + 生产构建
- `npm run lint` — ESLint 代码检查
- `npm run test` — 运行单元测试（Vitest，单次运行）
- `npm run test:watch` — 运行单元测试（Vitest，监听模式）
- `npm run preview` — 预览生产构建

## 部署
- GitHub Actions 自动部署（push to main → build → deploy to GitHub Pages）
- Node 20 运行时，`npm ci` + `npm run build`，输出 `dist/` 目录
