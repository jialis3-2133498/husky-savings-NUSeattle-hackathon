# Update Log

## 2026.3.24 update

本次更新主要围绕加载速度、部署稳定性、资源可维护性和团队文档整理展开。

### 1. 页面结构与加载优化

- 将原本集中在单个 `App.jsx` 中的页面逻辑拆分为多个模块：
  - `Navbar`
  - `Footer`
  - `DiscountCard`
  - `HomePage`
  - `DiscountsPage`
- 将折扣目录页改为按需懒加载，减少首页首屏加载压力。
- 将优惠数据改为通过静态 JSON 文件读取，而不是直接打入首页主包。
- 新增加载态和错误态展示，提升页面在数据加载失败时的稳定性。

### 2. 数据与资源管理优化

- 优惠数据统一放入：
  - `NU_Savings/public/data/deals.json`
- Logo 资源统一放入：
  - `NU_Savings/public/logos/`
- 首页图片统一放入：
  - `NU_Savings/public/images/`
- 新增站点内容配置文件：
  - `NU_Savings/src/data/siteContent.json`
- Footer 社交 logo、首页主图、featured deals 等内容不再分散硬编码在组件中，而是通过统一配置读取。
- 新增资源路径解析工具：
  - `NU_Savings/src/lib/assets.js`

### 3. 图片与体积优化

- 首页三张大图从 PNG 转为 JPEG，显著降低体积。
- 为非首屏图片增加 `loading="lazy"` 和 `decoding="async"`。
- 使用 `content-visibility` 优化部分页面区块渲染。
- 构建产物总体积明显下降，首页资源加载压力降低。

### 4. 构建与部署优化

- 调整 `vite.config.js`，补充构建目标和 vendor chunk 拆分。
- 优化 GitHub Pages 部署工作流：
  - 自动部署分支调整为 `main` 和 `master`
  - 增加构建超时限制
  - 增加 artifact 输出检查
- 已验证以下命令可通过：

```bash
cd NU_Savings
npm run lint
npm run build
```

### 5. 文档整理

- 新增团队使用文档：
  - `DEPLOYMENT.md`
- 将部署文档改写为适合组员使用的版本，去除了个人路径和个人信息。
- 在部署文档中加入当前开发分支 GitHub 链接。
- 重写根目录 `README.md`，使其成为仓库主说明。
- 清理 `NU_Savings/README.md` 中原有的 Vite 模板内容，改为简洁说明。

### 6. 仓库结构清理

- 将 `.gitignore` 规则统一到仓库根目录。
- 删除子目录中的重复 `.gitignore`。
- 保持当前 `NU_Savings/` 子目录结构不变，避免在 pre 前引入额外构建风险。

### 7. 当前结果

- 首页首屏更轻
- 折扣目录页加载更稳
- 资源替换方式更统一
- 部署流程更清晰
- 文档更适合团队协作使用
