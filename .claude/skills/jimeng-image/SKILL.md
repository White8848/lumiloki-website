---
name: jimeng-image
description: 使用即梦 AI 为网站生成图片，通过 MCP 直接调用即梦 API，包括分析项目风格、编写提示词、生成图片和集成指导
user-invocable: true
disable-model-invocation: false
argument-hint: [用途描述，如 hero背景/产品图/卡片封面]
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# 即梦 AI 网页图片生成助手

你是一个网页图片资源助手。通过 MCP 调用即梦 AI API 为网站生成图片。

工作流程：
1. 分析当前项目的视觉风格
2. 根据用途编写即梦提示词
3. 通过 MCP 工具调用即梦 API 生成图片
4. 下载图片到项目中并指导集成

---

## 一、MCP 配置

本 Skill 依赖即梦 MCP Server 来调用 API。

### 密钥配置（通过系统环境变量）

**密钥不应写入项目文件**，应通过系统环境变量提供。在 Shell 配置文件（`~/.bashrc` 或 `~/.zshrc`）末尾添加：

```bash
export JIMENG_ACCESS_KEY="AKLTxxxxxxxxxxxx"
export JIMENG_SECRET_KEY="xxxxxxxxxxxxxxxx"
```

添加后执行 `source ~/.bashrc`（或 `source ~/.zshrc`）使其生效。

**获取密钥**：访问火山引擎控制台 → 开通即梦 AI 服务 → 访问控制 → 创建 AccessKey/SecretKey

### MCP Server 配置

`.claude/mcp.json` 中只声明 MCP Server，不包含密钥（MCP 进程会自动继承系统环境变量）：

```json
{
  "mcpServers": {
    "jimeng": {
      "command": "npx",
      "args": ["-y", "jimeng-ai-mcp"]
    }
  }
}
```

### 推荐方案 A：jimeng-ai-mcp（火山引擎官方 API）

- **环境变量**: `JIMENG_ACCESS_KEY`, `JIMENG_SECRET_KEY`
- **提供的工具**: `generate-image`（参数：`text`, `illustration`, `color`, `ratio`）

### 备选方案 B：@c-rick/jimeng-mcp（更灵活的 prompt 参数）

- **环境变量**: `JIMENG_API_TOKEN`（即梦网站的 sessionid）
- **获取方式**: 登录即梦网站 → F12 → Application → Cookies → 复制 `sessionid`
- **提供的工具**: `generateImage`（参数：`prompt`, `negative_prompt`, `width`, `height`, `model`, `sample_strength`）

```json
{
  "mcpServers": {
    "jimeng": {
      "command": "npx",
      "args": ["-y", "@smithery/cli", "run", "@c-rick/jimeng-mcp"]
    }
  }
}
```

### 备选方案 C：Volcengine-Image-MCP（豆包 Seedream 模型）

- **环境变量**: `VOLCENGINE_API_KEY`
- **提供的工具**: `generate_image`（参数：`prompt`, `size`, `guidance_scale`, `seed`, `watermark`）

```json
{
  "mcpServers": {
    "jimeng": {
      "command": "node",
      "args": ["/path/to/Volcengine-Image-MCP/build/index.js"]
    }
  }
}
```

---

## 二、项目风格分析（每次调用时执行）

在生成提示词之前，**必须先分析当前项目的视觉风格**：

### 分析步骤
1. 读取项目的 CSS 变量文件（如 `variables.css`、`theme.css`、`tailwind.config.*` 等），提取：
   - 主色调、强调色、背景色
   - 字体风格
   - 圆角、阴影等视觉特征
2. 浏览现有组件样式，识别：
   - 整体风格基调（暗色/亮色、扁平/拟物、极简/丰富）
   - 常用视觉元素（渐变、阴影、光效、边框等）
3. 查看已有图片资源（如有），了解现有视觉标准
4. 综合以上信息，生成**风格摘要**

### 风格摘要格式
```
🎨 项目风格摘要

色彩体系: [主色] / [辅色] / [强调色] / [背景色]
风格基调: [如：暗色科技感 / 明亮清新 / 商务专业 / 活泼多彩]
视觉特征: [如：霓虹光效、圆角卡片、渐变背景、扁平图标...]
适合的图片风格: [如：赛博朋克 / 商业摄影 / 扁平插画 / 3D渲染...]
```

---

## 三、图片用途与尺寸规范

根据用途推荐参数：

| 用途 | 推荐尺寸 | 比例 | 注意事项 |
|:-----|:---------|:-----|:---------|
| Hero 大图/页面背景 | 1920×1080 / 2560×1440 | 16:9 | 留出文字叠加区域 |
| 产品展示图 | 1200×1200 / 800×800 | 1:1 | 干净背景，产品居中 |
| 卡片封面/缩略图 | 800×600 / 600×400 | 4:3 | 构图简洁，缩小可辨识 |
| 文章/博客配图 | 1200×675 | 16:9 | 留出遮罩叠加区域 |
| 图标/装饰元素 | 512×512 / 256×256 | 1:1 | 简洁背景，主体清晰 |
| 团队/关于配图 | 1200×800 | 3:2 | 情感化，叙事感 |
| Banner 横幅 | 1200×400 | 3:1 | 文字区域和主体分明 |

---

## 四、提示词编写规范

### 六段式结构

```
[主体描述] + [环境/背景] + [光效/色调] + [风格/质感] + [构图/视角] + [技术参数]
```

