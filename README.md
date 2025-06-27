
# 🌐 ACLyze AI: MRI Analysis Platform
![Screenshot](https://github.com/user-attachments/assets/59a77237-d918-45f2-a60f-a41ea1fe9e50)

> **Empowering smarter, faster, and more accurate MRI diagnostics using AI.**

---

## 📽️ Live Demo
🎬 **Watch ACLyze AI in action:**  
[![ACLyze AI Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)  
> *Click the image or [here](https://www.youtube.com/watch?v=YOUR_VIDEO_ID) to view the full walkthrough of ACLyze AI.*

---

## 🧠 Overview

**ACLyze AI** is a full-stack web application built to assist radiologists and healthcare professionals in MRI scan analysis using deep learning models. The platform handles everything from secure uploads to real-time AI diagnosis and professional report generation.

Key highlights:
- Secure multi-role access for doctors, radiologists, and admins.
- Intuitive dashboards with real-time AI analysis.
- Integrated cloud storage, live notifications, and PDF reporting.

---

## ⚙️ System Architecture

```
┌────────────────────┐        ┌──────────────────────┐        ┌────────────────────┐
│   Angular Frontend │ <----> │  Node.js/Express API │ <----> │      MongoDB       │
│ Dashboard & Upload │        │ AI Trigger & Auth    │        │  MRI + Reports DB  │
└────────────────────┘        └──────────────────────┘        └────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│     External AI Service (FastAPI on HF)     │
│  Deep Learning Inference & Grad-CAM Heatmap │
└─────────────────────────────────────────────┘
```

---

## ✨ Features

### 🖥️ Frontend (Angular)
- ✅ Responsive medical UI with dark/light mode toggle.
- 🔐 Secure Login (JWT & Google OAuth).
- 📊 Role-Based Dashboards for:
  - **Radiologists**: Scan & report interface.
  - **Doctors**: Patient report viewer.
  - **Admins**: User, log, and system control.
- 📤 Drag-and-drop MRI Uploads (JPG/PNG/DICOM).
- 🧠 One-click AI Diagnosis with annotated output.
- 📄 PDF Report Generation & Download.
- 🔔 Real-Time & Email Notifications.
- 🧑‍💼 Admin Panel: Analytics, Logs, User Roles.

### 🛠️ Backend (Node.js/Express)
- REST API with modular structure & versioning.
- JWT Authentication + Role-Based Access.
- Cloudinary MRI uploads & file validation.
- AI API Integration for automated diagnosis.
- PDF generation and secure report management.
- Socket.IO notifications (real-time).
- Docker-ready for production builds.

---

## 📚 Data Models

```ts
User: {
  _id, name, email, password, role, createdAt, updatedAt
}

MRI Scan: {
  _id, userId, filename, fileUrl, fileType, uploadedAt, status
}

AI Analysis: {
  _id, scanId, detectedInjuries[], confidence, createdAt
}

Report: {
  _id, userId, scanId, analysisId, diagnosis, confidenceLevel, reportUrl, createdAt
}

Notification: {
  _id, userId, type, message, isRead, createdAt
}

Admin Log: {
  _id, action, userId, details, createdAt
}
```

---

## 📡 Sample API Endpoints

| Method | Endpoint                       | Description                  |
|--------|--------------------------------|------------------------------|
| POST   | `/auth/register`              | Register new user           |
| POST   | `/auth/login`                 | Login user                  |
| POST   | `/auth/google-login`          | Login with Google           |
| POST   | `/mri/upload`                 | Upload MRI scan             |
| GET    | `/mri/:id`                    | Get scan by ID              |
| POST   | `/mri/analyze`                | Run AI diagnosis            |
| GET    | `/report/:id`                 | Get diagnostic report       |
| GET    | `/notifications`              | List notifications          |
| POST   | `/notifications/mark-read`    | Mark notification as read   |
| GET    | `/admin/users`                | Admin: list all users       |

---

## 🛠️ Technologies

| Layer      | Stack/Tools |
|------------|-------------|
| Frontend   | Angular 17+, RxJS, GSAP, Toastr, Google Login |
| Backend    | Node.js, Express.js, MongoDB, Mongoose, JWT, Socket.io |
| AI Service | Python (FastAPI), Hugging Face, Grad-CAM |
| DevOps     | Docker, Docker Compose, GitHub Actions (CI/CD) |
| Others     | Cloudinary, Nodemailer, ngx-toastr |

---

## 🧪 Setup & Installation

### 🔧 Prerequisites
- Node.js v20+
- MongoDB (local or Atlas)
- Cloudinary & Google OAuth credentials
- (Optional) Docker

### 🔍 1. Clone the Repository
```bash
git clone https://github.com/your-org/aclyze-ai.git
cd aclyze-ai
```

### 🔐 2. Environment Variables
Copy `.env.example` into `.env` and set:
- `MONGODB_URI`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `CLOUDINARY_KEY`, etc.

### 📦 3. Install Dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 🚀 4. Run Locally
```bash
# Start backend
cd backend && npm start

# Start frontend
cd ../frontend && npm start
```
Visit: [http://localhost:4200](http://localhost:4200)

### 🐳 5. Docker Deployment
```bash
# Frontend
docker build -t aclzye-frontend ./frontend
docker run -p 4200:80 aclzye-frontend

# Backend (uncomment to use)
# docker build -t aclzye-backend ./backend
# docker run -p 3000:3000 aclzye-backend
```

---

## 💡 Usage Flow

1. **Login/Register** → Choose role (Doctor / Radiologist / Admin).
2. **Upload MRI** → Upload JPG/PNG/DICOM & track progress.
3. **Trigger AI** → View predictions, Grad-CAM heatmap, injury type.
4. **Generate Report** → Save & download PDF diagnosis.
5. **Get Notified** → Receive real-time and email alerts.
6. **Admin Tools** → Manage users, logs, roles, & system statistics.

---

## 🤝 Contribution

Want to contribute? Awesome!

- Fork the repo and clone it.
- Create a feature branch: `git checkout -b feature/amazing-feature`
- Commit your changes: `git commit -m 'feat: added amazing feature'`
- Push to the branch and open a PR 🎉

---

## 📬 Contact

- **Shawky Ahmad** – [GitHub](https://github.com/ShawkyAhmad) | [LinkedIn](https://linkedin.com/in/shawky-ahmad)
- Email: shawky.dev@gmail.com

---

### ⭐️ If you like this project, give it a star!

> *“Medicine meets Machine Learning — bridging the gap between diagnosis and data.”*
