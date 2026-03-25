# Husky Student Savings 部署与使用说明

本文档说明如何在本地运行、修改内容、构建、部署，以及如何在 GitHub Pages 上稳定发布当前网站。

## 1. 项目概览

当前项目是一个基于 React + Vite 的静态网站，部署方式为 GitHub Pages。

项目目录说明：

- 仓库根目录：克隆后的项目根目录
- 前端项目目录：`NU_Savings/`
- 部署工作流：`.github/workflows/deploy.yml`
- 优惠数据文件：`NU_Savings/public/data/deals.json`
- Logo 资源目录：`NU_Savings/public/logos/`
- 首页图片目录：`NU_Savings/public/images/`

当前网站的关键特点：

- 首页内容优先加载，折扣目录页按需加载
- 优惠数据来自静态 JSON 文件，适合 GitHub Pages
- 构建后输出到 `NU_Savings/dist/`
- 支持在构建前从 Google Sheets CSV 同步折扣数据

仓库链接：

- 当前开发分支：`https://github.com/jialis3-2133498/husky-savings-NUSeattle-hackathon/tree/refactor/site-architecture`

## 2. 环境要求

建议环境：

- Node.js 20 或更高版本
- npm 10 或更高版本
- Git
- GitHub 仓库写入权限

检查版本命令：

```bash
node -v
npm -v
git --version
```

## 3. 首次安装

先将仓库克隆到本地，然后进入前端目录安装依赖。

克隆仓库：

```bash
git clone https://github.com/jialis3-2133498/husky-savings-NUSeattle-hackathon.git
cd husky-savings-NUSeattle-hackathon
```

安装依赖：

```bash
cd NU_Savings
npm ci
```

如果只是快速安装，也可以使用：

```bash
npm install
```

推荐优先使用 `npm ci`，因为它更适合团队协作和稳定复现。

## 4. 本地开发

启动本地开发服务器：

```bash
cd NU_Savings
npm run dev
```

启动后，终端会显示本地访问地址，通常类似：

```text
http://localhost:5173/
```

本地开发时建议这样使用：

- 修改页面结构：编辑 `NU_Savings/src/pages/`、`NU_Savings/src/components/`
- 修改样式：编辑 `NU_Savings/src/styles/appStyles.js` 和 `NU_Savings/src/App.css`
- 修改优惠数据：编辑 `NU_Savings/public/data/deals.json`
- 替换 logo：将新图片放入 `NU_Savings/public/logos/`
- 替换首页图片：将新图片放入 `NU_Savings/public/images/`

## 5. 常用命令

在 `NU_Savings/` 目录下执行：

启动开发环境：

```bash
npm run dev
```

检查代码规范：

```bash
npm run lint
```

构建生产版本：

```bash
npm run build
```

本地预览生产版本：

```bash
npm run preview
```

推荐发布前至少执行这两个命令：

```bash
npm run lint
npm run sync:deals
npm run build
```

## 6. 优惠数据如何修改

当前网站对外仍然使用静态数据文件：

`NU_Savings/public/data/deals.json`

推荐的数据维护方式已经改为：

- 日常内容维护在 Google Sheets
- 构建前执行同步脚本
- 由脚本生成新的 `deals.json`
- 如果同步失败，则继续使用仓库中已有的旧 `deals.json`

每一条数据的基本结构示例：

```json
{
  "id": "retail_amazon_prime",
  "record_type": "benefit",
  "category": "retail",
  "name": "Amazon Prime Student",
  "url": "https://www.amazon.com/joinstudent",
  "description": "Discounted Amazon Prime membership with student-exclusive pricing.",
  "benefit_type": "subscription",
  "source_type": "official",
  "last_verified": "2026-03-21",
  "image": "logos/amazon-160-svgrepo-com.svg"
}
```

字段说明：

- `id`：唯一标识，不能重复
- `record_type`：记录类型，例如 `benefit`、`resource`
- `category`：分类，当前建议使用以下值：
  - `campus_life`
  - `entertainment`
  - `transportation`
  - `wellness`
  - `food`
  - `retail`
  - `travel`
  - `technology`
- `name`：优惠名称
- `url`：外部链接
- `description`：描述文案
- `benefit_type`：优惠类型，例如 `discount`、`free_access`、`directory`
- `source_type`：来源类型，例如 `official`、`third_party`
- `last_verified`：最后核验日期，建议格式 `YYYY-MM-DD`
- `image`：图片相对路径，通常写成 `logos/文件名`

