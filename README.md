# Bug Tracker CI/CD Pipeline
## Node.js + Express + MongoDB + Selenium + Jenkins

A complete DevOps project demonstrating a full CI/CD pipeline for a bug tracking application built with Node.js, Express, and MongoDB, with automated Selenium tests and Jenkins orchestration.

**COMSATS University - Spring 2025 - CSC483 DevOps**  
**Student:** Afnan Ajmal | **Instructor:** Qasim Malik

---

## 📋 Project Overview

This repository contains:
- **Application**: Node.js/Express bug tracker with MongoDB Atlas backend
- **Tests**: Selenium-based integration tests (Java/Maven)
- **CI/CD Pipeline**: Unified Jenkins pipeline that builds, tests, and deploys

The pipeline runs automatically on every push:
1. **Build** - Install dependencies
2. **Deploy** - Start Docker containers with health checks
3. **Test** - Run Selenium test suite against live app
4. **Report** - Generate HTML test reports and email notifications

---

## 🎯 Features

### Application
- ✅ Create, Read, Update, Delete (CRUD) bugs
- ✅ Bug status management (pending, in-progress, completed)
- ✅ Priority levels (low, medium, high)
- ✅ RESTful API endpoints
- ✅ MongoDB Atlas integration
- ✅ Responsive web interface
- ✅ Health check endpoint

### Testing
- ✅ Selenium automated UI tests (Java/Maven)
- ✅ Browser automation (Chrome)
- ✅ Test reporting (JUnit XML format)
- ✅ Screenshots and artifacts

### Pipeline
- ✅ Automated build on push (GitHub webhook)
- ✅ Docker containerization
- ✅ Integration test execution
- ✅ Email notifications with detailed reports
- ✅ Artifact archiving

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js 18+, Express.js |
| **Database** | MongoDB Atlas (Cloud) |
| **Testing** | Selenium, Java, Maven |
| **CI/CD** | Jenkins, GitHub Webhooks |
| **Deployment** | Docker, Docker Compose |
| **Infrastructure** | AWS EC2 |

---

## 📦 Repository Structure

```
nodejs-bugtracker-cicd/
├── .gitignore
├── .DS_Store (will be removed)
├── README.md              # This file
├── Dockerfile             # Container image definition
├── docker-compose.yml     # Multi-container orchestration
├── Jenkinsfile            # Unified CI/CD pipeline
├── deploy.sh              # Deployment script
├── package.json           # Node.js dependencies
├── package-lock.json      # Locked dependency versions
├── server.js              # Main application entry point
│
├── app/                   # Application source code
│   ├── package.json
│   ├── server.js
│   └── public/            # Static assets
│       ├── index.html
│       ├── style.css
│       └── script.js
│
├── public/                # Frontend files
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── selenium-tests/        # Selenium test suite
    ├── pom.xml            # Maven configuration
    ├── run-tests.sh       # Test execution script
    └── src/test/java/
        └── BugTrackerTest.java  # Test cases
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB Atlas account
- Java 11+ (for local test execution)
- Maven 3.6+ (for local test execution)

### Local Development

```bash
# Clone repository
git clone https://github.com/Atasatti/nodejs-bugtracker-cicd.git
cd nodejs-bugtracker-cicd

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=5050
NODE_ENV=development
EOF

# Start application
npm start
# App available at http://localhost:5050
```

### Docker Deployment

```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all containers
docker-compose down

# Application available at http://localhost:5050
```

---

## 🧪 Running Tests

### Local Test Execution

```bash
cd selenium-tests

# Run tests against local app (http://localhost:5050)
mvn test -DAPP_URL=http://localhost:5050

# Run tests against remote app
mvn test -DAPP_URL=http://your-server:5050
```

### Test Results

Test results are generated in: `selenium-tests/target/surefire-reports/`

- `TEST-*.xml` - JUnit format (for Jenkins integration)
- HTML reports available after build

---

## 📊 CI/CD Pipeline

### Jenkins Pipeline Stages

The `Jenkinsfile` defines a 7-stage automated pipeline:

```groovy
1. Cleanup Workspace      → Remove old builds
2. Checkout               → Pull latest code
3. Build Application      → npm install
4. Pull Docker Image      → Prepare container
5. Deploy App             → Start Docker container with health checks
6. Run Selenium Tests     → Execute test suite in selenium-tests/
7. Parse Results          → Generate reports and email
```

### Pipeline Configuration

**Trigger:** GitHub push (via webhook)  
**Credentials Required:**
- Docker Hub credentials (for image pull)
- SMTP credentials (for email notifications)
- MongoDB connection string (in environment)

### Email Notifications

After each build, Jenkins sends an email with:
- Pipeline status (✅ Success / ❌ Failed)
- Stage-by-stage results
- Test summary (total, passed, failed, errors)
- Individual test case results
- Artifact links
- Console output link

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page (index.html) |
| GET | `/api/bugs` | Get all bugs |
| GET | `/api/bugs/:id` | Get specific bug |
| POST | `/api/bugs` | Create new bug |
| PUT | `/api/bugs/:id` | Update bug |
| DELETE | `/api/bugs/:id` | Delete bug |
| GET | `/health` | Health check |

### Example Requests

```bash
# Get all bugs
curl http://localhost:5050/api/bugs

