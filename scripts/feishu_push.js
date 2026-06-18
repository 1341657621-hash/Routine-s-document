const https = require('https');
const fs = require('fs');
const path = require('path');

// 飞书机器人推送脚本
// 用途：推送海龟爸爸自媒体数据看板
// 频率：每周五（由 HEARTBEAT.md 或 cron 触发）
// 编码：UTF-8（Node.js 确保中文不乱码）

const WEBHOOK_URL = 'https://open.feishu.cn/open-apis/bot/v2/hook/4d94b880-0d0a-40c6-8059-17159f905c8d';

function pushToFeishu(text) {
  const payload = JSON.stringify({ msg_type: 'text', content: { text } });

  return new Promise((resolve, reject) => {
    const req = https.request(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('Response:', data);
        resolve(data);
      });
    });

    req.on('error', err => {
      console.error('Error:', err.message);
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

// 如果直接运行此脚本，推送测试消息
if (require.main === module) {
  const testMsg = '海龟爸爸数据看板机器人已激活\n推送频率：每周五自动更新';
  pushToFeishu(testMsg);
}

module.exports = { pushToFeishu };
