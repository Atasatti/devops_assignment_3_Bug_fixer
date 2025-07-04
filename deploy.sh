#!/bin/bash

# DevOps Task Manager - EC2 Deployment Script
# COMSATS University - Spring 2025 - CSC483

echo "🚀 Starting DevOps Task Manager Deployment"
echo "Student: Afnan Ajmal | Instructor: Qasim Malik"
echo "================================================"

# Stop existing containers
echo "📦 Stopping existing containers..."
docker-compose down --remove-orphans

# Pull latest changes
echo "🔄 Pulling latest changes..."
git pull origin main

# Build and start application
echo "🏗️  Building and starting application..."
docker-compose up -d --build

# Wait for application to start
echo "⏳ Waiting for application to start..."
sleep 10

# Check if application is running
echo "🔍 Checking application status..."
if curl -s http://localhost:5050/health > /dev/null; then
    echo "✅ Application is running successfully!"
    echo "🌐 Access your app at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):5050"
else
    echo "❌ Application failed to start. Check logs:"
    docker-compose logs
    exit 1
fi

echo "================================================"
echo "🎉 Deployment completed successfully!"
echo "📊 View logs: docker-compose logs -f"
echo "🛑 Stop app: docker-compose down" 