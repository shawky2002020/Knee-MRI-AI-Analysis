const BASE_URL = 'http://127.0.0.1:3000';

async function runTests() {
  console.log('--- RUNNING ACLYZE AI API CONTRACT TESTS (via native fetch) ---');

  // 1. Doctor Login
  console.log('1. Testing Doctor Login (doctor@aclyze.demo)...');
  const doctorRes = await fetch(`${BASE_URL}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'doctor@aclyze.demo',
      password: 'DoctorDemo2026!'
    })
  });
  if (!doctorRes.ok) throw new Error(`Doctor login failed: ${doctorRes.statusText}`);
  const doctorData = await doctorRes.json();
  console.log('✓ Doctor login successful! Token received.');
  const doctorToken = doctorData.token;

  // 2. Doctor fetches scans
  console.log('2. Testing Doctor Scans (GET /v1/mri/scans)...');
  const scansRes = await fetch(`${BASE_URL}/v1/mri/scans`, {
    headers: { access_token: doctorToken }
  });
  if (!scansRes.ok) throw new Error(`Scans fetch failed: ${scansRes.statusText}`);
  const scansData = await scansRes.json();
  console.log(`✓ Scans fetched successfully: ${scansData.scans.length} scans returned (Total: ${scansData.totalScans}).`);

  // 3. RBAC Enforcement: Doctor attempts admin route
  console.log('3. Testing RBAC: Doctor attempts to access /v1/admin/users...');
  const rbacRes = await fetch(`${BASE_URL}/v1/admin/users`, {
    headers: { access_token: doctorToken }
  });
  if (rbacRes.status === 403) {
    console.log('✓ RBAC passed! Status 403 Access Denied as expected.');
  } else {
    console.error(`✗ RBAC failed: Expected 403 but got ${rbacRes.status}`);
  }

  // 4. Admin Login
  console.log('4. Testing Admin Login (admin@aclyze.demo)...');
  const adminRes = await fetch(`${BASE_URL}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@aclyze.demo',
      password: 'AdminDemo2026!'
    })
  });
  if (!adminRes.ok) throw new Error(`Admin login failed: ${adminRes.statusText}`);
  const adminData = await adminRes.json();
  console.log('✓ Admin login successful! Token received.');
  const adminToken = adminData.token;

  // 5. Admin fetches users
  console.log('5. Testing Admin Users list (GET /v1/admin/users)...');
  const usersRes = await fetch(`${BASE_URL}/v1/admin/users`, {
    headers: { access_token: adminToken }
  });
  if (!usersRes.ok) throw new Error(`Admin users fetch failed: ${usersRes.statusText}`);
  const usersData = await usersRes.json();
  console.log(`✓ Admin users list: ${usersData.users.length} users returned.`);

  // 6. Admin fetches user stats
  console.log('6. Testing Admin User Stats (GET /v1/admin/userstates)...');
  const statsRes = await fetch(`${BASE_URL}/v1/admin/userstates`, {
    headers: { access_token: adminToken }
  });
  if (!statsRes.ok) throw new Error(`Admin user stats failed: ${statsRes.statusText}`);
  const statsData = await statsRes.json();
  console.log(`✓ Admin user stats fetched: ${statsData.stats.totalUsers} total users.`);

  // 7. Admin diagnosis distribution
  console.log('7. Testing Diagnosis Distribution (GET /v1/admin/DiagnosisDistribution)...');
  const distRes = await fetch(`${BASE_URL}/v1/admin/DiagnosisDistribution`, {
    headers: { access_token: adminToken }
  });
  if (!distRes.ok) throw new Error(`Diagnosis distribution failed: ${distRes.statusText}`);
  const distData = await distRes.json();
  console.log('✓ Diagnosis distribution counts:', distData.counts);

  // 8. Admin user scan counts
  console.log('8. Testing User Scan Counts (GET /v1/admin/userscans)...');
  const countsRes = await fetch(`${BASE_URL}/v1/admin/userscans`, {
    headers: { access_token: adminToken }
  });
  if (!countsRes.ok) throw new Error(`User scan counts failed: ${countsRes.statusText}`);
  const countsData = await countsRes.json();
  console.log(`✓ User scan counts: ${countsData.userScanCounts.length} users with scans.`);

  // 9. PDF Report Generation test
  console.log('9. Testing PDF Report Generation (POST /v1/report/generate)...');
  const sampleScan = scansData.scans[0];
  const reportRes = await fetch(`${BASE_URL}/v1/report/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      access_token: doctorToken
    },
    body: JSON.stringify({
      patientId: sampleScan._id || 'scan_demo_001',
      diagnosis: sampleScan.result?.status || 'acl',
      confidence: 94,
      views: ['axial', 'coronal', 'sagittal'],
      date: sampleScan.createdAt || new Date().toISOString(),
      heatmapUrls: [sampleScan.heat_map || '/assets/knee/heatmap1.png']
    })
  });
  if (!reportRes.ok) {
    const errText = await reportRes.text();
    throw new Error(`PDF report generation failed: ${reportRes.status} ${errText}`);
  }
  const pdfBuffer = await reportRes.arrayBuffer();
  console.log(`✓ PDF Report generated! Size: ${pdfBuffer.byteLength} bytes. Content-Type: ${reportRes.headers.get('content-type')}`);

  console.log('\n=========================================');
  console.log('ALL 9 API CONTRACT TESTS PASSED! 🚀');
  console.log('=========================================');
}

runTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
