# Hi! Papa 自媒体数据看板自动化方案
# 配置日期：2026-05-22
# 目标：每次采集后自动部署到同一GitHub Pages链接

## 自动化流程

```
触发 → 数据采集 → 生成看板 → GitHub部署 → 推送摘要给璐婷确认 → 璐婷同意后推飞书
```

## 环节说明

### 1. 触发方式
- **默认：手动触发** — 用户发token链接 → 启动采集
- **可选：定时提醒** — 每天上午10点提醒用户发token（HEARTBEAT.md配置）

### 2. 数据采集
- 输入：用户提供4平台后台链接（含token）
- 输出：各平台原始数据JSON
- **限制**：token有效期约30分钟，必须由用户主动提供，无法纯自动抓取

### 3. 生成看板
- 输入：采集的原始数据
- 输出：media_dashboard_full_YYYY-MM-DD.html
- 配色：海龟爸爸品牌VI（海洋蓝#0560C4 + 阳光橙#FC8E51）
- 图表：Chart.js折线图+饼图

### 4. GitHub自动部署
- 目标：https://1341657621-hash.github.io/hipapa-dashboard/
- 方式：GitHub API PUT /repos/.../contents/index.html
- 认证：PAT（从环境变量 `GITHUB_TOKEN` 读取）
- 特点：链接不变，内容刷新，SHA自动更新
- **状态：已验证可行，已跑通**

### 5. 飞书推送（璐婷确认制）
- 步骤1：采集完成后，先把摘要发给璐婷
- 步骤2：等璐婷说"确认推送"或"同意"
- 步骤3：才推送到飞书群
- **规则来源：2026-05-22 璐婷指令**

## 失败处理

| 环节 | 失败表现 | 处理方式 |
|------|---------|---------|
| 数据采集 | token过期/页面加载失败 | 立即停止，报给用户"token过期，请刷新后重发" |
| 看板生成 | 数据缺失/格式错误 | 用上一次成功数据兜底，标记"部分数据沿用" |
| GitHub部署 | API报错/网络问题 | 重试1次，失败后报给用户，保留本地HTML文件 |
| 飞书推送 | webhook失效 | 报给用户检查机器人状态 |

## 配置位置

- GitHub部署脚本：`workspace/github_deploy.js`
- 飞书推送脚本：`workspace/feishu_push.js`
- 看板模板：`workspace/media_dashboard_full_YYYY-MM-DD.html`
- 规则配置：`workspace/feishu_bot_config.md`

## 执行记录

- 2026-05-22：首次完整跑通（采集→看板→GitHub→飞书）
- GitHub SHA：fab08588b633cdf97e35f4d2775859f0ff9a75ec
