# ACLyze AI: MRI Analysis Platform
![Screenshot_27-6-2025_1825_aclyze vercel app](https://github.com/user-attachments/assets/59a77237-d918-45f2-a60f-a41ea1fe9e50)

## Overview

**ACLyze AI** is a full-stack web platform for advanced MRI scan management and AI-powered diagnostic analysis. Designed for radiologists, doctors, and admins, it streamlines the workflow from scan upload to AI analysis, reporting, and notification, all with robust authentication and role-based access control.

---

## Architecture

```
[ Angular Frontend ]  <---->  [ Node.js/Express Backend ]  <---->  [ MongoDB ]
         |                                 |                        |
         |                                 |                        |
   [User Auth, Upload,         [REST APIs, AI Service,         [Data Storage]
    Dashboard, Admin]           Notification, Admin]
```

---

## Features

### 🚀 Frontend (Angular)
- **Modern UI/UX**: Responsive, animated, and user-friendly interface.
- **Authentication**: Email/password login, registration, and Google OAuth login.
- **Role-based Dashboard**: Custom dashboards for radiologists, doctors, and admins.
- **MRI Scan Management**: Upload, view, and delete MRI scans with progress feedback.
- **AI Analysis**: Trigger AI-powered injury detection and view annotated results.
- **Report Generation**: Downloadable PDF diagnostic reports.
- **Notifications**: Real-time in-app and email notifications for analysis, reports, and system alerts.
- **Admin Panel**: User management, access control, system logs, and analytics.
- **Dark/Light Mode**: (If implemented)

### 🛠️ Backend (Node.js/Express)
- **RESTful API**: Modular, versioned endpoints for all features.
- **Authentication & RBAC**: JWT-based auth, role checks, and Google login integration.
- **MRI Scan Handling**: Secure file upload, validation, and cloud storage integration.
- **AI Service Integration**: Interfaces with external AI for injury analysis.
- **Report Service**: Generates and stores PDF reports.
- **Notification Service**: Real-time (Socket.io) and email notifications.
- **Admin Tools**: User CRUD, access toggling, logs, and statistics.
- **Dockerized**: Both frontend and backend are ready for containerized deployment.

---

## Data Models

- **User**: `{ _id, name, email, password, role, createdAt, updatedAt }`
- **MRI Scan**: `{ _id, userId, filename, fileUrl, fileType, uploadedAt, status }`
- **AI Analysis**: `{ _id, scanId, detectedInjuries[], createdAt }`
- **Report**: `{ _id, userId, scanId, analysisId, diagnosis, confidenceLevel, reportUrl, createdAt }`
- **Notification**: `{ _id, userId, type, message, isRead, createdAt }`
- **Admin Log**: `{ _id, action, userId, details, createdAt }`

---

## API Endpoints (Sample)

- `POST   /auth/register` – User registration
- `POST   /auth/login` – User login
- `POST   /auth/google-login` – Google OAuth login
- `POST   /auth/reset-password` – Password reset
- `POST   /mri/upload` – Upload MRI scan
- `GET    /mri/:id` – View MRI scan
- `DELETE /mri/:id` – Delete MRI scan
- `POST   /mri/analyze` – Trigger AI analysis
- `GET    /report/:id` – Fetch diagnostic report
- `GET    /notifications` – Fetch notifications
- `POST   /notifications/mark-read` – Mark as read
- `GET    /admin/users` – List users


---

## Technologies Used

- **Frontend**: Angular 17+, RxJS, GSAP, ngx-toastr, angularx-social-login
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Socket.io, google-auth-library
- **AI Service**: (External Python/ML API integration)
- **Docker**: Multi-stage builds for both frontend and backend

---

## Setup & Installation

### Prerequisites
- Node.js 20+
- MongoDB
- (Optional) Docker & Docker Compose

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd GP-MRI
```

### 2. Environment Variables
- Copy `.env.example` to `.env` in both `backend/` and `frontend/` (if needed).
- Set MongoDB URI, JWT secret, Google Client ID, and other secrets.

### 3. Install Dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 4. Run Locally
- **Backend**: `cd backend && npm start`
- **Frontend**: `cd frontend && npm start`
- Visit `http://localhost:4200`

### 5. Docker Deployment
- Build and run containers:
```bash
docker build -t aclzye-frontend ./frontend
# docker build -t aclzye-backend ./backend
# docker run -p 4200:80 aclzye-frontend
# docker run -p 3000:3000 aclzye-backend
```

---

## Usage Highlights
- **Login/Register**: Email/password or Google.
- **Upload MRI**: Drag & drop DICOM/JPEG/PNG, view upload status.
- **AI Analysis**: One-click analysis, see annotated results.
- **Reports**: Download PDF, view history.
- **Notifications**: Real-time and email.
- **Admin**: Manage users, roles, access, and view logs/statistics.

---

## Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

> **ACLyze AI** – Empowering smarter, faster, and more accurate MRI diagnostics.
