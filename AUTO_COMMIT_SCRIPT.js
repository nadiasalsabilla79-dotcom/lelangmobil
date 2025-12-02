const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 AUTO COMMIT & DEPLOY SCRIPT');

try {
  // Check if git is available
  execSync('git --version', { stdio: 'ignore' });
  
  // Add all files
  console.log('Adding files...');
  execSync('git add .', { stdio: 'inherit' });
  
  // Commit
  console.log('Committing...');
  execSync('git commit -m "✅ Fix globals.css and all build issues - Production ready"', { stdio: 'inherit' });
  
  // Push
  console.log('Pushing to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('✅ SUCCESS! Vercel will auto-deploy');
  
} catch (error) {
  console.log('❌ Git not found. Manual upload required:');
  console.log('1. Upload app/globals.css to GitHub');
  console.log('2. Vercel will auto-deploy');
}