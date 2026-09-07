import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '../screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const BASE_URL = 'http://localhost:4200';

async function run() {
  console.log('Starting Playwright Screenshot Automation for ACLyze AI...');

  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Context (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await desktopContext.newPage();

  console.log('1. Capturing Landing Page (/home)...');
  await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outputDir, '01-landing-home.png') });

  console.log('2. Capturing Login Page (/auth/login)...');
  await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outputDir, '02-login.png') });

  console.log('3. Capturing Register Page (/auth/register)...');
  await page.goto(`${BASE_URL}/auth/register`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outputDir, '03-register.png') });

  console.log('4. Performing Doctor Login...');
  await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle' });
  await page.fill('#email', 'doctor@aclyze.demo');
  await page.fill('#password', 'DoctorDemo2026!');
  await page.waitForTimeout(300);
  await page.click('button.login-btn');

  // Wait for navigation and wait for dashboard loader to finish
  await page.waitForURL('**/app/dashboard', { timeout: 10000 });
  await page.locator('.page-loader').waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
  await page.locator('.stats').waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1500);

  console.log('5. Capturing Doctor Dashboard (/app/dashboard)...');
  await page.screenshot({ path: path.join(outputDir, '04-doctor-dashboard.png') });

  console.log('6. Capturing MRI Patient Details Form (/app/mri/analyze)...');
  await page.goto(`${BASE_URL}/app/mri/analyze`, { waitUntil: 'networkidle' });
  await page.locator('#firstName').waitFor({ state: 'visible' });

  // Fill in patient form
  await page.fill('#firstName', 'Alex');
  await page.fill('#middleName', 'James');
  await page.fill('#familyName', 'Mercer');
  await page.fill('#age', '24');
  await page.selectOption('#gender', 'male');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outputDir, '05-mri-patient-form.png') });

  console.log('7. Capturing Multi-View MRI Upload View...');
  await page.click('button.submit-btn');
  await page.locator('app-upload').waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outputDir, '06-mri-multi-view-upload.png') });

  console.log('8. Capturing MRI History Page (/app/mri/history)...');
  await page.goto(`${BASE_URL}/app/mri/history`, { waitUntil: 'networkidle' });
  await page.locator('.cards-wrapper .card').first().waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outputDir, '09-mri-history.png') });

  console.log('9. Navigating to Diagnostic Report for top scan (Alex Mercer)...');
  // Click on the first scan's View Report link
  await page.locator('a.view-report').first().click();
  await page.waitForURL('**/app/mri/report', { timeout: 10000 });
  await page.locator('.report-page').waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1200);

  // Toggle Original Scan
  const originalScanBtn = page.locator('button:has-text("Original Scan")');
  if (await originalScanBtn.count() > 0) {
    await originalScanBtn.click();
    await page.waitForTimeout(600);
  }

  console.log('10. Capturing Diagnostic Result View (Original Scan)...');
  await page.screenshot({ path: path.join(outputDir, '07-mri-diagnostic-result.png') });

  console.log('11. Capturing Grad-CAM Explainability Heatmap View...');
  const heatmapBtn = page.locator('button:has-text("AI Heatmap")');
  if (await heatmapBtn.count() > 0) {
    await heatmapBtn.click();
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: path.join(outputDir, '08-explainability-heatmap.png') });

  console.log('12. Capturing Clinical Report View with Confidence Score...');
  await page.evaluate(() => window.scrollBy(0, 250));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outputDir, '10-clinical-report-view.png') });
  await page.evaluate(() => window.scrollTo(0, 0));

  // 2. Admin Flow
  console.log('13. Logging in as Admin (admin@aclyze.demo)...');
  await page.evaluate(() => localStorage.clear());
  await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle' });
  await page.fill('#email', 'admin@aclyze.demo');
  await page.fill('#password', 'AdminDemo2026!');
  await page.waitForTimeout(300);
  await page.click('button.login-btn');
  await page.waitForTimeout(1000);

  console.log('14. Capturing Admin Dashboard (/admin)...');
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle' });
  await page.locator('.admin-dashboard').waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outputDir, '11-admin-dashboard.png') });

  console.log('15. Capturing Admin User Management (/admin/users)...');
  await page.goto(`${BASE_URL}/admin/users`, { waitUntil: 'networkidle' });
  await page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outputDir, '12-admin-user-management.png') });

  console.log('16. Capturing Admin Reports (/admin/reports)...');
  await page.goto(`${BASE_URL}/admin/reports`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outputDir, '13-admin-reports.png') });

  await desktopContext.close();

  // 3. Mobile Responsive Flow (390x844)
  console.log('17. Capturing Mobile Responsive Views (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(outputDir, '14-mobile-home.png') });

  // Doctor login on mobile
  await mobilePage.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle' });
  await mobilePage.fill('#email', 'doctor@aclyze.demo');
  await mobilePage.fill('#password', 'DoctorDemo2026!');
  await mobilePage.click('button.login-btn');
  await mobilePage.waitForURL('**/app/dashboard', { timeout: 10000 });
  await mobilePage.locator('.page-loader').waitFor({ state: 'detached', timeout: 6000 }).catch(() => {});
  await mobilePage.locator('.stats').waitFor({ state: 'visible', timeout: 8000 });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: path.join(outputDir, '15-mobile-doctor-dashboard.png') });

  // Go to history and open report on mobile
  await mobilePage.goto(`${BASE_URL}/app/mri/history`, { waitUntil: 'networkidle' });
  await mobilePage.locator('a.view-report').first().waitFor({ state: 'visible', timeout: 8000 });
  await mobilePage.locator('a.view-report').first().click();
  await mobilePage.waitForURL('**/app/mri/report', { timeout: 10000 });
  await mobilePage.waitForTimeout(1200);
  await mobilePage.screenshot({ path: path.join(outputDir, '16-mobile-mri-result.png') });

  await mobileContext.close();
  await browser.close();

  console.log('\nAll 16 screenshots successfully refreshed and verified! 📸');
}

run().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
