---
name: hipapa-media-analyst
description: >
  Hi! Papa（海龟爸爸）品牌自媒体全链路数据采集与行业日报复盘专家。
  覆盖公众号/小红书/视频号/微博四平台后台数据抓取、飞书行业日报读取、
  数据×资讯交叉分析、复盘报告生成、HTML看板输出。
  使用场景：
  1. 用户说"更新看板"/"采集数据"/"生成复盘"——触发自动采集+分析
  2. 用户说"自媒体日报"/"行业复盘"/"结合日报分析"——触发数据×日报交叉分析
  3. 用户说"部署看板"/"推到GitHub"——触发GitHub Pages部署
  4. 用户说"飞书智能体"/"做成机器人"——触发飞书智能体配置指导
  触发词：更新看板、采集数据、生成复盘、自媒体日报、行业复盘、部署看板、飞书智能体
---

# hipapa-media-analyst

## 核心能力

1. **四平台数据采集**（独立浏览器方式，无需WebBridge扩展）
2. **飞书日报读取**（浏览器打开飞书文档，截图/抓取内容）
3. **数据×行业交叉分析**（后台数据 + 行业资讯 = 复盘报告）
4. **HTML看板/复盘报告生成**
5. **GitHub Pages部署**
6. **飞书智能体配置**

## 四平台后台URL模板

用户提供的链接格式（带token，有效期约30分钟）：
- **公众号**：`https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token=TOKEN`
- **小红书粉丝**：`https://creator.xiaohongshu.com/statistics/fans-data`
- **小红书笔记**：`https://creator.xiaohongshu.com/new/note-manager`
- **小红书数据看板**：`https://creator.xiaohongshu.com/statistics/data-analysis`
- **视频号**：`https://channels.weixin.qq.com/platform/statistic/post`
- **微博**：`https://e.weibo.com/v1/eps/manage/home?url=https%3A%2F%2Fdss.sc.weibo.com%2Fpc%2Findex`

## 采集方式

使用 `browser open profile=openclaw` 启动独立浏览器，直接访问带token的URL。
- 优点：不需要WebBridge扩展，不依赖Chrome/Edge
- 缺点：token会过期，需要用户提供新的链接
- 频率：每天一次，用户发链接 → 采集 → 更新看板

## 飞书日报读取

用户提供的日报链接格式：
`https://haiguibaba.feishu.cn/docx/DOC_ID?from=from_copylink`

读取方式：
1. `browser open` 打开飞书文档
2. `browser snapshot` 抓取页面内容
3. 提取关键行业信号、竞品动态、市场数据

## 数据×日报交叉分析框架

### 分析维度

| 维度 | 数据来源 | 分析重点 |
|------|---------|---------|
| **内容优化** | 后台Top内容数据 + 日报内容趋势 | 什么类型内容在当前行业环境下最有效 |
| **增长机会** | 后台粉丝/阅读数据 + 日报市场数据 | 哪些赛道/品类有机会 |
| **风险提示** | 后台异常数据 + 日报监管/政策 | 需要规避什么 |
| **行动清单** | 数据洞察 + 行业热点 | P0/P1/P2优先级行动 |

### 复盘报告结构

1. **核心发现**：3个行业信号 × 后台数据交叉验证
2. **四平台速览**：昨日核心指标卡片
3. **分平台复盘**：公众号/小红书/视频号/微博详细分析
4. **竞品对标**：小红书Top5竞品账号分析（去掉电商销售数据）
5. **跨平台策略**：P0立即执行 + P1本周完成
6. **监控指标**：本周目标量化

## 输出格式

### 1. 数据看板（media_dashboard_full_YYYY-MM-DD.html）
- 全平台核心指标
- 分平台详细数据表
- 趋势图表（Chart.js）
- 数据来源标注

### 2. 复盘报告（daily_review_YYYY-MM-DD.html）
- 行业信号 × 数据交叉分析
- 洞察框（绿色）/ 警告框（黄色）/ 危险框（红色）
- 行动清单（P0/P1）
- 监控指标

## GitHub Pages部署

1. 用户仓库：`https://github.com/1341657621-hash/hipapa-dashboard`
2. GitHub Pages地址：`https://1341657621-hash.github.io/hipapa-dashboard/`
3. 部署方式：
   - GitHub网页上传：`https://github.com/1341657621-hash/hipapa-dashboard/upload/main`
   - 或者用户本地git push

## 飞书智能体配置

### 方案A：Webhook + OpenClaw（推荐）

**原理：** 飞书机器人收到消息 → 调用OpenClaw API → 执行采集分析 → 返回结果到飞书

**配置步骤：**
1. 在飞书开放平台上创建企业自建应用
2. 获取 App ID 和 App Secret
3. 配置机器人能力 → 开启接收消息
4. 设置 Webhook URL（指向OpenClaw或中间服务器）
5. 在OpenClaw中配置飞书消息接收和回复

**OpenClaw配置（agents.yaml）：**
```yaml
agents:
  hipapa-media:
    model: kimi-coding/k2p5
    triggers:
      - type: webhook
        url: /webhook/feishu/hipapa
    instructions: |
      当收到飞书消息时：
      1. 如果消息包含"更新看板"或"采集数据"：
         - 回复"正在采集四平台数据..."
         - 执行数据采集流程
         - 生成看板HTML
         - 回复"看板已更新，链接：xxx"
      2. 如果消息包含"生成复盘"或"行业复盘"：
         - 回复"正在读取行业日报..."
         - 读取飞书日报
         - 执行交叉分析
         - 生成复盘报告
         - 回复"复盘报告已生成，链接：xxx"
      3. 如果消息包含"帮助"：
         - 回复可用命令列表
```

**用户需要提供的信息：**
- 飞书企业ID（tenant_key）
- 飞书应用 App ID 和 App Secret
- 接收消息的群聊 ID 或用户 ID
- 日报文档链接（固定格式）
- GitHub仓库地址

### 方案B：定时Cron + 消息推送

**原理：** OpenClaw定时执行采集分析 → 自动推送到飞书群

**配置：**
```yaml
cron:
  hipapa-daily:
    schedule: "0 9 * * *"  # 每天上午9点
    agent: hipapa-media
    message: |
      执行：
      1. 采集四平台昨日数据
      2. 读取今日行业日报
      3. 生成复盘报告
      4. 推送到飞书群
```

### 方案C：飞书多维表格作为数据源

**原理：** 用飞书多维表格存储历史数据，智能体读取后分析趋势

**表格结构：**
- 表1：四平台每日数据（日期/平台/指标/数值）
- 表2：行业日报摘要（日期/信号/重要性/关联平台）
- 表3：复盘报告索引（日期/报告链接/关键结论）

## 常见问题

**Q：token过期怎么办？**
A：让用户重新打开后台页面，复制新链接发给你。独立浏览器方式token有效期约30分钟。

**Q：飞书日报打不开？**
A：需要用户开通文档的"互联网分享"权限，或者把机器人加入文档协作者。

**Q：GitHub Pages部署失败？**
A：检查文件是否已上传到仓库，Pages设置中分支是否正确（main）。

## 参考文件

- `references/platform-urls.md`：四平台后台URL模板和采集注意事项
- `references/feishu-api.md`：飞书API调用指南（消息推送、文档读取）
- `references/analysis-framework.md`：数据×日报交叉分析框架详细说明
- `assets/dashboard-template.html`：数据看板HTML模板
- `assets/review-template.html`：复盘报告HTML模板
