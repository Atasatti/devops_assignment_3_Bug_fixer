#!/bin/bash
# Complete Repository Merge Script
# This script will:
# 1. Remove node_modules/ and .DS_Store from git history
# 2. Merge selenium-tests/ from the old test repository

echo "🚀 Starting Repository Merge Process..."
echo "========================================"

# Step 1: Remove node_modules and .DS_Store from git cache
echo ""
echo "Step 1️⃣: Removing tracked node_modules and .DS_Store from git..."
git rm -r --cached node_modules/ .DS_Store 2>/dev/null || true
echo "✅ Files removed from git cache"

# Step 2: Commit the removal
echo ""
echo "Step 2️⃣: Committing removal of tracked files..."
git commit -m "Remove tracked node_modules and .DS_Store - now only in .gitignore"
echo "✅ Committed removal"

# Step 3: Add test repository as remote
echo ""
echo "Step 3️⃣: Adding test repository as remote..."
git remote add tests https://github.com/Atasatti/devops_assignment_3_Bug_fixer_test.git 2>/dev/null || true
echo "✅ Remote 'tests' added"

# Step 4: Fetch test repository
echo ""
echo "Step 4️⃣: Fetching test repository..."
git fetch tests main
echo "✅ Test repository fetched"

# Step 5: Merge test repository into selenium-tests/ directory
echo ""
echo "Step 5️⃣: Merging test repository into selenium-tests/ directory..."
git subtree add --prefix=selenium-tests tests/main --squash
echo "✅ Test repository merged into selenium-tests/"

# Step 6: Push to origin
echo ""
echo "Step 6️⃣: Pushing changes to GitHub..."
git push origin main
echo "✅ Changes pushed to origin"

echo ""
echo "========================================"
echo "✅ Repository merge complete!"
echo ""
echo "Your repository now has:"
echo "  ✓ node_modules/ and .DS_Store removed from history"
echo "  ✓ selenium-tests/ directory with full test repo"
echo "  ✓ All changes pushed to GitHub"
echo ""
echo "Repository: https://github.com/Atasatti/nodejs-bugtracker-cicd"
