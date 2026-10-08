
const fs = require('fs');
const content = fs.readFileSync('public/favicon.svg', 'utf8');
const b64Match = content.match(/href="data:image\/(png|jpeg);base64,([^"]+)"/);
if (b64Match) {
  fs.writeFileSync('public/favicon.png', Buffer.from(b64Match[2], 'base64'));
  console.log('Successfully extracted base64 image!');
} else {
  console.log('No base64 image found in SVG');
}
