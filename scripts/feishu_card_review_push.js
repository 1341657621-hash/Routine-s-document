const https = require('https');
const url = require('url');

// 璐婷个人确认群 webhook
const REVIEW_WEBHOOK = 'https://open.feishu.cn/open-apis/bot/v2/hook/6f08d0fb-18c9-43d3-9998-d55c3a4d94b9';

// 飞书消息卡片 payload
const cardPayload = {
  msg_type: 'interactive',
  card: {
    config: {
      wide_screen_mode: true
    },
    header: {
      title: {
        tag: 'plain_text',
        content: '📊 Hi! Papa 自媒体数据看板 · 2026-05-22'
      },
      template: 'blue'
    },
    elements: [
      {
        tag: 'column_set',
        flex_mode: 'none',
        background_style: 'grey',
        columns: [
          {
            tag: 'column',
            width: 'weighted',
            weight: 1,
            vertical_align: 'top',
            elements: [
              {
                tag: 'div',
                text: {
                  tag: 'lark_md',
                  content: '**📕 小红书**\n曝光 **8.8万** ↑40%\n观看 **5,647** ↑16%\n涨粉 **387** 🏆超86%'
                }
              }
            ]
          },
          {
            tag: 'column',
            width: 'weighted',
            weight: 1,
            vertical_align: 'top',
            elements: [
              {
                tag: 'div',
                text: {
                  tag: 'lark_md',
                  content: '**💬 公众号**\n粉丝 **218,345** +311\n昨日阅读 **185**\n今日直播 **¥2,312**'
                }
              }
            ]
          },
          {
            tag: 'column',
            width: 'weighted',
            weight: 1,
            vertical_align: 'top',
            elements: [
              {
                tag: 'div',
                text: {
                  tag: 'lark_md',
                  content: '**🔴 微博**\n周阅读 **4,484** ↑49.5%\n昨日阅读 **532** ↑14.6%\n昨日发博 **0** ⚠️'
                }
              }
            ]
          },
          {
            tag: 'column',
            width: 'weighted',
            weight: 1,
            vertical_align: 'top',
            elements: [
              {
                tag: 'div',
                text: {
                  tag: 'lark_md',
                  content: '**🎬 视频号**\n粉丝 **70,089**\n7日作品 **0** 🔴\n互动率 **0.75%** 🔴'
                }
              }
            ]
          }
        ]
      },
      { tag: 'hr' },
      {
        tag: 'div',
        text: {
          tag: 'lark_md',
          content: '**💡 核心洞察**'
        }
      },
      {
        tag: 'note',
        elements: [
          {
            tag: 'plain_text',
            content: '1. 追光IP跨平台碾压 — 母亲节追光1,196阅读 + 西藏来信18,981曝光'
          }
        ]
      },
      {
        tag: 'note',
        elements: [
          {
            tag: 'plain_text',
            content: '2. 小红书涨粉387超86%同类，晒娃有奖涨粉77为最佳'
          }
        ]
      },
      {
        tag: 'note',
        elements: [
          {
            tag: 'plain_text',
            content: '3. 视频号7万粉丝空转 ⚠️ 本周必须启动短视频'
          }
        ]
      },
      { tag: 'hr' },
      {
        tag: 'div',
        text: {
          tag: 'lark_md',
          content: '**📋 P0 行动项**'
        }
      },
      {
        tag: 'note',
        elements: [
          {
            tag: 'plain_text',
            content: '• 视频号启动：每周3-5条「1分钟追光日记」\n• 修复推荐算法：标题加「防晒/宝宝/夏日」\n• 追光扩产：2篇/月 → 4篇/月'
          }
        ]
      },
      {
        tag: 'action',
        actions: [
          {
            tag: 'button',
            text: {
              tag: 'plain_text',
              content: '👉 查看完整看板'
            },
            url: 'https://1341657621-hash.github.io/hipapa-dashboard/',
            type: 'primary'
          }
        ]
      }
    ]
  }
};

const payload = JSON.stringify(cardPayload);

function pushCard(webhookUrl) {
  const parsed = url.parse(webhookUrl);
  const options = {
    hostname: parsed.hostname,
    port: parsed.port || 443,
    path: parsed.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (res.statusCode >= 200 && res.statusCode < 300 && json.code === 0) {
          console.log('飞书卡片推送成功');
        } else {
          console.error('飞书卡片推送失败:', res.statusCode, json.msg || json.message || data);
          process.exit(1);
        }
      } catch (e) {
        console.error('解析响应失败:', data);
        process.exit(1);
      }
    });
  });

  req.on('error', (err) => {
    console.error('网络错误:', err.message);
    process.exit(1);
  });

  req.write(payload);
  req.end();
}

// 推送到璐婷确认群
pushCard(REVIEW_WEBHOOK);
