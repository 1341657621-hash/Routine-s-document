# 📚 Routine's Document Hub

本仓库用于托管 **OpenClaw workspace** 中的可迁移文档，包括 Skills、项目文档、数据看板、配置脚本等。

## 📁 目录结构

```
├── skills/                          # OpenClaw Skill 定义文档
│   ├── hipapa-media-analyst/        # Hi! Papa 品牌自媒体分析
│   ├── brand-social-media-planner/  # 品牌自媒体策划
│   ├── beauty-signal-reporter/      # 小红书数据周报
│   ├── invest-analyst-pro/          # A股盘后分析
│   └── kimi-webbridge-desktop/      # Kimi WebBridge 桌面端
├── projects/                        # 项目跟踪文档
│   └── business-leads/              # 商业机会追踪
├── dashboards/                      # 数据看板
│   └── hipapa/                      # Hi! Papa 品牌数据看板
├── configs/                         # 配置文档
├── reports/                         # 业务分析报告
├── scripts/                         # 可复用脚本
└── README.md                        # 本文件
```

## 🔄 自动同步

本仓库通过 **OpenClaw Cron** 每周自动同步一次（每周日 23:00）。

## 📝 使用方式

### 在 OpenClaw 中引用远程 Skill

```javascript
// 通过 Raw URL 读取
const skillUrl = "https://raw.githubusercontent.com/1341657621-hash/Routine-s-document/main/skills/hipapa-media-analyst/SKILL.md";
```

### 本地更新后同步

```bash
cd Routine-s-document
node scripts/sync-from-local.js
```

## ⚠️ 不包含的内容

以下文件因隐私或临时性原因**不会**同步到本仓库：

- `memory/` — 对话历史、个人状态
- `tmp/` — 临时文件
- `SOUL.md / USER.md` — 个人身份配置
- `cron-tasks.md` — 本地调度配置
- `stock_portfolio.json` — 股票持仓信息

---

*最后同步时间: 见 git commit 时间*
