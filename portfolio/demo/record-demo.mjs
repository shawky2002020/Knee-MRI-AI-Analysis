import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:4200';
const CHROME_PATH = 'C:\\Users\\shawk\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe';

const tempVideoDir = path.join(__dirname, 'temp_raw_video');
if (!fs.existsSync(tempVideoDir)) {
  fs.mkdirSync(tempVideoDir, { recursive: true });
}

const introCardPath = 'file:///' + path.resolve(__dirname, 'intro_card.html').replace(/\\/g, '/');
const outroCardPath = 'file:///' + path.resolve(__dirname, 'outro_card.html').replace(/\\/g, '/');
const finalOutputPath = path.resolve(__dirname, 'aclyze-ai-cv-demo.mp4');

async function smoothScroll(page, distance, steps = 15, delayMs = 30) {
  const stepDist = distance / steps;
  for (let i = 0; i < steps; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), stepDist);
    await page.waitForTimeout(delayMs);
  }
}

async function record() {
  console.log('🎬 Launching Chromium for Full HD 1920x1080 Video Recording...');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1920,1080',
      '--force-device-scale-factor=1'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: tempVideoDir,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  console.log('1. [0:00] Intro Title Card...');
  await page.goto(introCardPath);
  await page.waitForTimeout(4500);

  console.log('2. [0:05] Navigating to Landing Page...');
  await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Smooth scroll through features
  console.log('   Showcasing Landing Page features & value proposition...');
  await smoothScroll(page, 700, 20, 35);
  await page.waitForTimeout(1500);
  await smoothScroll(page, 700, 20, 35);
  await page.waitForTimeout(2000);
  await smoothScroll(page, -1400, 25, 25);
  await page.waitForTimeout(1200);

  console.log('3. [0:18] Navigating to Login...');
  const loginNav = page.locator('a[routerlink*="login"], a:has-text("Login"), a:has-text("Sign in")').first();
  if (await loginNav.count() > 0) {
    await loginNav.click();
  } else {
    await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle' });
  }
  await page.waitForURL('**/auth/login', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(1000);

  console.log('4. [0:23] Doctor Authentication (Dr. Sarah Chen)...');
  await page.locator('#email').type('doctor@aclyze.demo', { delay: 45 });
  await page.waitForTimeout(400);
  await page.locator('#password').type('DoctorDemo2026!', { delay: 45 });
  await page.waitForTimeout(600);
  await page.click('button.login-btn');

  console.log('5. [0:31] Doctor Dashboard Loading...');
  await page.waitForURL('**/app/dashboard', { timeout: 10000 });
  await page.locator('.page-loader').waitFor({ state: 'detached', timeout: 7000 }).catch(() => {});
  await page.locator('.stats').waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1500);

  console.log('   Hovering stats cards and reviewing recent scans...');
  const statCards = page.locator('.stats .stat');
  if (await statCards.count() > 0) {
    await statCards.first().hover();
    await page.waitForTimeout(1000);
  }
  await smoothScroll(page, 400, 15, 30);
  await page.waitForTimeout(2000);
  await smoothScroll(page, -400, 15, 30);
  await page.waitForTimeout(1000);

  console.log('6. [0:46] Navigating to MRI Analyze Flow...');
  const analyzeBtn = page.locator('a[routerlink*="analyze"], a:has-text("Analyze")').first();
  await analyzeBtn.click();
  await page.waitForURL('**/app/mri/analyze', { timeout: 8000 });
  await page.locator('#firstName').waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1000);

  console.log('   Entering Patient Demographics (Marcus Vance, 28, Male)...');
  await page.locator('#firstName').type('Marcus', { delay: 50 });
  await page.waitForTimeout(200);
  await page.locator('#middleName').type('D.', { delay: 50 });
  await page.waitForTimeout(200);
  await page.locator('#familyName').type('Vance', { delay: 50 });
  await page.waitForTimeout(200);
  await page.locator('#age').type('28', { delay: 50 });
  await page.waitForTimeout(200);

  const genderSelect = page.locator('#gender');
  if (await genderSelect.count() > 0) {
    await genderSelect.selectOption('male');
  }
  await page.waitForTimeout(1200);

  console.log('   Proceeding to Multi-View Scan Upload...');
  await page.click('button.submit-btn');
  await page.locator('app-upload').waitFor({ state: 'visible', timeout: 6000 });
  await page.waitForTimeout(2500);

  console.log('7. [1:02] Reviewing Diagnostic Report with Grad-CAM Explainability...');
  // Navigate to top scan report (Alex Mercer - ACL Tear)
  await page.goto(`${BASE_URL}/app/mri/history`, { waitUntil: 'networkidle' });
  await page.locator('a.view-report').first().waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(800);
  await page.locator('a.view-report').first().click();
  await page.locator('.report-page').waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(2000);

  console.log('   Showcasing Original MRI Knee Scan...');
  const origBtn = page.locator('button:has-text("Original Scan")');
  if (await origBtn.count() > 0) {
    await origBtn.click();
    await page.waitForTimeout(2000);
  }

  console.log('   Activating Grad-CAM AI Explainability Heatmap...');
  const heatmapBtn = page.locator('button:has-text("AI Heatmap")');
  if (await heatmapBtn.count() > 0) {
    await heatmapBtn.click();
    await page.waitForTimeout(3500); // give time to appreciate heatmap
    console.log('   Toggling comparison view...');
    await origBtn.click();
    await page.waitForTimeout(1500);
    await heatmapBtn.click();
    await page.waitForTimeout(2500);
  }

  console.log('   Reviewing Key Findings & Confidence Score (84%)...');
  await smoothScroll(page, 300, 12, 30);
  await page.waitForTimeout(2000);
  const downloadBtn = page.locator('button:has-text("Download Report")');
  if (await downloadBtn.count() > 0) {
    await downloadBtn.hover();
    await page.waitForTimeout(1500);
  }
  await smoothScroll(page, -300, 12, 30);
  await page.waitForTimeout(1000);

  console.log('8. [1:25] MRI Clinical History & Archive Search...');
  await page.goto(`${BASE_URL}/app/mri/history`, { waitUntil: 'networkidle' });
  await page.locator('a.view-report').first().waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1500);

  console.log('   Scrolling through diverse patient scans...');
  await smoothScroll(page, 500, 18, 35);
  await page.waitForTimeout(1500);
  await smoothScroll(page, -500, 18, 35);
  await page.waitForTimeout(1000);

  console.log('   Filtering for Meniscus scan (Chloe Bennett)...');
  const viewReportBtns = page.locator('a.view-report');
  if (await viewReportBtns.count() > 1) {
    await viewReportBtns.nth(1).click();
    await page.locator('.report-page').waitFor({ state: 'visible', timeout: 8000 });
    await page.waitForTimeout(2500);
  }

  console.log('9. [1:38] Switching Roles: Admin Authentication & Audit...');
  await page.evaluate(() => localStorage.clear());
  await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle' });
  await page.locator('#email').waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(800);

  await page.locator('#email').type('admin@aclyze.demo', { delay: 40 });
  await page.waitForTimeout(300);
  await page.locator('#password').type('AdminDemo2026!', { delay: 40 });
  await page.waitForTimeout(500);
  await page.click('button.login-btn');
  await page.waitForTimeout(1500);

  console.log('10. [1:45] Admin Analytics Dashboard (Institutional Breakdown)...');
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle' });
  await page.locator('.admin-dashboard').waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(3000);

  console.log('11. [1:50] Admin User Management (Clinician RBAC)...');
  await page.goto(`${BASE_URL}/admin/users`, { waitUntil: 'networkidle' });
  await page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(2500);

  console.log('12. [1:55] Admin Diagnostic Analytics & Reports...');
  await page.goto(`${BASE_URL}/admin/reports`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  console.log('13. [2:00] Outro Card (Engineering Architecture)...');
  await page.goto(outroCardPath);
  await page.waitForTimeout(5500);

  console.log('🎬 Closing session to finalize raw video...');
  await context.close();
  await browser.close();

  // Find generated video in tempVideoDir
  const videoFiles = fs.readdirSync(tempVideoDir).filter(f => f.endsWith('.webm'));
  if (videoFiles.length === 0) {
    throw new Error('No recorded video file found in ' + tempVideoDir);
  }

  // Sort by modification time to get newest
  const newestVideo = videoFiles
    .map(f => ({ name: f, time: fs.statSync(path.join(tempVideoDir, f)).mtime.getTime() }))
    .sort((a, b) => b.time - a.time)[0].name;

  const rawVideoPath = path.join(tempVideoDir, newestVideo);
  console.log(`\nRaw video recorded at: ${rawVideoPath}`);

  console.log('Transcoding to 1080p 30 FPS H.264 MP4 with ffmpeg...');
  // Use ffmpeg to transcode to standard h264 yuv420p mp4 with silent stereo audio for full cross-platform compatibility
  const ffmpegCmd = `ffmpeg -y -i "${rawVideoPath}" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -c:v libx264 -pix_fmt yuv420p -r 30 -preset fast -crf 20 -c:a aac -b:a 128k -shortest -movflags +faststart "${finalOutputPath}"`;
  
  console.log('Executing ffmpeg command...');
  execSync(ffmpegCmd, { stdio: 'inherit' });

  console.log(`\n✅ Final CV Demo Video successfully generated at:\n${finalOutputPath}`);

  // Probe the video
  console.log('\nRunning ffprobe validation...');
  const probeOutput = execSync(`ffprobe -v quiet -print_format json -show_format -show_streams "${finalOutputPath}"`, { encoding: 'utf-8' });
  const probeData = JSON.parse(probeOutput);

  const vStream = probeData.streams.find(s => s.codec_type === 'video');
  const aStream = probeData.streams.find(s => s.codec_type === 'audio');
  const duration = parseFloat(probeData.format.duration);

  console.log('--- Video Specifications ---');
  console.log(`Duration: ${duration.toFixed(2)} seconds (${Math.floor(duration / 60)}m ${(duration % 60).toFixed(0)}s)`);
  console.log(`Resolution: ${vStream.width}x${vStream.height}`);
  console.log(`Frame Rate: ${vStream.r_frame_rate} fps`);
  console.log(`Video Codec: ${vStream.codec_name} (${vStream.profile})`);
  console.log(`Audio Codec: ${aStream ? aStream.codec_name : 'none'}`);
  console.log(`File Size: ${(probeData.format.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log('----------------------------');
}

record().catch(err => {
  console.error('Recording process failed:', err);
  process.exit(1);
});
