# ACLyze AI &mdash; Portfolio Deliverables Manifest

This manifest documents all generated media assets, automation scripts, test suites, and documentation files created for the **ACLyze AI** portfolio release.

---

## 📹 Primary Video Deliverable

| Asset | Path | Format | Specifications | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Complete Portfolio Demo Video** | `portfolio/demo/aclyze-ai-cv-demo.mp4` | MP4 (H.264 / AAC) | 1920&times;1080 (Full HD), 30 FPS, ~105s, `yuv420p` | ✅ Generated & Verified |

---

## 📸 High-Resolution Screenshot Suite (16 Captured Views)

All screenshots are stored in `portfolio/screenshots/` and were captured automatically using Playwright under controlled viewport and authentication states:

### Desktop Views (1440&times;900)

| Filename | View Description | Highlights |
| :--- | :--- | :--- |
| `01-landing-home.png` | Public Landing Page (`/home`) | Hero section, clinical value proposition, navigation |
| `02-login.png` | Authentication Interface (`/auth/login`) | Doctor / Admin credentials input form |
| `03-register.png` | Registration Interface (`/auth/register`) | Clinician account creation form |
| `04-doctor-dashboard.png` | Doctor Dashboard (`/app/dashboard`) | Live AI status indicator, scan counts, recent patient feed |
| `05-mri-patient-form.png` | Patient Demographic Intake (`/app/mri/analyze`) | Form fields (Name, Age, Gender, Imaging View) |
| `06-mri-multi-view-upload.png`| Multi-View MRI File Upload | Coronal, Sagittal, and Axial file dropzones |
| `07-mri-diagnostic-result.png`| Diagnostic Report & Raw Scan (`/app/mri/report`) | Patient metadata, "Original Scan" tab, 84% confidence gauge |
| `08-explainability-heatmap.png`| Grad-CAM Heatmap Visualization | "AI Heatmap" tab activated, warm overlay on cruciate ligament |
| `09-mri-history.png` | MRI Case History Directory (`/app/mri/history`) | Filterable table of 13 historical scans with diagnosis badges |
| `10-clinical-report-view.png` | Clinical Summary & PDF Export | Key clinical findings, tear classification, download CTA |
| `11-admin-dashboard.png` | Institutional Admin Overview (`/admin`) | Aggregated metric cards (Total Users, Processed Scans, Diagnoses) |
| `12-admin-user-management.png`| Clinician User Management (`/admin/users`) | Table of registered radiologists and administrators |
| `13-admin-reports.png` | Diagnostic Distribution Analytics (`/admin/reports`)| Institutional breakdown of ACL vs Meniscus pathology |

### Mobile Responsive Views (390&times;844 &bull; iPhone Viewport)

| Filename | View Description | Highlights |
| :--- | :--- | :--- |
| `14-mobile-home.png` | Mobile Landing Page | Responsive hero layout, stacked features, hamburger navigation |
| `15-mobile-doctor-dashboard.png`| Mobile Doctor Dashboard | Stacked metric cards, touch-friendly patient list, sidebar drawer |
| `16-mobile-mri-result.png` | Mobile Diagnostic Report | Responsive MRI viewer, pill badges, mobile-optimized heatmap toggle |

---

## 🛠️ Automation & Simulation Infrastructure

| File | Type | Purpose |
| :--- | :--- | :--- |
| `backend/config/localDbAdapter.mjs` | Micro-Engine | In-memory/JSON zero-latency database replicating Firebase RTDB API |
| `backend/scripts/seedDemoData.mjs` | Data Pipeline | Deterministic seeder for 6 users, 13 multi-view MRI cases, and heatmaps |
| `backend/scripts/resetDemoData.mjs`| Maintenance | One-command reset restoring demo environment to clean initial state |
| `demo/model_simulator.py` | Microservice | Python FastAPI service simulating `/process_mri` and `/process_multiview_mri` |
| `demo/test_api_contracts.mjs` | Test Suite | 9 automated E2E API contract tests (Auth, Scans, RBAC, Admin stats, PDF) |
| `portfolio/demo/capture-screenshots.mjs`| Automation | Headless Playwright script capturing all 16 desktop and mobile screenshots |
| `portfolio/demo/record-demo.mjs` | Automation | Automated Full HD video recording with intro/outro cards and FFmpeg transcoding |

---

## 📚 Portfolio Documentation Suite

| Document | Purpose |
| :--- | :--- |
| `portfolio/DEMO_SETUP.md` | Clear setup and execution instructions for local reproduction |
| `portfolio/DEMO_SCRIPT.md` | Detailed scene-by-scene timing and narrative walkthrough of the demo video |
| `portfolio/DEMO_MANIFEST.md` | Full inventory of assets, screenshots, and automation tools |
| `portfolio/TOOLS_USED.md` | Technical breakdown of all libraries, models, frameworks, and tools |
| `README.md` | Recruiter-ready repository presentation with architecture diagrams and media |
