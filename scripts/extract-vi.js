const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('C:\\Users\\Routi\\.openclaw\\workspace\\downloads\\19e4510a-e612-8ecd-8000-000067d60721_海龟爸爸品牌VI-2025_v5.3.pdf');

pdf(dataBuffer).then(data => {
  const lines = data.text.split(/\r?\n/);
  let output = [];
  lines.forEach((line) => {
    line = line.trim();
    if (!line) return;
    if (/色|RGB|HEX|颜色|标准|辅助|主色|海龟|Color|品牌|蓝|橙|黄|绿/.test(line)) {
      output.push(line);
    }
  });
  console.log(output.slice(0, 100).join('\n'));
}).catch(err => {
  console.error('Error:', err.message);
});
