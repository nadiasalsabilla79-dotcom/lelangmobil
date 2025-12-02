// GitHub API Upload Script
// Requires GitHub Personal Access Token

const fs = require('fs');
const https = require('https');

const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN_HERE'; // Replace with your token
const REPO_OWNER = 'nadiasalsabilla79-dotcom';
const REPO_NAME = 'lelangmobil';
const FILE_PATH = 'app/globals.css';

// Read file content
const fileContent = fs.readFileSync('./app/globals.css', 'utf8');
const base64Content = Buffer.from(fileContent).toString('base64');

const data = JSON.stringify({
  message: 'Fix: Add missing globals.css file',
  content: base64Content,
  branch: 'main'
});

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
  method: 'PUT',
  headers: {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'User-Agent': 'Node.js',
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🚀 Uploading to GitHub...');
console.log('⚠️  REPLACE YOUR_GITHUB_TOKEN_HERE with actual token first!');

// Uncomment below to execute (after adding token)
/*
const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (d) => {
    console.log(JSON.parse(d.toString()));
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
*/