修改数据时的注意事项：

- `id` 必须唯一
- `url` 建议使用 `https://`
- `image` 对应的文件必须真实存在于 `NU_Savings/public/logos/`
- 修改 JSON 后务必执行：

```bash
npm run build
```

如果 JSON 格式写错，构建或运行时会出问题。

## 6.1 Google Sheets 同步方案

当前项目已支持在构建前同步 Google Sheets CSV 数据。

默认约定：

- Google Sheets 使用公开 CSV 导出链接
- 表头尽量与当前 `deals.json` 字段保持一致
- `image` 字段建议存相对路径，例如：

```text
logos/target_logo.jpeg
```

支持的主要字段：

- `id`
- `record_type`
- `category`
- `name`
- `url`
- `description`
- `benefit_type`
- `source_type`
- `last_verified`
- `image`

推荐在 GitHub 仓库中配置一个 secret：

```text
SHEETS_CSV_URL
```

本地手动同步命令：

```bash
cd NU_Savings
SHEETS_CSV_URL="your_google_sheets_csv_url" npm run sync:deals
```

如果没有配置 `SHEETS_CSV_URL`，同步脚本会：

- 跳过同步
- 保留现有 `public/data/deals.json`
- 不阻断后续构建

如果拉取 Google Sheets 失败，脚本也会：

- 输出 warning
- 保留旧数据
- 允许构建继续执行

## 7. 图片资源如何替换

### 7.1 替换 logo

把 logo 文件放入：

```text
NU_Savings/public/logos/
```

然后在 `NU_Savings/public/data/deals.json` 中更新对应的 `image` 字段，例如：

```json
"image": "logos/new_logo.png"
```

### 7.2 替换首页大图

首页当前使用这三个文件：

- `NU_Savings/public/images/home_top.jpg`
- `NU_Savings/public/images/home_middle.jpg`
- `NU_Savings/public/images/home_foot.jpg`

如果替换图片，建议：

- 优先使用 `.jpg`
- 尽量压缩体积
- 保持文件名不变，这样不需要改代码

如果文件名改变，需要同步修改：

`NU_Savings/src/pages/HomePage.jsx`

## 8. 本地发布前检查

建议每次正式发布前执行以下步骤：

1. 拉取最新代码
2. 安装依赖
3. 运行 lint
4. 运行 build
5. 本地 preview 检查页面

完整命令示例：

```bash
cd husky-savings-NUSeattle-hackathon
git pull
cd NU_Savings
npm ci
npm run lint
SHEETS_CSV_URL="your_google_sheets_csv_url" npm run sync:deals
npm run build
npm run preview
```

重点检查：

- 首页是否能正常打开
- 点击 `Browse Discounts` 是否进入目录页
- 搜索和分类筛选是否正常
- 每张卡片的 `Learn More` 是否可点击
- GitHub Pages 路径是否正确
- 图片是否都能显示

## 9. GitHub Pages 部署方式

当前项目通过 GitHub Actions 自动部署。

工作流文件：

`.github/workflows/deploy.yml`

当前配置下，以下分支 push 后会触发部署：

- `main`
- `master`

此外，工作流会每 24 小时自动触发一次定时构建更新。

构建前，GitHub Actions 会尝试执行：

```bash
npm run sync:deals
```

如果同步成功，会使用新生成的静态数据部署。

如果同步失败，则保留仓库中已有的 `deals.json` 并继续构建与部署。

也可以手动触发部署：

- 打开 GitHub 仓库页面
- 进入 `Actions`
- 选择 `Deploy Vite site to GitHub Pages`
- 点击 `Run workflow`

## 10. 推荐发布流程

### 方案 A：最推荐

适合正式演示前的稳定发布。

```bash
cd husky-savings-NUSeattle-hackathon
git checkout main
git pull
cd NU_Savings
npm ci
npm run lint
npm run build
cd ..
git status
git add .
git commit -m "Prepare presentation release"
git push origin main
```

推送到 `main` 后，GitHub Actions 会自动构建并部署。

### 方案 B：当前开发分支先合并再发版

如果你当前在功能分支，例如：

```text
refactor/site-architecture
```

可以这样做：

```bash
cd husky-savings-NUSeattle-hackathon
git checkout refactor/site-architecture
git pull
cd NU_Savings
npm run lint
npm run build
cd ..
git add .
git commit -m "Optimize site for presentation"
git push origin refactor/site-architecture
git checkout main
git pull
git merge refactor/site-architecture
git push origin main
```

