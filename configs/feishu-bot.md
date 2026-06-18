# Feishu Bot Webhook Configuration
# 海龟爸爸数据看板机器人
# 创建时间：2026-05-20
# 更新：2026-05-20 — 推送频率改为每周五

webhook_url: https://open.feishu.cn/open-apis/bot/v2/hook/4d94b880-0d0a-40c6-8059-17159f905c8d
# 璐婷个人确认群 webhook（2026-05-22添加）
# 用途：推送前先发到这里给璐婷确认，她同意后再推正式群
review_webhook_url: https://open.feishu.cn/open-apis/bot/v2/hook/6f08d0fb-18c9-43d3-9998-d55c3a4d94b9
purpose: 每周五自动推送自媒体数据看板报告
push_frequency: 每周五（weekly on Friday）
platforms:
  - 微信公众号
  - 小红书
  - 视频号
  - 微博

# 推送触发方式
# 1. 手动：用户说"推送看板"时触发
# 2. 自动：每周五定时执行（需配置 HEARTBEAT.md 或 cron）
#    流程：采集数据 → 生成看板 → 先发用户确认 → 用户说"确认推送" → 推送到飞书群
# 3. 紧急：用户说"紧急推送"时触发

# 推送前确认流程（2026-05-20更新 → 2026-05-22追加规则）
# 1. 采集数据并生成看板
# 2. 在当前聊天窗口发送看板摘要给用户
# 3. 等待用户确认（说"确认推送"或"推送"）
# 4. 用户确认后，再推送到飞书群
# 5. 如果用户要求修改，先修改再推送
#
# ⚠️ 璐婷规则（2026-05-22）：每次飞书推送前必须经璐婷确认，她同意后才可以发送。
#    严禁未经确认直接推送。

# 发送脚本：feishu_push.js（Node.js，UTF-8编码）
# node "C:\Users\Routi\.kimi_openclaw\workspace\feishu_push.js"

# 推送记录
push_history:
  - 2026-05-20 15:16: 首次连接测试
  - 2026-05-20 15:17: 完整看板数据推送（卡片格式，中文乱码）
  - 2026-05-20 15:20: 纯文本格式推送（中文乱码）
  - 2026-05-20 15:23: 编码修复测试成功
  - 2026-05-20 15:24: 完整看板数据推送（System.Net.WebRequest，中文正常）
  - 2026-05-20 15:29: 完整看板数据推送（Node.js，UTF-8编码正确）
