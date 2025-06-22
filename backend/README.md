# ACLyze AI Backend

A robust Node.js/Express backend powering MRI scan management, AI-driven diagnostics, and healthcare workflow automation. This backend delivers secure REST APIs, real-time notifications, and comprehensive admin tools for radiologists, doctors, and admins.

---

## ✨ Features

### Authentication & Security
- JWT-based authentication for all protected endpoints
- Role-based access control (User, Admin)
- Google OAuth login (ID token verification)
- Password hashing with bcrypt

### User Management
- User registration, login, and profile management
- Admin CRUD for users (create, read, update, delete)
- Role and AI access toggling

### MRI Scan Management
- Upload MRI scans (DICOM, JPEG, PNG) with file validation
- Secure file storage (local or cloud, as configured)
- Scan status tracking (pending, analyzed, failed)
- Delete scans

### AI Analysis Integration
- Trigger AI-powered injury detection for uploaded scans
- Interface with external AI service (Python/ML API)
- Store and retrieve AI analysis results

### Reports
- Generate PDF diagnostic reports (Puppeteer)
- Store and serve reports for download

### Notifications
- Real-time notifications (Socket.io)
- Email notifications (Nodemailer)
- Notification CRUD and unread count

### Admin Tools
- User management (list, create, edit, delete)
- System logs and analytics
- Access control and statistics

### API & Architecture
- RESTful, versioned API endpoints (`/v1/`)
- Modular controllers, services, and middleware
- Centralized error handling
- Dockerized for easy deployment

---

## 🗂️ Project Structure

```
/backend
  /config         # DB, server, and auth config
  /controllers    # API logic for each feature
  /models         # Mongoose schemas
  /routes         # API route definitions
  /middleware     # JWT, file upload, error handling
  /services       # Business logic (AI, email, notification, file)
  /utils          # Helper functions
  /reports        # Generated PDF reports
  Dockerfile      # Docker build config
  server.mjs      # Main entry point
  .env            # Environment variables
  package.json
```

---

## 🧩 Data Models (Mongoose)

- **User**: `_id, name, email, password, role, aiAccess, createdAt, updatedAt, lastLogin, loginCount`
- **MriScan**: `_id, userId, filename, fileUrl, fileType, uploadedAt, status`
- **Report**: `_id, userId, scanId, analysisId, diagnosis, confidenceLevel, reportUrl, createdAt`
- **Notification**: `_id, userId, type, message, isRead, createdAt`
- **AdminLog**: `_id, action, userId, details, createdAt`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB

### Installation
```bash
cd backend
npm install
```

### Environment Variables
- Copy `.env.example` to `.env`
- Set MongoDB URI, JWT secret, Google Client ID, email credentials, etc.

### Development
```bash
npm start
```

### Docker
```bash
docker build -t aclzye-backend .
docker run -p 3000:3000 aclzye-backend
```

---

## 🔌 API Endpoints (Sample)

- `POST   /v1/auth/register` – User registration
- `POST   /v1/auth/login` – User login
- `POST   /v1/auth/google-login` – Google OAuth login
- `POST   /v1/auth/reset-password` – Password reset
- `POST   /v1/mri/upload` – Upload MRI scan
- `GET    /v1/mri/:id` – View MRI scan
- `DELETE /v1/mri/:id` – Delete MRI scan
- `POST   /v1/mri/analyze` – Trigger AI analysis
- `GET    /v1/report/:id` – Fetch diagnostic report
- `GET    /v1/notifications` – Fetch notifications
- `POST   /v1/notifications/mark-read` – Mark as read
- `GET    /v1/admin/users` – List users
- `POST   /v1/admin/create-user` – Create user
- `GET    /v1/admin/system-logs` – System logs

---

## 🛡️ Security & Best Practices
- All endpoints require JWT
- Passwords are hashed and never returned
- Role checks for admin/user endpoints
- Centralized error and validation handling
- Environment variables for all secrets

---

## 🤝 Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

> **ACLyze AI Backend** – Powering smarter, faster, and more accurate MRI diagnostics for everyone.
