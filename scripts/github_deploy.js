const fs = require('fs');
const https = require('https');

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = '1341657621-hash';
const REPO = 'hipapa-dashboard';
const FILE_PATH = 'C:\\Users\\Routi\\.kimi_openclaw\\workspace\\media_dashboard_full_2026-05-22.html';

if (!TOKEN) {
  console.error('GITHUB_TOKEN not set');
  process.exit(1);
}

const content = fs.readFileSync(FILE_PATH, 'utf-8');
const base64 = Buffer.from(content).toString('base64');

const payload = JSON.stringify({
  message: 'Update dashboard 2026-05-22 v2 - full design',
  content: base64,
  branch: 'main',
  sha: 'fab08588b633cdf97e35f4d2775859f0ff9a75ec'
});

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: `/repos/${OWNER}/${REPO}/contents/index.html`,
  method: 'PUT',
  headers: {
    'Authorization': `token ${TOKEN}`,
    'User-Agent': 'hipapa-bot',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'Accept': 'application/vnd.github.v3+json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('SUCCESS: Dashboard uploaded to GitHub');
      console.log('SHA:', json.content?.sha);
      console.log('URL:', json.content?.html_url);
    } else {
      console.error('FAILED:', res.statusCode, json.message || data);
      process.exit(1);
    }
  });
});

req.on('error', (err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});

req.write(payload);
req.end();