这样最终还是由 `main` 触发 GitHub Pages 自动部署。

## 11. 如何确认部署成功

### 11.1 在 GitHub 上确认

打开仓库的 `Actions` 页面，查看最新工作流是否成功：

- `build` 成功
- `deploy` 成功

### 11.2 在 Pages 设置中确认

GitHub 仓库页面：

- `Settings`
- `Pages`

确认来源为 GitHub Actions，页面地址正常生成。

### 11.3 打开线上地址检查

线上地址通常类似：

```text
https://<github-username>.github.io/husky-savings-NUSeattle-hackathon/
```

检查以下内容：

- 首页正常显示
- 图片正常显示
- 点击 `Perks and Benefits` 正常进入目录页
- 直接访问带 hash 的链接正常：

```text
https://<github-username>.github.io/husky-savings-NUSeattle-hackathon/#discounts
```

## 12. 当前部署依赖的关键配置

### 12.1 Vite base 路径

文件：

`NU_Savings/vite.config.js`

当前配置：

```js
base: '/husky-savings-NUSeattle-hackathon/'
```

如果将来 GitHub 仓库名改变，这一项也必须一起改，否则静态资源路径会出错。

例如仓库名改成 `husky-savings-site`，那么需要改成：

```js
base: '/husky-savings-site/'
```

### 12.2 GitHub Actions 触发分支

文件：

`.github/workflows/deploy.yml`

当前只会自动部署：

- `main`
- `master`

如果团队决定使用别的发布分支，需要同步修改这里。

## 13. 常见问题排查

### 13.1 页面打开了，但图片不显示

排查顺序：

1. 检查图片文件是否存在于 `public/logos/` 或 `public/images/`
2. 检查 `deals.json` 中的 `image` 路径是否正确
3. 检查仓库名是否变化但 `vite.config.js` 里的 `base` 没改
4. 重新执行：

```bash
npm run build
```

### 13.2 本地能跑，线上 404

通常检查这几项：

- GitHub Pages 是否已启用
- workflow 是否执行成功
- `vite.config.js` 的 `base` 是否正确
- 访问地址是否与仓库名一致

### 13.3 push 后没有自动部署

检查：

- 是否 push 到 `main` 或 `master`
- 是否只是 push 到其他功能分支
- GitHub Actions 是否被仓库权限限制

如果不在自动部署分支上，可以手动进入 GitHub Actions 页面执行 `Run workflow`。

### 13.4 `npm run build` 失败

先执行：

```bash
npm ci
```

然后再执行：

```bash
npm run build
```

如果还是失败，再检查：

- `deals.json` 是否格式错误
- 图片路径是否写错
- 代码是否存在语法错误
- `SHEETS_CSV_URL` 是否未配置或失效

### 13.5 `npm run lint` 失败

说明代码风格或 React Hooks 使用不符合当前 ESLint 规则。建议先根据终端提示修复，再进行正式发布。

## 14. 演示前建议

为了保证四天后的 pre 稳定运行，建议至少提前一天完成以下操作：

1. 确认演示使用的最终分支
2. 把最终版本部署到 GitHub Pages
3. 用不同设备访问一次线上站点
4. 检查校园网络下是否能打开
5. 准备一个本地开发版兜底

建议保留两个可用入口：

- 线上正式地址：用于演示
- 本地 `npm run dev`：用于网络异常时兜底

## 15. 团队协作建议

如果多人一起改内容，建议遵循以下流程：

- 结构和代码改动走功能分支
- 优惠内容改动集中维护 `public/data/deals.json`
- 发布前统一由一人负责合并到 `main`
- 每次发布前固定执行：

```bash
npm run lint
npm run build
```

## 16. 当前最关键的文件

如果只看最重要的几个文件，优先关注：

- `.github/workflows/deploy.yml`
- `NU_Savings/vite.config.js`
- `NU_Savings/public/data/deals.json`
- `NU_Savings/scripts/sync-deals.mjs`
- `NU_Savings/src/pages/HomePage.jsx`
- `NU_Savings/src/pages/DiscountsPage.jsx`

## 17. 一套最短可执行流程

如果你现在只想快速完成一次可上线部署，可以直接按下面执行：

```bash
cd husky-savings-NUSeattle-hackathon/NU_Savings
npm ci
npm run lint
npm run build
cd ..
git add .
git commit -m "Deploy latest version"
git push origin main
```

完成后去 GitHub `Actions` 页面确认部署成功，再打开线上地址检查页面即可。
