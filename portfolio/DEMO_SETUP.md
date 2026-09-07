# ACLyze AI &mdash; Portfolio Demo Setup Guide

This guide details the exact steps to launch and evaluate the **ACLyze AI** Knee MRI Diagnostic Platform locally in a reproducible, zero-downtime demonstration environment.

---

## 🚀 Quick Start (One-Minute Launch)

### 1. Prerequisites
- **Node.js**: `v18.x` or `v20.x`
- **Python**: `3.10+` with `pip`
- **Modern Browser**: Chrome, Edge, or Firefox

---

### 2. Services Architecture

ACLyze AI runs as three decoupled microservices in demo mode:

| Service | Port | Description |
| :--- | :--- | :--- |
| **Angular SPA Frontend** | `http://localhost:4200` | Medical UI, DICOM viewer, Grad-CAM toggle, patient management |
| **Express.js Backend API** | `http://localhost:3000` | Authentication, RBAC, scan metadata, Puppeteer PDF reports |
| **FastAPI Model Simulator** | `http://127.0.0.1:8000` | Simulates ResNet multi-view MRI inference & Grad-CAM outputs |

---

### 3. Step-by-Step Local Launch

#### Step A: FastAPI Model Inference Simulator
In a dedicated terminal:
```bash
# From repository root
python demo/model_simulator.py
```
*Healthcheck:* Verified listening on `http://127.0.0.1:8000/docs`

---

#### Step B: Node.js Backend (Zero-Latency Local Engine)
In a second terminal:
```bash
cd backend
npm install
npm run seed       # Deterministically populates 6 users and 13 multi-view MRI scans
npm run demo       # Launches backend on port 3000 with localDbAdapter
```
*Healthcheck:* `curl http://localhost:3000/api/users/profile` returns `401 Unauthorized` (confirming active API routing).

---

#### Step C: Angular Frontend Application
In a third terminal:
```bash
cd frontend
npm install
npx ng serve --port 4200
```
*Access UI:* Navigate your browser to `http://localhost:4200`

---

## 🔑 Pre-Configured Demo Credentials

All test accounts are deterministic, isolated, and safe for public portfolio demonstration (no real patient PII):

### 🩺 Clinician / Radiologist Account
- **Email:** `doctor@aclyze.demo`
- **Password:** `DoctorDemo2026!`
- **Role:** Doctor
- **Features Accessible:**
  - Doctor Dashboard (`/app/dashboard`) with real-time scan metrics
  - New MRI Analysis & Demographic intake form (`/app/mri/analyze`)
  - Multi-view MRI DICOM slice upload
  - Live AI Diagnostic Results with **Grad-CAM Explainability Heatmap** toggle (`/app/mri/report`)
  - Comprehensive MRI Patient History & Search (`/app/mri/history`)
  - Headless Puppeteer Clinical PDF generation & export

---

### 🛡️ Administrator Account
- **Email:** `admin@aclyze.demo`
- **Password:** `AdminDemo2026!`
- **Role:** Administrator
- **Features Accessible:**
  - Administrative Analytics Dashboard (`/admin`)
  - Institutional MRI Processing volume and diagnosis distribution (ACL, Meniscus, Both, Normal)
  - Clinician Role-Based Access Control (RBAC) & User Management (`/admin/users`)
  - Institutional diagnostic reports & audit logs (`/admin/reports`)

---

## 🧪 Resetting & Seeding Demo State

To restore the demo environment to its pristine initial state at any time:

```bash
cd backend
npm run reset    # Clears and re-seeds deterministic users, scans, and heatmaps
```

---

## 📸 Automated Screenshot & Video Capture

The portfolio repository includes automated Playwright suites for capturing high-resolution assets:

```bash
# Capture full suite of 16 Desktop (1440x900) & Mobile (390x844) screenshots
node portfolio/demo/capture-screenshots.mjs

# Record Full HD (1920x1080 @ 30 FPS) complete walkthrough video
node portfolio/demo/record-demo.mjs
```

---

## ⚖️ Academic Medical Prototype Disclaimer

> **IMPORTANT CLINICAL NOTICE**
> ACLyze AI was developed as an undergraduate academic engineering prototype and portfolio demonstration exploring the application of multi-view convolutional neural networks (CNNs) and explainable AI (Grad-CAM) to musculoskeletal diagnostic imaging. It is **not** an FDA-approved medical device and is **not intended for autonomous clinical diagnosis** without radiologist oversight.
