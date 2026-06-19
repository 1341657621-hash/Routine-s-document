const https = require('https');

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = '1341657621-hash';
const REPO = 'hipapa-dashboard';

if (!TOKEN) {
  console.error('GITHUB_TOKEN not set');
  process.exit(1);
}

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: `/repos/${OWNER}/${REPO}/contents/index.html`,
  method: 'GET',
  headers: {
    'Authorization': `token ${TOKEN}`,
    'User-Agent': 'hipapa-bot',
    'Accept': 'application/vnd.github.v3+json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (res.statusCode === 200) {
        console.log('SHA:', json.sha);
        console.log('SIZE:', json.size);
      } else if (res.statusCode === 404) {
        console.log('NO_EXIST');
      } else {
        console.error('ERROR:', res.statusCode, json.message || data);
      }
    } catch (e) {
      console.error('PARSE_ERROR:', data);
    }
  });
});

req.on('error', (err) => {
  console.error('NET_ERROR:', err.message);
});

req.end();
