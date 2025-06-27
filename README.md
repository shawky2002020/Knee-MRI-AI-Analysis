# 🧠 ACLyze AI: Revolutionary MRI Analysis Platform

<div align="center">

![ACLyze AI Banner](https://github.com/user-attachments/assets/59a77237-d918-45f2-a60f-a41ea1fe9e50)

[![Made with Angular](https://img.shields.io/badge/Made%20with-Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Powered by Node.js](https://img.shields.io/badge/Powered%20by-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-FF6B6B?style=for-the-badge&logo=brain&logoColor=white)](https://huggingface.co/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

### 🚀 *Empowering smarter, faster, and more accurate MRI diagnostics using cutting-edge AI technology*

[🎯 Live Demo](https://aclyze.vercel.app/home) 

</div>

---

## 🎬 Live Demo

<div align="center">

### 🌟 See ACLyze AI in Action

![ACLyze AI Dashboard Demo](https://github.com/user-attachments/assets/3b1b7344-c3e4-467b-8f47-28fe0a80aa3f)

**[📺 Watch Full Demo Video](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)** | **[🌐 Try Live Demo](https://aclyze-ai-demo.vercel.app)**

</div>

---

## 🎯 Project Overview

**ACLyze AI** is a revolutionary full-stack medical imaging platform designed as a graduation project to transform MRI scan analysis through artificial intelligence. Built with modern web technologies and powered by deep learning models, it bridges the gap between medical expertise and AI innovation.

### 🏆 Key Achievements
- 🎓 **Graduation Project** - Computer Science/Medical Informatics
- 🧠 **AI-Powered Diagnosis** - Advanced deep learning models
- 🏥 **Clinical Ready** - Designed for real healthcare environments
- 🔒 **HIPAA Compliant** - Secure patient data handling
- ⚡ **Real-time Processing** - Instant AI analysis results

### 🌟 What Makes ACLyze AI Special?

<table>
<tr>
<td align="center">
<img src="https://img.icons8.com/color/48/000000/artificial-intelligence.png"/>
<h4>🧠 Advanced AI</h4>
<p>State-of-the-art deep learning models with Grad-CAM visualization</p>
</td>
<td align="center">
<img src="https://img.icons8.com/color/48/000000/security-checked.png"/>
<h4>🔒 Enterprise Security</h4>
<p>JWT authentication, role-based access, and secure data handling</p>
</td>
<td align="center">
<img src="https://img.icons8.com/color/48/000000/speed.png"/>
<h4>⚡ Lightning Fast</h4>
<p>Real-time analysis with instant notifications and results</p>
</td>
</tr>
<tr>
<td align="center">
<img src="https://img.icons8.com/color/48/000000/medical-doctor.png"/>
<h4>👨‍⚕️ Multi-Role Support</h4>
<p>Designed for radiologists, doctors, and healthcare administrators</p>
</td>
<td align="center">
<img src="https://img.icons8.com/color/48/000000/report-card.png"/>
<h4>📊 Professional Reports</h4>
<p>Automated PDF generation with detailed diagnostic insights</p>
</td>
<td align="center">
<img src="https://img.icons8.com/color/48/000000/cloud-storage.png"/>
<h4>☁️ Cloud Integration</h4>
<p>Seamless file storage and management with Cloudinary</p>
</td>
</tr>
</table>

---

## 🏗️ System Architecture

<div align="center">

```mermaid
graph TB
    A[👨‍⚕️ Healthcare Users] --> B[🌐 Angular Frontend]
    B --> C[⚡ Node.js/Express API]
    C --> D[🗄️ MongoDB Database]
    C --> E[🤖 AI Service FastAPI]
    C --> F[☁️ Cloudinary Storage]
    C --> G[📧 Email Service]
    C --> H[🔔 Real-time Notifications]
    
    subgraph "🧠 AI Pipeline"
        E --> I[📊 Deep Learning Model]
        I --> J[🎨 Grad-CAM Visualization]
        J --> K[📋 Diagnostic Report]
    end
    
    subgraph "🔒 Security Layer"
        L[🔐 JWT Authentication]
        M[👤 Role-based Access]
        N[🛡️ Data Encryption]
    end
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#ffebee
```

</div>

---

## ✨ Core Features

### 🖥️ Frontend Excellence (Angular 17+)

<details>
<summary><b>🎨 User Interface & Experience</b></summary>

- 🌓 **Dark/Light Mode Toggle** - Adaptive themes for user comfort
- 📱 **Fully Responsive Design** - Optimized for all devices
- 🎭 **Modern Medical UI** - Clean, professional healthcare interface
- ⚡ **Smooth Animations** - GSAP-powered interactions
- 🧭 **Intuitive Navigation** - User-friendly routing and workflows

</details>

<details>
<summary><b>🔐 Authentication & Security</b></summary>

- 🔑 **JWT Token Authentication** - Secure session management
- 🌐 **Google OAuth Integration** - One-click social login
- 👤 **Multi-Role System** - Radiologist, Doctor, Admin roles
- 🛡️ **Protected Routes** - Role-based access control
- 🔒 **Session Management** - Automatic token refresh

</details>

<details>
<summary><b>📊 Role-Based Dashboards</b></summary>

| Role | Dashboard Features |
|------|-------------------|
| 👨‍⚕️ **Doctors** | MRI upload, AI analysis, report generation, patient management, view reports |
| 👨‍💼 **Admins** | User management, system logs, analytics, role assignment |

</details>

<details>
<summary><b>🧠 AI-Powered Analysis</b></summary>

- 📤 **Smart Upload System** - Drag-and-drop with format validation
- 🎯 **One-Click AI Diagnosis** - Instant deep learning analysis
- 🎨 **Grad-CAM Heatmaps** - Visual injury localization
- 📈 **Confidence Scoring** - AI prediction reliability metrics
- 🔍 **Multi-Format Support** - JPG, PNG, DICOM compatibility

</details>

### 🛠️ Backend Power (Node.js/Express)

<details>
<summary><b>🏗️ Architecture & APIs</b></summary>

- 🔄 **RESTful API Design** - Clean, versioned endpoints
- 📦 **Modular Structure** - Scalable codebase organization
- 🔌 **Middleware Pipeline** - Authentication, validation, logging
- 📝 **Comprehensive Documentation** - API docs with examples
- 🐳 **Docker Ready** - Containerized deployment

</details>

<details>
<summary><b>🤖 AI Integration</b></summary>

- 🚀 **FastAPI Service** - High-performance Python backend
- 🧠 **Deep Learning Models** - Advanced neural networks
- ☁️ **Hugging Face Hub** - Model hosting and versioning
- 📊 **Real-time Processing** - Instant analysis results
- 🎯 **Injury Detection** - ACL, meniscus, and cartilage analysis

</details>

<details>
<summary><b>💾 Data Management</b></summary>

- 🗄️ **MongoDB Integration** - NoSQL database flexibility
- ☁️ **Cloudinary Storage** - Secure file management
- 📄 **PDF Generation** - Professional report creation
- 🔔 **Real-time Notifications** - Socket.IO integration
- 📧 **Email Service** - Automated alert system

</details>

---

## 📚 Data Models & Schema

<div align="center">

### 🗃️ Database Structure

</div>

```typescript
// 👤 User Management
interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;        // Hashed with bcrypt
  role: 'doctor' | 'admin';
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 🧠 MRI Scan Data
interface MRIScan {
  _id: ObjectId;
  userId: ObjectId;        // Uploaded by
  patientId?: string;      // Patient identifier
  filename: string;
  fileUrl: string;         // Cloudinary URL
  fileType: 'jpg' | 'png' | 'dicom';
  fileSize: number;
  uploadedAt: Date;
  status: 'uploaded' | 'processing' | 'analyzed' | 'failed';
  metadata?: {
    name:string;
    gender:string;
    age:number;
    scanType: string;
  };
}

// 🤖 AI Analysis Results
interface AIAnalysis {
  user_id: ObjectId;
  scanId: ObjectId;
  result: 'ACL' | 'Meniscus' | 'Acl and Meniscus' | 'Normal';
  heatmapUrl : string;

}

// 📄 Medical Reports
interface MedicalReport {
  _id: ObjectId;
  userId: ObjectId;        // Created by
  patientId?: string;
  scanId: ObjectId;
  analysisId: ObjectId;
  reportNumber: string;    // Unique identifier
  diagnosis: string;
  recommendations: string[];
  confidenceLevel: number;
  reportUrl: string;       // PDF download URL
  status: 'draft' | 'finalized' | 'sent';
  reviewedBy?: ObjectId;   // Doctor ID
  createdAt: Date;
  finalizedAt?: Date;
}

// 🔔 Notification System
interface Notification {
  _id: ObjectId;
  userId: ObjectId;
  type: 'good' | 'bad' | 'info' | 'danger';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  metadata?: object;
  createdAt: Date;
  readAt?: Date;
}


```

---

## 🌐 API Documentation

<div align="center">

### 📡 RESTful API Endpoints

</div>

<details>
<summary><b>🔐 Authentication Endpoints</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/auth/register` | Register new user | ❌ |
| `POST` | `/api/v1/auth/login` | User login | ❌ |
| `POST` | `/api/v1/auth/google-login` | Google OAuth login | ❌ |
| `POST` | `/api/v1/auth/refresh` | Refresh JWT token | ✅ |
| `POST` | `/api/v1/auth/logout` | User logout | ✅ |

</details>

<details>
<summary><b>🧠 MRI & Analysis Endpoints</b></summary>

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/mri/upload` | Upload MRI scan | Doctor |
| `GET` | `/api/v1/mri/list` | Get user's MRI scans | Doctor+ |
| `GET` | `/api/v1/mri/:id` | Get scan details | Doctor+ |
| `POST` | `/api/v1/mri/:id/analyze` | Trigger AI analysis | Doctor |
| `GET` | `/api/v1/mri/:id/analysis` | Get analysis results | Doctor+ |
| `DELETE` | `/api/v1/mri/:id` | Delete MRI scan | Doctor |

</details>

<details>
<summary><b>📄 Report Management</b></summary>

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/reports/generate` | Generate medical report | Doctor |


</details>

<details>
<summary><b>🔔 Notifications & Admin</b></summary>

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| `GET`  | `/api/v1/admin/users/stats`       | Get users stats and analytics         | Any       |
| `GET`  | `/api/v1/admin/users`             | List all users                        | Admin     |
| `GET`  | `/api/v1/admin/users/:id`         | Get a specific user's details         | Admin     |
| `PUT`  | `/api/v1/admin/users/:id/role`    | Update user role (Doctor/Radiologist/Admin) | Admin |
| `PATCH`| `/api/v1/admin/users/:id/status`  | Toggle user access (activate/deactivate) | Admin |
| `DELETE`| `/api/v1/admin/users/:id`        | Delete a user account                 | Admin     |

</details>

---

## 🛠️ Technology Stack

<div align="center">

### 🏗️ Built with Modern Technologies

</div>

<table>
<tr>
<td><b>Category</b></td>
<td><b>Technologies</b></td>
<td><b>Purpose</b></td>
</tr>
<tr>
<td><b>🎨 Frontend</b></td>
<td>
  <img src="https://img.shields.io/badge/Angular_17+-DD0031?style=flat&logo=angular&logoColor=white" alt="Angular"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/RxJS-B7178C?style=flat&logo=reactivex&logoColor=white" alt="RxJS"/>
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white" alt="GSAP"/>
</td>
<td>Modern SPA with reactive programming</td>
</tr>
<tr>
<td><b>⚙️ Backend</b></td>
<td>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socketdotio&logoColor=white" alt="Socket.io"/>
</td>
<td>High-performance RESTful API</td>
</tr>
<tr>
<td><b>🗄️ Database</b></td>
<td>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white" alt="Mongoose"/>
</td>
<td>NoSQL document storage</td>
</tr>
<tr>
<td><b>🤖 AI/ML</b></td>
<td>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=flat&logo=huggingface&logoColor=black" alt="Hugging Face"/>
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white" alt="TensorFlow"/>
</td>
<td>Deep learning inference & visualization</td>
</tr>
<tr>
<td><b>☁️ Cloud & Storage</b></td>
<td>
  <img src="https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white" alt="Render"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel"/>
</td>
<td>File storage & deployment</td>
</tr>
<tr>
<td><b>🔒 Security & Auth</b></td>
<td>
  <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/bcrypt-338CBB?style=flat&logo=letsencrypt&logoColor=white" alt="bcrypt"/>
  <img src="https://img.shields.io/badge/Google_OAuth-4285F4?style=flat&logo=google&logoColor=white" alt="Google OAuth"/>
</td>
<td>Authentication & encryption</td>
</tr>
<tr>
<td><b>🛠️ DevOps</b></td>
<td>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white" alt="GitHub Actions"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white" alt="ESLint"/>
</td>
<td>CI/CD & code quality</td>
</tr>
</table>

---

## 🚀 Quick Start Guide

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- 📦 **Node.js** (v18.0.0 or higher)
- 🍃 **MongoDB** (v5.0 or higher) - Local or MongoDB Atlas
- 🐳 **Docker** (optional, for containerized deployment)
- 🔑 **Git** for version control

### ⚡ Installation & Setup

<details>
<summary><b>🔽 Step 1: Clone the Repository</b></summary>

```bash
# Clone the repository
git clone https://github.com/ShawkyAhmad/aclyze-ai.git

# Navigate to project directory
cd aclyze-ai

# Check project structure
ls -la
```

</details>

<details>
<summary><b>🔧 Step 2: Environment Configuration</b></summary>

Create environment files for both frontend and backend:

**Backend Environment (`.env`):**
```bash
# Copy example environment file
cp backend/.env.example backend/.env
```

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aclyze-ai
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aclyze-ai

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# AI Service
AI_SERVICE_URL=https://your-ai-service.herokuapp.com/api/v1

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Frontend Environment (`src/environments/environment.ts`):**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  googleClientId: 'your_google_client_id',
  socketUrl: 'http://localhost:3000'
};
```

</details>

<details>
<summary><b>📦 Step 3: Install Dependencies</b></summary>

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

</details>

<details>
<summary><b>🚀 Step 4: Start the Application</b></summary>

**Option A: Development Mode (Recommended)**
```bash
# Terminal 1: Start MongoDB (if running locally)
mongod

# Terminal 2: Start Backend Server
cd backend
npm run dev

# Terminal 3: Start Frontend Server
cd frontend
npm start
```

**Option B: Production Build**
```bash
# Build frontend for production
cd frontend
npm run build

# Start backend in production mode
cd ../backend
npm run start:prod
```

</details>

### 🐳 Docker Deployment

<details>
<summary><b>🐋 Using Docker Compose (Recommended)</b></summary>

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

</details>

<details>
<summary><b>🔧 Individual Container Setup</b></summary>

```bash
# Build and run frontend
docker build -t aclyze-frontend ./frontend
docker run -p 4200:80 aclyze-frontend

# Build and run backend
docker build -t aclyze-backend ./backend
docker run -p 3000:3000 --env-file .env aclyze-backend
```

</details>

### 🌐 Access the Application

Once everything is running:

- 🖥️ **Frontend**: http://localhost:4200
- ⚙️ **Backend API**: http://localhost:3000
- 📚 **API Documentation**: http://localhost:3000/api-docs
- 🗄️ **MongoDB**: mongodb://localhost:27017

---

## 📱 Usage Guide

### 🎯 Getting Started

<details>
<summary><b>1️⃣ User Registration & Login</b></summary>

**Registration Process:**
1. Navigate to the registration page
2. Choose your role: Doctor or Admin
3. Fill in required information
4. Verify email (if email verification is enabled)
5. Complete profile setup

**Login Options:**
- 📧 Email & Password
- 🌐 Google OAuth
- 🔐 Two-Factor Authentication (if enabled)

</details>

<details>
<summary><b>2️⃣ Dashboard Overview</b></summary>

**Doctor Dashboard:**
- 📊 Analysis overview and statistics
- 📤 Quick MRI upload section
- 📋 Recent scans and pending analyses
- 📄 Generated reports summary
- 👥 Patient reports overview
- 🔍 Search and filter reports
- 📥 Download diagnostic reports
- 📊 Patient history tracking

**Admin Dashboard:**
- 👥 User management panel
- 📊 System analytics and metrics
- 📝 Activity logs and monitoring
- ⚙️ System configuration settings

</details>

<details>
<summary><b>3️⃣ MRI Upload & Analysis Workflow</b></summary>

**Step 1: Upload MRI Scan**
```
1. Click "Upload New MRI" button
2. Drag & drop or select MRI file (JPG, PNG, DICOM)
3. Add patient information (optional)
4. Confirm upload and wait for processing
```

**Step 2: AI Analysis**
```
1. Navigate to uploaded scan
2. Click "Analyze with AI" button
3. Wait for AI processing (usually 30-60 seconds)
4. Review AI predictions and confidence scores
5. Examine Grad-CAM heatmap visualization
```

**Step 3: Report Generation**
```
1. Review AI analysis results
2. Add clinical notes and observations
3. Generate professional PDF report
4. Download or share report with colleagues
```

</details>

### 🔧 Advanced Features

<details>
<summary><b>🤖 AI Model Configuration</b></summary>

- **Model Selection**: Choose between different AI models
- **Confidence Thresholds**: Adjust sensitivity settings
- **Batch Processing**: Analyze multiple scans simultaneously
- **Custom Parameters**: Fine-tune analysis parameters

</details>

<details>
<summary><b>📊 Analytics & Reporting</b></summary>

- **Usage Statistics**: Track platform utilization
- **Performance Metrics**: Monitor AI model accuracy
- **User Activity**: Analyze user behavior patterns
- **Export Data**: Download analytics reports

</details>

---


## 🚀 Deployment

<div align="center">

### ☁️ Cloud Deployment Options

</div>

<details>
<summary><b>🌐 Vercel (Frontend)</b></summary>

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

**Vercel Configuration (`vercel.json`):**
```json
{
  "version": 2,
  "name": "aclyze-ai-frontend",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/aclyze-ai"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

</details>

<details>
<summary><b>🌐 Render (Backend)</b></summary>

```bash
# Create a new Render service
# 1. Connect your GitHub repository
# 2. Select "Web Service"
# 3. Set build command: npm install
# 4. Set start command: npm start

# Environment Variables (Set in Render Dashboard):
# MONGODB_URI, JWT_SECRET, etc.
```

**Render Configuration (`render.yaml`):**
```yaml
services:
  - type: web
    name: aclyze-ai-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
    healthCheckPath: /health
```

</details>

<details>
<summary><b>🐳 Docker Production</b></summary>

**Production Docker Compose:**
```yaml
version: '3.8'
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - NODE_ENV=production

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production

  mongodb:
    image: mongo:6.0
    ports:
