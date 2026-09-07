# ACLyze AI &mdash; Technologies & Tools Inventory

This document provides a comprehensive technical overview of the technologies, libraries, frameworks, machine learning models, and developer tooling employed across the **ACLyze AI** platform.

---

## 🧠 Machine Learning & Deep Learning

| Technology | Role | Details |
| :--- | :--- | :--- |
| **PyTorch** | Deep Learning Framework | Tensor computation, model training, evaluation pipelines |
| **ResNet (Residual Networks)** | CNN Backbone | Feature extraction from coronal, sagittal, and axial MRI slices |
| **Grad-CAM** | Explainable AI (XAI) | Gradient-weighted Class Activation Mapping generating attention heatmaps |
| **FastAPI** | Inference Microservice | Asynchronous Python REST API serving inference endpoints at high throughput |
| **NumPy & SciPy** | Scientific Computing | Multi-dimensional array transformations and image normalization |
| **Pillow (PIL)** | Image Processing | DICOM slice rasterization, heatmap alpha blending, and color mapping |

---

## 🎨 Frontend Architecture

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Angular** | 19.x | Modern Single-Page Application (SPA) architecture |
| **TypeScript** | 5.x | Strictly typed client-side application logic |
| **RxJS** | 7.x | Reactive programming for asynchronous HTTP streams and state management |
| **HTML5 & CSS3** | Modern Standards | Custom glassmorphic design system with gradient accents, no heavyweight CSS framework |
| **FontAwesome** | 6.x | Vector medical and navigation iconography |

---

## ⚡ Backend & Data Services

| Technology | Role | Implementation |
| :--- | :--- | :--- |
| **Node.js** | Runtime Environment | JavaScript event-driven server runtime |
| **Express.js** | Application Framework | REST API routing, middleware chaining, and controller isolation |
| **JSON Web Tokens (JWT)**| Authentication | Stateless, cryptographically signed user session tokens |
| **bcryptjs** | Password Security | Adaptive cryptographic hashing for user credentials |
| **LocalDbAdapter** | Zero-Latency Engine | In-memory and persisted JSON datastore replicating Firebase RTDB API |
| **Puppeteer** | Report Generation | Headless Chromium instance rendering and exporting high-resolution clinical PDFs |
| **Cloudinary** | Asset Hosting | Supported cloud storage adapter for MRI scans, heatmaps, and diagnostic reports |

---

## 🧪 Testing, Automation & Media Production

| Tool | Version | Usage |
| :--- | :--- | :--- |
| **Playwright** | 1.58.x | Automated headless browser testing, multi-viewport screenshot capture, and session recording |
| **Chromium** | Latest (v1243) | Headless browser engine for UI validation and media capture |
| **FFmpeg** | 8.1.1 | High-efficiency video encoding (`libx264`, `yuv420p`, 30 FPS) and audio synthesis |
| **FFprobe** | 8.1.1 | Automated video container and stream validation (resolution, codec, duration) |
| **Git** | 2.45+ | Version control with safe branching (`portfolio/aclyze-demo`) and zero-PII policies |
