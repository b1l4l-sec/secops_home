# SECOPS Website - Quick Setup Guide

## Step 1: Prerequisites

Before you start, make sure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - Local MongoDB - [Download here](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)

## Step 2: Install Dependencies

Open your terminal and run:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 3: Configure MongoDB

### Option A: Local MongoDB

1. Start MongoDB:
   ```bash
   mongod
   ```

2. Update `backend/.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/secops
   JWT_SECRET=your_super_secret_key_change_this
   PORT=5000
   ```

### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (free tier available)
3. Get your connection string
4. Update `backend/.env`:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/secops
   JWT_SECRET=your_super_secret_key_change_this
   PORT=5000
   ```

## Step 4: Add Your Assets

Place your logo and images in:
```
frontend/public/images/
```

Required:
- `CTFs_Enigma.png` - Your club logo

Optional:
- Event images
- Member photos
- Post images

## Step 5: Run the Application

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

## Step 6: Create Admin Account

1. Open http://localhost:5173 in your browser
2. Click "Register" and create an account
3. Open MongoDB (Compass or shell)
4. Find your user in the `users` collection
5. Change the `role` field from `"user"` to `"admin"`

### Using MongoDB Compass:
1. Open MongoDB Compass
2. Connect to your database
3. Navigate to `secops` database → `users` collection
4. Find your user and edit the document
5. Change `"role": "user"` to `"role": "admin"`
6. Save changes

### Using MongoDB Shell:
```javascript
use secops
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Step 7: Access Admin Dashboard

1. Logout and login again
2. You'll see an "Admin" button in the navbar
3. Click it to access the admin dashboard
4. Start managing your content!

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your connection string in `.env`
- Verify your IP is whitelisted (if using Atlas)

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will auto-assign a new port

### CORS Errors
- Make sure backend is running
- Check backend console for errors
- Verify API URL in `frontend/src/utils/api.js`

### Admin Features Not Showing
- Make sure you changed the role to "admin" in MongoDB
- Logout and login again
- Check browser console for errors

## Next Steps

1. **Add Content**: Use the admin dashboard to add posts, events, members, and classes
2. **Customize Design**: Edit colors in `frontend/src/index.css`
3. **Add Images**: Upload your assets to `frontend/public/images/`
4. **Test Features**: Try all functionality (posts, likes, contact form, etc.)
5. **Deploy**: When ready, build for production with `npm run build`

## Need Help?

Check the main README.md for:
- Detailed API documentation
- Full feature list
- Customization options
- Deployment guide

## Quick Reference

### URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API: http://localhost:5000/api

### Default Credentials
Create your own through the registration page, then promote to admin in MongoDB.

### Important Files
- `backend/.env` - Backend configuration
- `backend/server.js` - Main server file
- `frontend/src/App.jsx` - Main React app
- `frontend/src/utils/api.js` - API endpoints

---

Good luck with your SECOPS website! 🔒