# Create a bug
curl -X POST http://localhost:5050/api/bugs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Login fails",
    "description": "Users cannot login",
    "priority": "high",
    "status": "pending"
  }'

# Update a bug
curl -X PUT http://localhost:5050/api/bugs/607f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"status": "in-progress"}'

# Delete a bug
curl -X DELETE http://localhost:5050/api/bugs/607f1f77bcf86cd799439011

# Health check
curl http://localhost:5050/health
```

---

## ☁️ AWS EC2 Deployment

### Prerequisites
- EC2 instance (t3.micro or larger)
- Security group with inbound rules:
  - Port 22 (SSH)
  - Port 5050 (App)
  - Port 8080 (Jenkins)
- Docker installed on EC2

### Deployment Steps

```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Clone repository
git clone https://github.com/Atasatti/nodejs-bugtracker-cicd.git
cd nodejs-bugtracker-cicd

# Deploy with Docker Compose
docker-compose up -d

# Verify deployment
docker-compose ps
curl http://localhost:5050/health

# View logs
docker-compose logs -f app
```

### Access from Browser
- **Application:** `http://your-ec2-ip:5050`
- **Health Check:** `http://your-ec2-ip:5050/health`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Application
PORT=5050
NODE_ENV=production

# Jenkins (optional, for local testing)
APP_URL=http://localhost:5050
```

**Never commit `.env` to version control** — it's excluded by `.gitignore`

---

## 🐛 Troubleshooting

### Application won't start
```bash
# Check if port 5050 is in use
lsof -i :5050

# Check MongoDB connection
docker-compose logs app | grep -i mongo

# Verify .env file exists and has valid MONGODB_URI
```

### Tests fail with "APP_URL not found"
```bash
# Ensure app is running
curl http://localhost:5050/health

# Run tests with explicit URL
cd selenium-tests
mvn test -DAPP_URL=http://localhost:5050
```

### Jenkins build fails
- Check Jenkins logs: `tail -f /var/log/jenkins/jenkins.log`
- Verify Docker daemon is running: `docker ps`
- Confirm GitHub webhook is configured in repo settings

### Docker image pull fails
```bash
# Login to Docker Hub
docker login

# Retry build
docker-compose build --no-cache
docker-compose up -d
```

---

## 📈 Monitoring & Logs

### Docker Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app

# Last 100 lines
docker-compose logs --tail=100 app
```

### Health Check
```bash
# From host
curl http://localhost:5050/health

# Returns
{"status": "OK", "timestamp": "2025-07-04T12:00:00.000Z"}
```

### Jenkins Pipeline Logs
Access via Jenkins UI → Job → Build → Console Output

---

## 🔄 Git Workflow

### Merging Test Repository

This repository was created by merging two separate repos:
1. **Application repo** - Node.js/Express app
2. **Test repo** - Selenium tests

**Structure maintained:**
- Main app files at root level
- Tests preserved in `selenium-tests/` directory
- Unified Jenkinsfile orchestrates build → test → deploy
- Both git histories preserved with `git subtree`

### Contributing

```bash
# Create feature branch
git checkout -b feature/new-bug-tracking

# Commit changes
git commit -m "Add bug assignment feature"

# Push to origin
git push origin feature/new-bug-tracking

# Create Pull Request on GitHub
# Jenkins pipeline will automatically run on PR
```

---

## 📝 License

MIT License - See LICENSE file for details

---

## 👤 Author

**Afnan Ajmal**  
COMSATS University Student  
DevOps Course (CSC483) - Spring 2025

---

## 🙏 Acknowledgments

- Qasim Malik (Instructor)
- COMSATS University
- Open source communities (Node.js, Express, Selenium, Maven, Jenkins)

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review Jenkins console output
3. Check application logs: `docker-compose logs app`
4. Check test logs: `cat selenium-tests/target/surefire-reports/*.txt`

---

**Last Updated:** July 2025  
**Repository:** nodejs-bugtracker-cicd  
**Status:** Active
