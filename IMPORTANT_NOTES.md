# ⚠️ Important Notes Before Running

## 1. Add Your Logo

**CRITICAL**: Replace the placeholder logo with your actual CTFs_Enigma logo.

Location: `frontend/public/images/CTFs_Enigma.png`

Current file is a simple SVG placeholder. Replace it with your actual logo image.

## 2. MongoDB Setup

You MUST have MongoDB running before starting the backend.

### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# Then run:
mongod
```

### Option B: MongoDB Atlas (Recommended)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update in `backend/.env`

## 3. Environment Variables

The `backend/.env` file is created but you should:
1. Change the JWT_SECRET to something secure
2. Update MONGO_URI if using cloud MongoDB

## 4. Create Admin Account

After first run:
1. Register through the website
2. Open MongoDB
3. Find your user in `users` collection
4. Change `role: "user"` to `role: "admin"`
5. Logout and login again

## 5. Add Images for Content

When adding posts, events, or members through admin dashboard:
- Upload images to `frontend/public/images/`
- Reference them as `/images/your-image.png`
- Or use external URLs (like Imgur, Cloudinary)

## 6. Running Order

Always start in this order:
1. Start MongoDB (if local)
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm run dev`

## 7. First Time Setup Checklist

- [ ] MongoDB installed and running
- [ ] Backend dependencies installed: `cd backend && npm install`
- [ ] Frontend dependencies installed: `cd frontend && npm install`
- [ ] Environment variables configured in `backend/.env`
- [ ] Your logo placed in `frontend/public/images/CTFs_Enigma.png`
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Created and tested user registration
- [ ] Promoted user to admin in MongoDB
- [ ] Tested admin dashboard access

## 8. Common First-Time Issues

### "Cannot connect to MongoDB"
→ Make sure MongoDB is running: `mongod`

### "Port 5000 already in use"
→ Change PORT in `backend/.env` to 5001 or another port

### "Admin button not showing"
→ Make sure you changed role to "admin" in MongoDB and logged in again

### "Images not loading"
→ Make sure images are in `frontend/public/images/` folder
→ Reference them as `/images/filename.png` in admin forms

## 9. Security Reminder

Before deploying to production:
- [ ] Change JWT_SECRET to a strong, random string
- [ ] Don't commit `.env` file to git
- [ ] Use environment variables in production
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS in production
- [ ] Review CORS settings

## 10. Quick Start Commands

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Then open: http://localhost:5173

## Need Help?

Refer to:
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Step-by-step setup
- `PROJECT_SUMMARY.md` - Project overview

---

**Remember**: The website won't work without MongoDB running!
