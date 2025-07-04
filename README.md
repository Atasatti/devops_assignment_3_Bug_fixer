# DevOps Task Manager Application

## 🎯 Project Overview
Bug Tracker web application built with Node.js, Express, and MongoDB Atlas for COMSATS University DevOps Course (CSC483).


## 🚀 Application Features
- ✅ Create, Read, Update, Delete (CRUD) bugs
- ✅ Bug status management (pending, in-progress, completed)
- ✅ Priority levels (low, medium, high)
- ✅ Bug filtering and search
- ✅ Responsive web interface
- ✅ MongoDB Atlas integration
- ✅ REST API endpoints

## 🛠️ Tech Stack
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas (Cloud)
- **Frontend**: Vanilla JavaScript + HTML/CSS
- **Deployment**: Docker + AWS EC2

## 📋 Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Docker (for deployment)

## ⚙️ Environment Setup

### Local Development
```bash
# Clone repository
git clone <your-app-repo-url>
cd devops-app-repo

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=your_mongodb_atlas_connection_string" > .env
echo "PORT=5050" >> .env

# Start application
npm start
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Application will be available at http://localhost:5050
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page |
| GET | `/api/bugs` | Get all bugs |
| GET | `/api/bugs/:id` | Get bug by ID |
| POST | `/api/bugs` | Create new bug |
| PUT | `/api/bugs/:id` | Update bug |
| DELETE | `/api/bugs/:id` | Delete bug |
| GET | `/health` | Health check |

## 🚀 AWS EC2 Deployment

### Prerequisites
- AWS EC2 instance (t3.micro or larger)
- Docker installed on EC2
- Security group allowing port 5050

### Deployment Steps
```bash
# On EC2 instance
git clone <your-app-repo-url>
cd devops-app-repo

# Deploy with Docker Compose
docker-compose up -d

# Application will be live at http://your-ec2-ip:5050
```

## 📊 MongoDB Atlas Configuration
See `