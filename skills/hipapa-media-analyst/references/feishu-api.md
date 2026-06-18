# 飞书API调用指南

## 飞书开放平台配置

### 1. 创建企业自建应用

1. 访问 https://open.feishu.cn/app
2. 点击「创建企业自建应用」
3. 填写应用名称：Hi! Papa 数据助手
4. 上传应用图标（可选）

### 2. 开启机器人能力

**权限管理 → 添加权限：**
- `im:chat:readonly`（读取群聊信息）
- `im:message`（发送消息）
- `im:message:send_as_bot`（以机器人身份发送）
- `docx:document:readonly`（读取文档，如需自动读日报）

**功能配置 → 机器人：**
- 开启「接收消息」
- 设置消息卡片或纯文本回复

### 3. 获取凭证

**凭证与基础信息：**
- App ID：`cli_xxxxx`
- App Secret：点击显示并复制

### 4. 发布应用

**版本管理与发布：**
- 创建版本
- 填写更新说明
- 申请发布
- 管理员审批

## 消息推送API

### 发送文本消息到群聊

```python
import requests

APP_ID = "cli_xxxxx"
APP_SECRET = "xxxxx"
CHAT_ID = "oc_xxxxx"  # 群聊ID

# 1. 获取 tenant_access_token
def get_tenant_token():
    url = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal"
    resp = requests.post(url, json={"app_id": APP_ID, "app_secret": APP_SECRET})
    return resp.json()["tenant_access_token"]

# 2. 发送消息
def send_message(token, chat_id, text):
    url = "https://open.feishu.cn/open-apis/im/v1/messages"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"receive_id_type": "chat_id"}
    data = {
        "receive_id": chat_id,
        "msg_type": "text",
        "content": json.dumps({"text": text})
    }
    resp = requests.post(url, headers=headers, params=params, json=data)
    return resp.json()

# 使用示例
token = get_tenant_token()
send_message(token, CHAT_ID, "📊 Hi! Papa 自媒体数据已更新\n今日复盘报告：xxx")
```

### 发送富文本消息（带链接）

```python
def send_rich_message(token, chat_id, title, content, url):
    data = {
        "receive_id": chat_id,
        "msg_type": "post",
        "content": json.dumps({
            "zh_cn": {
                "title": title,
                "content": [
                    [{"tag": "text", "text": content}],
                    [{"tag": "a", "text": "点击查看完整报告", "href": url}]
                ]
            }
        })
    }
    # ... same as above
```

### 发送交互式卡片

```python
def send_card(token, chat_id, title, metrics):
    card = {
        "config": {"wide_screen_mode": True},
        "header": {
            "title": {"tag": "plain_text", "content": title},
            "template": "blue"
        },
        "elements": [
            {
                "tag": "div",
                "text": {"tag": "plain_text", "content": metrics}
            },
            {
                "tag": "action",
                "actions": [{
                    "tag": "button",
                    "text": {"tag": "plain_text", "content": "查看详情"},
                    "url": "https://xxx.github.io/hipapa-dashboard/",
                    "type": "primary"
                }]
            }
        ]
    }
    data = {
        "receive_id": chat_id,
        "msg_type": "interactive",
        "content": json.dumps(card)
    }
    # ... same as above
```

## 接收消息（Webhook）

### 配置Webhook URL

**事件订阅 → 添加订阅事件：**
- `im.message.receive_v1`（接收消息）

**请求地址配置：**
- URL：`https://your-server.com/webhook/feishu`
- 加密Token：随机生成并保存
- Verification Token：飞书生成

### 消息格式

飞书推送的消息格式：
```json
{
  "schema": "2.0",
  "header": {
    "event_id": "xxx",
    "token": "verification_token",
    "create_time": "1234567890"
  },
  "event": {
    "message": {
      "chat_id": "oc_xxxxx",
      "chat_type": "group",
      "content": {"text": "更新看板"},
      "mentions": [{"name": "Hi! Papa 数据助手"}]
    }
  }
}
```

### OpenClaw Webhook处理

在 OpenClaw 中配置 webhook 处理：
```yaml
webhooks:
  feishu-hipapa:
    path: /webhook/feishu
    secret: verification_token
    agent: hipapa-media
```

## 读取飞书文档

### 方案1：浏览器自动化（当前使用）

```
browser open profile=openclaw url=DOC_URL
browser snapshot
```

**优点：** 不需要开通文档API权限
**缺点：** 需要文档开启"互联网分享"，且无法结构化提取

### 方案2：云文档API

```python
# 获取文档内容
import requests

TOKEN = get_tenant_token()
DOCUMENT_ID = "PXVgdr4cgotLhTxEqx5cODwBnb7"  # 从URL提取

# 读取文档元数据
url = f"https://open.feishu.cn/open-apis/docx/v1/documents/{DOCUMENT_ID}"
headers = {"Authorization": f"Bearer {TOKEN}"}
resp = requests.get(url, headers=headers)
print(resp.json())

# 读取文档内容
url = f"https://open.feishu.cn/open-apis/docx/v1/documents/{DOCUMENT_ID}/blocks"
resp = requests.get(url, headers=headers)
print(resp.json())
```

**所需权限：** `docx:document:readonly`

**文档ID提取：**
URL格式：`https://haiguibaba.feishu.cn/docx/PXVgdr4cgotLhTxEqx5cODwBnb7`
文档ID：`PXVgdr4cgotLhTxEqx5cODwBnb7`

## 常见问题

**Q：如何获取群聊ID（chat_id）？**
A：
1. 在飞书群聊中 @机器人
2. 查看飞书推送的消息事件，其中包含 `chat_id`
3. 或者在群设置 → 群信息中查看

**Q：机器人无法发送消息？**
A：检查：
1. 应用是否已发布并通过审批
2. 机器人是否已加入群聊
3. 权限是否已开通
4. token是否过期（有效期约2小时）

**Q：如何测试Webhook？**
A：使用飞书开放平台的「事件订阅」→「请求验证」功能，或curl测试：
```bash
curl -X POST https://your-server.com/webhook/feishu \
  -H "Content-Type: application/json" \
  -d '{"challenge": "test", "token": "verification_token"}'
```

## 参考链接

- 飞书开放平台：https://open.feishu.cn/
- 消息API文档：https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create
- 文档API文档：https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/docx-v1/document/get