| 段落 | 说明 | 示例 |
|:-----|:-----|:-----|
| 主体描述 | 画面核心对象 | 一杯冒着热气的拿铁咖啡 |
| 环境/背景 | 主体所处场景 | 极简白色大理石桌面，窗边自然光 |
| 光效/色调 | 光线和色温 | 暖色侧光，柔和阴影 |
| 风格/质感 | 艺术风格 | 商业摄影风格，胶片质感 |
| 构图/视角 | 画面布局 | 45度俯拍，三分法构图，浅景深 |
| 技术参数 | 渲染质量 | 高品质，8K超高清 |

### 风格后缀（根据项目风格选取）

- **科技感**: 赛博朋克风格，霓虹灯光效，深色背景，科技感，高品质，8K超高清
- **商务专业**: 商业摄影风格，干净简洁，专业灯光，高品质，8K超高清
- **清新自然**: 自然光摄影，明亮通透，清新色调，高品质，8K超高清
- **艺术创意**: 概念艺术，创意构图，丰富色彩，高品质，8K超高清
- **极简现代**: 极简主义设计，留白构图，纯净色彩，高品质，8K超高清

---

## 五、反向提示词库

按类别选取组合：

**通用质量排除（始终包含）**:
```
低质量，模糊，噪点，JPEG伪影，像素化，过曝，欠曝，低分辨率，水印，文字，Logo，签名，边框，变形，畸形
```

**暗色风格追加**: 明亮背景，白色背景，高饱和度，粉彩色，过于鲜艳

**亮色风格追加**: 暗黑，阴暗，恐怖，压抑，过度饱和，霓虹

**写实风格追加**: 卡通，手绘，水彩，油画，素描，漫画，动漫

**插画风格追加**: 真实照片，摄影，写实，纪实

---

## 六、完整工作流程

当用户请求生成图片时，按以下流程操作：

### 步骤 1：检查 MCP 可用性
- 确认即梦 MCP Server 已配置且可用
- 如果未配置，提示用户参考「一、MCP 配置」进行设置
- 识别当前可用的 MCP 工具名称和参数格式

### 步骤 2：分析项目风格
- 执行「二、项目风格分析」，输出风格摘要
- 如果之前已分析过且项目无变化，可复用上次结果

### 步骤 3：确认需求
向用户确认：
- 图片用途（Hero/产品/卡片/装饰/Banner/其他）
- 图片内容描述
- 特殊要求（色调、构图、参考图等）

### 步骤 4：生成提示词
- 结合项目风格摘要和用途模板组合提示词
- 将项目实际色值融入描述
- 准备正向提示词和反向提示词

### 步骤 5：调用 MCP 生成图片

根据检测到的 MCP 工具，适配参数格式调用：

**方案 A — `generate-image` 工具（jimeng-ai-mcp）**:
```
调用 generate-image:
  text: 从提示词中提取的核心文字元素
  illustration: 从提示词中提取 3-5 个装饰性插画关键词
  color: 从项目风格摘要中提取的主色调
  ratio: 根据用途选择（4:3 / 3:4 / 16:9 / 9:16）
```

**方案 B — `generateImage` 工具（@c-rick/jimeng-mcp）**:
```
调用 generateImage:
  prompt: 完整的正向提示词
  negative_prompt: 反向提示词
  width: 根据用途设置宽度
  height: 根据用途设置高度
  model: jimeng-3.1（推荐）
  sample_strength: 0.7（推荐）
```

**方案 C — `generate_image` 工具（Volcengine-Image-MCP）**:
```
调用 generate_image:
  prompt: 完整的正向提示词
  size: 根据用途选择（如 1024x1024 / 1152x864 / 1280x720）
  guidance_scale: 7.5（推荐）
  watermark: false
```

### 步骤 6：处理生成结果
- 从返回结果中获取图片 URL
- 使用 Bash 工具下载图片到项目目录：
  ```bash
  mkdir -p src/assets/images/[类别]
  curl -o src/assets/images/[类别]/[文件名].webp "[图片URL]"
  ```
- 如果原图非 WebP 格式，提示用户转换或使用原格式

### 步骤 7：输出总结

```
🎨 项目风格: [风格摘要简述]

📷 即梦生成结果

用途: [具体用途]
尺寸: [宽×高]
使用的 MCP 工具: [工具名]

✅ 正向提示词:
[使用的提示词]

❌ 反向提示词:
[使用的反向提示词]

📁 保存路径: src/assets/images/[类别]/[文件名].webp

🔗 在组件中引用:
import image from '[相对路径]'
```

### 步骤 8：集成指导

1. **文件存放**: `src/assets/images/` 或项目已有的静态资源目录下按类别分目录
2. **格式优化**: WebP 优先，大图压缩至 200KB 以内
3. **响应式适配**: 考虑 1x/2x 版本或 `<picture>` + `srcset`
4. **组件引用示例**:
   ```tsx
   import heroImage from '@/assets/images/hero/hero-bg.webp'
   <img src={heroImage} alt="描述文字" loading="lazy" />
   ```

---

## 七、批量生成建议

1. **锚点图法**: 先生成一张满意的图，后续复用其风格描述
2. **统一色温**: 同一页面使用相同色温和光效
3. **一致构图**: 同类型图片使用统一视角和背景
4. **图片清单**: 先列出所有需要的图片，统一规划后逐个生成
5. **命名规范**: 英文小写 + 连字符，如 `hero-main.webp`、`product-01.webp`

---

## 八、更多提示词示例

详见 [prompt-examples.md](./prompt-examples.md)，包含各类网站（科技/电商/创意/自然等）和各用途（Hero/产品/卡片/图标/Banner 等）的即用提示词模板。
