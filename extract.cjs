const fs = require('fs');
const content = fs.readFileSync('public/favicon.svg', 'utf8');
const matches = [...content.matchAll(/href="data:image\/(png|jpeg);base64,([^"]+)"/g)];
if (matches.length > 0) {
  // Find the largest base64 string
  let largestMatch = matches[0];
  for (let i = 1; i < matches.length; i++) {
    if (matches[i][2].length > largestMatch[2].length) {
      largestMatch = matches[i];
    }
  }
  fs.writeFileSync('public/favicon.png', Buffer.from(largestMatch[2], 'base64'));
  console.log('Successfully extracted the largest base64 image! Length:', largestMatch[2].length);
} else {
  console.log('No base64 image found in SVG');
}
