#!/bin/bash

# SECOPS Website Quick Start Script
# This script helps you get started quickly

echo "🔒 SECOPS Website Setup"
echo "======================="
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB..."
if pgrep -x "mongod" > /dev/null
then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB is not running!"
    echo "   Start it with: mongod"
    echo ""
    read -p "Press Enter to continue anyway, or Ctrl+C to exit..."
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Make sure MongoDB is running:"
echo "   mongod"
echo ""
echo "2. Start the backend (in one terminal):"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start the frontend (in another terminal):"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "5. Register an account"
echo ""
echo "6. Make yourself admin in MongoDB:"
echo "   db.users.updateOne({email: 'your@email.com'}, {\$set: {role: 'admin'}})"
echo ""
echo "📖 For detailed instructions, see:"
echo "   - IMPORTANT_NOTES.md"
echo "   - SETUP_GUIDE.md"
echo "   - README.md"
echo ""
echo "Good luck! 🎉"
