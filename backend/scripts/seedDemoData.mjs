import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { localDb } from '../config/localDbAdapter.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedDemoData() {
  console.log('Seeding ACLyze AI Synthetic Demo Data...');

  // Read knee and heatmap images as web-compatible paths or data URLs
  const kneeImg = '/assets/knee/knee1.png';
  const heatmapImg = '/assets/knee/heatmap1.png';

  // 1. Prepare Users
  const doctorPassword = await bcrypt.hash('DoctorDemo2026!', 10);
  const adminPassword = await bcrypt.hash('AdminDemo2026!', 10);
  const staffPassword = await bcrypt.hash('StaffDemo2026!', 10);

  const now = new Date();
  const daysAgo = (d) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();
  const hoursAgo = (h) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();

  const doctorId = 'user_demo_doctor_01';
  const adminId = 'user_demo_admin_01';
  const thorneId = 'user_demo_thorne_02';
  const vanceId = 'user_demo_vance_03';
  const wilsonId = 'user_demo_wilson_04';
  const patelId = 'user_demo_patel_05';

  const usersData = {
    [doctorId]: {
      id: doctorId,
      _id: doctorId,
      name: 'Dr. Sarah Chen',
      email: 'doctor@aclyze.demo',
      role: 'user',
      password: doctorPassword,
      aiAccess: true,
      loginCount: 42,
      lastLogin: hoursAgo(1),
      createdAt: daysAgo(45),
      updatedAt: hoursAgo(1),
      isGoogleUser: false
    },
    [adminId]: {
      id: adminId,
      _id: adminId,
      name: 'Lead Admin (ACLyze)',
      email: 'admin@aclyze.demo',
      role: 'admin',
      password: adminPassword,
      aiAccess: true,
      loginCount: 128,
      lastLogin: hoursAgo(0.5),
      createdAt: daysAgo(90),
      updatedAt: hoursAgo(0.5),
      isGoogleUser: false
    },
    [thorneId]: {
      id: thorneId,
      _id: thorneId,
      name: 'Dr. Marcus Thorne',
      email: 'marcus.thorne@aclyze.demo',
      role: 'user',
      password: staffPassword,
      aiAccess: true,
      loginCount: 29,
      lastLogin: daysAgo(1),
      createdAt: daysAgo(30),
      updatedAt: daysAgo(1),
      isGoogleUser: false
    },
    [vanceId]: {
      id: vanceId,
      _id: vanceId,
      name: 'Dr. Elena Vance',
      email: 'elena.vance@aclyze.demo',
      role: 'user',
      password: staffPassword,
      aiAccess: true,
      loginCount: 54,
      lastLogin: hoursAgo(3),
      createdAt: daysAgo(60),
      updatedAt: hoursAgo(3),
      isGoogleUser: false
    },
    [wilsonId]: {
      id: wilsonId,
      _id: wilsonId,
      name: 'Dr. James Wilson',
      email: 'james.wilson@aclyze.demo',
      role: 'user',
      password: staffPassword,
      aiAccess: false, // Access disabled for demo role-management preview
      loginCount: 12,
      lastLogin: daysAgo(4),
      createdAt: daysAgo(20),
      updatedAt: daysAgo(4),
      isGoogleUser: false
    },
    [patelId]: {
      id: patelId,
      _id: patelId,
      name: 'Dr. Maya Patel',
      email: 'maya.patel@aclyze.demo',
      role: 'user',
      password: staffPassword,
      aiAccess: true,
      loginCount: 37,
      lastLogin: daysAgo(2),
      createdAt: daysAgo(35),
      updatedAt: daysAgo(2),
      isGoogleUser: false
    }
  };

  // 2. Prepare Synthetic MRI Scans (realistic fictional athletes and patients)
  const scansList = [
    {
      id: 'scan_demo_001',
      userId: doctorId,
      metadata: { name: 'Alex Mercer', age: 24, gender: 'Male', viewed: true, type: 'athlete' },
      result: { status: 'acl', acl_prob: 0.94, meniscus_prob: 0.12 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'High-grade complete rupture of Anterior Cruciate Ligament mid-substance. Visualized focal hyperintensity on T2-weighted sagittal sequences. Recommendation: Orthopedic surgical reconstruction evaluation.',
      createdAt: hoursAgo(2)
    },
    {
      id: 'scan_demo_002',
      userId: doctorId,
      metadata: { name: 'Chloe Bennett', age: 31, gender: 'Female', viewed: true, type: 'runner' },
      result: { status: 'meniscus', acl_prob: 0.14, meniscus_prob: 0.89 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Horizontal cleavage tear involving posterior horn of medial meniscus. Intact cruciate ligaments and collateral stabilizers. Low effusion volume.',
      createdAt: hoursAgo(8)
    },
    {
      id: 'scan_demo_003',
      userId: doctorId,
      metadata: { name: 'David Miller', age: 28, gender: 'Male', viewed: true, type: 'soccer' },
      result: { status: 'normal', acl_prob: 0.05, meniscus_prob: 0.08 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Normal knee examination. Continuous, low-signal ACL fibers from femoral origin to tibial insertion. Symmetric meniscal morphology without tear signs.',
      createdAt: daysAgo(1)
    },
    {
      id: 'scan_demo_004',
      userId: doctorId,
      metadata: { name: 'Emily Watson', age: 22, gender: 'Female', viewed: false, type: 'gymnast' },
      result: { status: 'acl', acl_prob: 0.88, meniscus_prob: 0.21 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Acute ACL tear with mild marrow edema on lateral femoral condyle (pivot-shift pattern). Posterior cruciate ligament remains structurally intact.',
      createdAt: daysAgo(2)
    },
    {
      id: 'scan_demo_005',
      userId: doctorId,
      metadata: { name: 'Lucas Ramirez', age: 26, gender: 'Male', viewed: true, type: 'basketball' },
      result: { status: 'acl and meniscus', acl_prob: 0.91, meniscus_prob: 0.86 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Combined complex pathology: Full-thickness ACL disruption with concurrent complex tear of lateral meniscus body and posterior root.',
      createdAt: daysAgo(3)
    },
    {
      id: 'scan_demo_006',
      userId: doctorId,
      metadata: { name: 'Hannah Abbott', age: 29, gender: 'Female', viewed: true, type: 'triathlete' },
      result: { status: 'meniscus', acl_prob: 0.11, meniscus_prob: 0.92 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Radial tear of lateral meniscus free margin. Well-preserved articular cartilage without subchondral cysts.',
      createdAt: daysAgo(4)
    },
    {
      id: 'scan_demo_007',
      userId: doctorId,
      metadata: { name: 'Oliver King', age: 42, gender: 'Male', viewed: true, type: 'general' },
      result: { status: 'normal', acl_prob: 0.04, meniscus_prob: 0.07 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Intact knee MRI with age-appropriate mild patellar tendinopathy. Cruciate ligaments and meniscal horns unremarkable.',
      createdAt: daysAgo(5)
    },
    {
      id: 'scan_demo_008',
      userId: doctorId,
      metadata: { name: 'Zoe Martinez', age: 25, gender: 'Female', viewed: false, type: 'crossfit' },
      result: { status: 'acl', acl_prob: 0.85, meniscus_prob: 0.18 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Partial to full-thickness ACL tear at proximal third. Joint capsule mildly distended with reactive effusion.',
      createdAt: daysAgo(6)
    },
    // Additional scans for Thorne, Vance, Patel to populate admin charts and user distributions
    {
      id: 'scan_demo_009',
      userId: thorneId,
      metadata: { name: 'Gabriel Stone', age: 27, gender: 'Male', viewed: true, type: 'football' },
      result: { status: 'acl', acl_prob: 0.93, meniscus_prob: 0.15 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Complete ACL mid-substance rupture.',
      createdAt: daysAgo(1)
    },
    {
      id: 'scan_demo_010',
      userId: thorneId,
      metadata: { name: 'Mia Foster', age: 34, gender: 'Female', viewed: true, type: 'tennis' },
      result: { status: 'normal', acl_prob: 0.06, meniscus_prob: 0.09 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Normal knee multi-view scan.',
      createdAt: daysAgo(2)
    },
    {
      id: 'scan_demo_011',
      userId: vanceId,
      metadata: { name: 'Nathan Drake', age: 38, gender: 'Male', viewed: true, type: 'climbing' },
      result: { status: 'meniscus', acl_prob: 0.16, meniscus_prob: 0.95 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Bucket-handle medial meniscus tear with fragment displacement.',
      createdAt: daysAgo(1)
    },
    {
      id: 'scan_demo_012',
      userId: vanceId,
      metadata: { name: 'Rachel Green', age: 29, gender: 'Female', viewed: true, type: 'skiing' },
      result: { status: 'acl and meniscus', acl_prob: 0.89, meniscus_prob: 0.88 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'O\'Donoghue triad feature presentation (ACL + medial meniscus).',
      createdAt: daysAgo(3)
    },
    {
      id: 'scan_demo_013',
      userId: patelId,
      metadata: { name: 'Ethan Hunt', age: 32, gender: 'Male', viewed: true, type: 'track' },
      result: { status: 'normal', acl_prob: 0.04, meniscus_prob: 0.06 },
      mri_scan: kneeImg,
      heat_map: heatmapImg,
      report: 'Normal multi-plane MRI investigation.',
      createdAt: daysAgo(2)
    }
  ];

  const mriScansData = {};
  for (const scan of scansList) {
    mriScansData[scan.id] = {
      ...scan,
      _id: scan.id,
      updatedAt: scan.createdAt
    };
  }

  // 3. Prepare Notifications
  const notificationsData = {
    'noti_demo_001': {
      id: 'noti_demo_001',
      _id: 'noti_demo_001',
      userID: doctorId,
      title: 'Analysis Complete',
      message: 'AI Multi-View MRI Analysis completed for patient Alex Mercer.',
      type: 'success',
      read: true,
      reportID: 'scan_demo_001',
      createdAt: hoursAgo(2)
    },
    'noti_demo_002': {
      id: 'noti_demo_002',
      _id: 'noti_demo_002',
      userID: doctorId,
      title: 'New Scan Uploaded',
      message: 'Sagittal, Coronal, and Axial series processed for Chloe Bennett.',
      type: 'success',
      read: true,
      reportID: 'scan_demo_002',
      createdAt: hoursAgo(8)
    },
    'noti_demo_003': {
      id: 'noti_demo_003',
      _id: 'noti_demo_003',
      userID: doctorId,
      title: 'System Notice',
      message: 'Diagnostic model v2.4 initialized with Grad-CAM explainability support.',
      type: 'info',
      read: false,
      reportID: null,
      createdAt: daysAgo(1)
    }
  };

  // Write directly into localDb storage
  localDb.data.users = usersData;
  localDb.data.mriScans = mriScansData;
  localDb.data.notifications = notificationsData;
  localDb.save();

  console.log(`Demo Data seeded successfully:`);
  console.log(`- ${Object.keys(usersData).length} users seeded`);
  console.log(`- ${Object.keys(mriScansData).length} MRI scans seeded`);
  console.log(`- ${Object.keys(notificationsData).length} notifications seeded`);
  console.log(`Doctor login: doctor@aclyze.demo / DoctorDemo2026!`);
  console.log(`Admin login:  admin@aclyze.demo  / AdminDemo2026!`);
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('seedDemoData.mjs')) {
  seedDemoData().then(() => process.exit(0)).catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
}
