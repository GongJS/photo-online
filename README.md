# 证件照生成器

一个在浏览器端运行的 **AI 证件照生成器**。
支持一键抠图、更换底色、选择常见证件照尺寸（一寸、二寸、身份证、护照），并导出 PNG 图片。完全在本地浏览器中处理，无需后端服务。

---

## 功能特性

- **多尺寸支持**
  - 一寸：25×35mm（295×413 px）
  - 二寸：35×49mm（413×579 px）
  - 身份证：26×32mm（358×441 px）
  - 护照：33×48mm（390×567 px）

- **多底色选择** — 白底 / 蓝底 / 红底，点击即切换，预览实时更新

- **AI 智能抠图**
  - 基于 `@imgly/background-removal` + `onnxruntime-web`
  - 在浏览器中完成前景分割，图片不上传服务器
  - 页面加载后静默预加载模型，首次使用等待更短

- **可视化预览与微调** — 拖拽调整位置，滑块缩放大小，所见即所得

- **一键生成与下载** — 点击「生成证件照」按钮导出 PNG（文件名自带尺寸，如 `证件照_一寸.png`）

- **移动端优先 UI** — 卡片式布局，渐变 Header，底部固定操作栏

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 构建工具 | Vite 8 |
| 前端框架 | Vue 3（Composition API + `<script setup>`） |
| 语言 | TypeScript（strict 模式） |
| 样式 | 原生 CSS，移动端优先 |
| AI 抠图 | `@imgly/background-removal` + `onnxruntime-web`（WASM / WebGPU） |
| 部署 | GitHub Actions → GitHub Pages |

---

## 目录结构

```
├── .github/workflows/
│   └── deploy.yml             # GitHub Actions 自动部署配置
├── index.html                 # Vite 入口 HTML
├── package.json
├── vite.config.ts             # Vite 配置（base / @ 别名 / optimizeDeps）
├── tsconfig.app.json          # TypeScript 配置（@/ 路径别名）
└── src/
    ├── main.ts                # 应用入口
    ├── style.css              # 全局样式（基础 reset）
    ├── types.ts               # 公共类型与配置常量（尺寸 / 底色）
    ├── composables/
    │   └── usePhotoEditor.ts  # 核心逻辑：AI 抠图、预览、生成、下载
    └── components/
        ├── AppHeader.vue      # 顶部渐变标题
        ├── SizeSelector.vue   # 尺寸选择卡片
        ├── ColorSelector.vue  # 底色选择卡片
        ├── UploadCard.vue     # 相册选择 / 拍照上传
        ├── StatusCard.vue     # AI 处理状态展示
        ├── PreviewCard.vue    # 拖拽 + 缩放预览
        ├── ResultCard.vue     # 结果展示 + 下载
        └── BottomBar.vue      # 底部「生成证件照」按钮
```

---

## 安装与运行

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

浏览器打开 `http://localhost:5173` 即可访问，支持热更新。

### 构建

```bash
npm run build
```

产物生成在 `dist/` 目录。

### 本地预览构建产物

```bash
npm run preview
```

访问终端输出的地址（通常为 `http://localhost:4173`）。

> `vite.config.ts` 已设置 `base: './'`，也可用任意静态服务器直接打开 `dist/index.html`。

---

## 部署到 GitHub Pages

项目已配置好 GitHub Actions 自动部署，推送即上线。

### 步骤

1. **创建 GitHub 仓库并推送**

```bash
git init
git add .
git commit -m "init: 证件照生成器"
git remote add origin git@github.com:<用户名>/<仓库名>.git
git branch -M main
git push -u origin main
```

2. **启用 GitHub Pages**

   进入仓库 **Settings → Pages → Source**，选择 **GitHub Actions**。

3. **自动部署**

   每次推送到 `main` 分支，Actions 会自动构建并部署。也可在 **Actions** 页面手动触发。

4. **访问站点**

```
https://<用户名>.github.io/<仓库名>/
```

### 工作流说明

`.github/workflows/deploy.yml` 执行流程：

| 阶段 | 动作 |
|------|------|
| Build | checkout → setup Node 20 → `npm ci` → `npm run build` → 上传 `dist/` |
| Deploy | 将产物部署到 GitHub Pages |

设置了 `concurrency` 避免同时多次部署冲突。

---

## 使用说明

1. **选择尺寸** — 一寸 / 二寸 / 身份证 / 护照，预览框比例自动跟随
2. **选择底色** — 白底 / 蓝底 / 红底
3. **上传照片** — 从相册选择或立即拍照（建议纯色背景、正面、光线均匀）
4. **等待抠图** — 状态卡片显示进度，完成后绿色提示
5. **预览调整** — 拖拽移动人像位置，滑块缩放大小
6. **生成下载** — 点击底部按钮生成，再点「下载证件照」保存 PNG

---

## 注意事项

- **首次加载**：AI 模型约 80MB，首次需下载，之后浏览器会缓存
- **浏览器兼容**：推荐 Chrome / Edge / Safari 最新版。`SharedArrayBuffer` 和 WebGPU 支持可提升性能
- **隐私安全**：图片处理完全在本地完成，不上传至任何服务器
- **HTTPS 部署**：若需 `SharedArrayBuffer` 加速，服务端需配置 `Cross-Origin-Opener-Policy` 和 `Cross-Origin-Embedder-Policy` 头

---

## License

本项目仅供学习与个人使用。
`@imgly/background-removal` 采用 AGPL 协议，商用或闭源场景请查阅其许可条款。
