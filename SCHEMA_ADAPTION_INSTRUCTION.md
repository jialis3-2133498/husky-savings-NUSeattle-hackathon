# Schema 适配说明

本文档用于指导后续负责 Google Sheets schema 适配的组员完成代码调整工作。

## 目标

将 Google Sheets 的 CSV schema 与当前网站的构建前同步流程对齐，使其满足以下要求：

- `npm run sync:deals` 可以成功生成 `NU_Savings/public/data/deals.json`
- 前端页面继续直接读取生成后的静态 JSON
- 不需要额外修改前端页面的数据展示逻辑
- `npm run lint` 和 `npm run build` 均可通过

## 需要优先查看的文件

- `NU_Savings/scripts/sync-deals.mjs`
- `NU_Savings/src/lib/dealsApi.js`
- `DEPLOYMENT.md`

## 开始修改前需要先确认的信息

在改代码之前，请先确认 Google Sheets 的最终 schema：

- 最终列名是什么
- 哪些字段是必填
- 哪些字段是可选
- 日期字段是什么格式
- 图片字段存储的是什么内容

## 当前默认期望的核心字段

当前同步逻辑默认期望这些标准字段：

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

如果 Google Sheets 的列名与这些字段不一致，需要修改字段映射逻辑。

## 需要修改的代码部分

### 1. 表头映射

文件：

- `NU_Savings/scripts/sync-deals.mjs`

重点查看：

- `HEADER_ALIASES`

作用：

- 将 Google Sheets 的列名映射为当前前端使用的标准字段名

例如，如果 Google Sheets 中的列名是：

- `benefit type`
- `verified date`
- `logo path`

那么需要把这些别名补充进 `HEADER_ALIASES`。

### 2. 行数据标准化

文件：

- `NU_Savings/scripts/sync-deals.mjs`

重点查看：

- `normalizeDeal`

作用：

- 定义哪些字段是必填
- 定义哪些字段允许默认值
- 把每一行数据转换成最终写入 `deals.json` 的结构

如果 schema 中：

- 字段名称变化
- 有新增字段
- 必填规则变化
- 默认值逻辑变化

都需要在这里调整。

### 3. CSV 行映射

文件：

- `NU_Savings/scripts/sync-deals.mjs`

重点查看：

- `mapRow`

作用：

- 将 CSV 的每一行解析成对象
- 在进入最终标准化前，把列值与列名匹配起来

### 4. 图片字段适配

如果 schema 中的图片字段不是当前推荐的相对路径格式，例如不是：

```text
logos/target_logo.jpeg
```

则需要检查以下文件：

- `NU_Savings/scripts/sync-deals.mjs`
- `NU_Savings/src/lib/dealsApi.js`

目标是：

- 最终生成到 `deals.json` 的图片路径仍然能被前端正确解析

推荐继续使用相对路径格式，因为它与当前静态资源结构最兼容。

### 5. 日期字段适配

如果 Google Sheets 中日期字段不是 `YYYY-MM-DD` 格式，需要在：

- `NU_Savings/scripts/sync-deals.mjs`

中加入日期规范化逻辑，确保前端显示稳定且统一。

### 6. 文档同步更新

如果最终 schema 与当前默认说明不一致，还需要同步修改：

- `DEPLOYMENT.md`

需要更新的内容包括：

- 字段说明
- Google Sheets 填写规范
- 本地同步命令示例

## 适配完成后本地需要运行的命令

```bash
cd NU_Savings
SHEETS_CSV_URL="your_google_sheets_csv_url" npm run sync:deals
npm run lint
npm run build
```

## 适配完成的判断标准

当满足以下条件时，schema 适配可以视为完成：

- `npm run sync:deals` 能成功把 Google Sheets 数据写入 `public/data/deals.json`
- 生成后的 JSON 字段结构正确
- 图片路径可以被前端正常显示
- `npm run lint` 通过
- `npm run build` 通过
- 折扣页面能正常显示同步后的数据
