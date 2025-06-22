# ACLyze AI Frontend

A modern, robust Angular application for MRI scan management, AI-powered diagnostics, and healthcare workflow automation. This frontend is designed for radiologists, doctors, and admins, providing a seamless experience from authentication to advanced reporting.

---

## ✨ Features

### Authentication & Security
- **Email/Password Login & Registration**
- **Google OAuth Login** (via angularx-social-login)
- **JWT-based session management**
- **Role-based access** (Radiologist, Doctor, Admin)

### User Dashboard
- **Personalized dashboard** with quick access to recent scans, reports, and notifications
- **Profile management**

### MRI Scan Management
- **Upload MRI scans** (DICOM, JPEG, PNG)
- **Drag & drop file uploader** with progress feedback
- **View scan history** with status (pending, analyzed, failed)
- **Delete scans**

### AI Analysis
- **Trigger AI-powered injury detection** for uploaded scans
- **View annotated results** (heatmaps, injury regions, confidence levels)
- **Seamless integration with backend AI service**

### Reports
- **Generate and download PDF diagnostic reports**
- **View report history**

### Notifications
- **Real-time in-app notifications** (Socket.io)
- **Email notifications** for important events
- **Notification center** with read/unread status

### Admin Panel
- **User management** (list, create, edit, delete users)
- **Role and access control**
- **System logs and analytics**
- **Admin dashboard** for platform statistics

### UI/UX
- **Responsive design** for desktop and mobile
- **Animated transitions** (GSAP)
- **Reusable shared components** (navbar, sidebar, modals, etc.)
- **Dark/Light mode** (if implemented)

---

## 🗂️ Project Structure

```
/src
  /app
    /core         # Singleton services (auth, user, ai, notification)
    /shared       # Reusable components, pipes, directives
    /features     # Feature modules: auth, dashboard, mri, admin
    /layout       # Main layout components (header, sidebar, footer)
    app-routing.module.ts
    app.module.ts
  /assets         # Images, icons, fonts, styles
  /environments   # Environment configs
  main.ts
  index.html
```

---

## 🧩 Data Models (TypeScript)

- **User**: `_id, name, email, password, role, createdAt, updatedAt`
- **MriScan**: `_id, userId, filename, fileUrl, fileType, uploadedAt, status`
- **AiAnalysis**: `_id, scanId, detectedInjuries[], createdAt`
- **Report**: `_id, userId, scanId, analysisId, diagnosis, confidenceLevel, reportUrl, createdAt`
- **Notification**: `_id, userId, type, message, isRead, createdAt`
- **AdminLog**: `_id, action, userId, details, createdAt`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Angular CLI 17+

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm start
# or
ng serve
```
Visit [http://localhost:4200](http://localhost:4200)

### Build
```bash
ng build
```

### Docker
```bash
docker build -t aclzye-frontend .
docker run -p 4200:80 aclzye-frontend
```

---

## 🛡️ Security & Best Practices
- All API calls use JWT for authentication
- Sensitive data is never stored in the frontend
- Follows Angular best practices for modularity and maintainability

---

## 🤝 Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

> **ACLyze AI Frontend** – Empowering smarter, faster, and more accurate MRI diagnostics for everyone.
