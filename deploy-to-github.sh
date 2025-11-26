#!/bin/bash

echo "========================================"
echo "  Deploy to GitHub - Dong Tay Dai Chien"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding files..."
git add .

# Commit
echo "Committing changes..."
git commit -m "Update: Dong Tay Dai Chien game"

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo ""
    echo "========================================"
    echo "  Setup GitHub Remote"
    echo "========================================"
    echo ""
    read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): " GITHUB_URL
    git remote add origin "$GITHUB_URL"
fi

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  SUCCESS! Code đã được push lên GitHub"
    echo "========================================"
else
    echo ""
    echo "========================================"
    echo "  ERROR: Không thể push lên GitHub"
    echo "  Kiểm tra lại GitHub URL và credentials"
    echo "========================================"
fi


