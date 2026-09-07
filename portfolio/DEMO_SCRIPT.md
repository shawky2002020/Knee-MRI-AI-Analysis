# ACLyze AI &mdash; Video Walkthrough Script

This script documents the narrative, scene timing, UI interactions, and technical talking points demonstrated in the Full HD video walkthrough (`portfolio/demo/aclyze-ai-cv-demo.mp4`).

---

## 🎬 Scene Breakdown

### Scene 1: Introduction Title Card (0:00 &ndash; 0:05)
- **Visual:** High-resolution dark aesthetic title card featuring glowing ambient gradients, ACLyze AI branding, and core architecture tags.
- **Narrative:**
  > "Welcome to ACLyze AI, a full-stack deep learning diagnostic platform designed to assist radiologists and orthopedic surgeons in rapid triage of anterior cruciate ligament (ACL) and meniscus tears from multi-view knee MRIs."
- **Key Badges Displayed:** PyTorch ResNet, Grad-CAM Attention, FastAPI, Node.js, Angular 19, Clinical RBAC.

---

### Scene 2: Public Landing & Clinical Value Proposition (0:05 &ndash; 0:18)
- **Visual:** Smooth scroll through the landing page (`/home`) highlighting the diagnostic challenge, clinical workflow timeline, and interactive FAQ.
- **Interactions:**
  - View hero headline and medical imagery.
  - Smooth scroll through 3-step triage workflow (Upload DICOM $\rightarrow$ AI Inference $\rightarrow$ Clinical PDF Export).
  - Review Grad-CAM explainability showcase.
  - Click **"Login"** to transition to authentication.
- **Engineering Note:** Angular 19 reactive components with CSS glassmorphic cards and dynamic view transitions.

---

### Scene 3: Doctor Authentication & Secure Session (0:18 &ndash; 0:31)
- **Visual:** Clean authentication interface (`/auth/login`).
- **Interactions:**
  - Enter clinician credentials: `doctor@aclyze.demo`.
  - Enter secure credential with input masking.
  - Submit login request.
- **Engineering Note:** JWT authentication with bcrypt password verification and role claim validation (`role: "doctor"`).

---

### Scene 4: Doctor Dashboard & Real-Time Metrics (0:31 &ndash; 0:46)
- **Visual:** Clinician operational overview (`/app/dashboard`).
- **Interactions:**
  - AI Engine health status badge displays **Active**.
  - Total Scans card shows 8 active patient cases.
  - Review live feed of recent MRI scans with diagnostic tags:
    - *Alex Mercer* &bull; `ACL` Tear
    - *Chloe Bennett* &bull; `MENISCUS` Tear
    - *David Miller* &bull; `NORMAL`
    - *Emily Watson* &bull; `ACL` Tear
  - Hover over interactive stat cards.
  - Click **"Analyze"** on the primary navigation sidebar.

---

### Scene 5: MRI Upload & Patient Intake Workflow (0:46 &ndash; 1:02)
- **Visual:** Clinical demographic intake form (`/app/mri/analyze`).
- **Interactions:**
  - Input patient identifier: *Marcus Vance*.
  - Input patient age: *28*.
  - Select gender: *Male*.
  - Select primary imaging orientation: *Axial View*.
  - Click **"Next"** to advance to multi-view DICOM/slice upload interface.
- **Engineering Note:** Angular reactive forms with strict client-side validation and multi-file drag-and-drop dropzone.

---

### Scene 6: Diagnostic Report & Grad-CAM Explainability (1:02 &ndash; 1:25)
- **Visual:** Deep clinical report view (`/app/mri/report`).
- **Interactions:**
  - Patient header shows verified demographics and axial view tags.
  - **Key Findings Card:** High-contrast badge highlights **ACL Tear Detected** with natural language clinical observations.
  - **AI Confidence Score:** Circular radial meter shows **84%** calibrated confidence.
  - **Explainability Toggle:**
    - View raw anatomical knee scan under the **"Original Scan"** tab.
    - Click **"AI Heatmap"** tab &mdash; the Grad-CAM activation overlay highlights high-attention regions directly over the ruptured cruciate ligament.
    - Toggle back and forth between raw scan and heatmap to demonstrate diagnostic alignment.
    - Hover over **"Download Report"** button (demonstrating automated Puppeteer PDF report generation).

---

### Scene 7: Clinical History & Archive Search (1:25 &ndash; 1:38)
- **Visual:** Historical scan directory (`/app/mri/history`).
- **Interactions:**
  - Review paginated list of 13 historical scans covering diverse injury classes (Normal, ACL, Meniscus, Both ACL & Meniscus).
  - Scroll through cases.
  - Select *Chloe Bennett* (Meniscus Tear case) to inspect secondary injury profile.
- **Engineering Note:** Demonstrates multi-class classification handling beyond binary ACL detection.

---

### Scene 8: Role-Based Access Control & Admin Experience (1:38 &ndash; 2:00)
- **Visual:** Clinician logout, followed by authentication as `admin@aclyze.demo`.
- **Interactions:**
  - Log out from clinician session.
  - Enter administrator credentials.
  - Arrive at **Admin Analytics Dashboard** (`/admin`):
    - Total Users: 6
    - MRIs Processed: 14
    - Institutional breakdown: 4 ACL Tears, 3 Meniscus Tears, 2 Combined Tears, 4 Normal Scans.
  - Navigate to **User Management** (`/admin/users`): review clinician roster, account roles, and active status toggles.
  - Navigate to **Diagnostic Analytics** (`/admin/reports`): inspect institutional diagnostic distribution metrics.
- **Engineering Note:** Demonstrates strict route guards (`adminGuard`) and backend RBAC middleware preventing privilege escalation.

---

### Scene 9: Architecture & Engineering Outro Card (2:00 &ndash; 2:05)
- **Visual:** Full-screen summary of engineering highlights and technology foundations.
- **Key Highlights:**
  - Multi-view ResNet deep learning architecture
  - Grad-CAM attention explainability
  - Decoupled FastAPI + Node.js microservices
  - Puppeteer automated PDF synthesis
  - Zero-downtime local simulation engine
  - Author GitHub repository link: `github.com/shawky2002020/Knee-MRI-AI-Analysis`
