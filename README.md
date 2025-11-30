# SECOPS - ENSA Fès Cybersecurity Club Website

A modern, full-stack website for the SECOPS cybersecurity club at ENSA de Fès, Morocco. Built with React, Express.js, and MongoDB.

## Features

- **User Authentication**: Registration and login with JWT-based authentication
- **Role-Based Access**: Admin and regular user roles with different permissions
- **Posts System**: Create, view, and like posts (admin can manage)
- **Events Management**: Display upcoming and past cybersecurity events
- **Training Classes**: Showcase workshops and training sessions
- **Member Profiles**: Display club members with social links
- **Contact Form**: Allow visitors to send messages to the club
- **Admin Dashboard**: Complete CRUD operations for all content
- **Responsive Design**: Mobile-friendly dark theme with smooth animations

## Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Framer Motion** for animations
- **React Icons** for icons
- **Axios** for API calls
- **Dark theme** with black (#000000) and blue (#00b4d8) color scheme

### Backend
- **Express.js** REST API
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled

## Project Structure

```
.
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Express server
│   └── .env            # Environment variables
│
└── frontend/
    ├── public/
    │   └── images/      # Static assets (logos, images)
    ├── src/
    │   ├── components/  # Reusable components (Navbar, Footer)
    │   ├── context/     # React Context (Auth)
    │   ├── pages/       # Page components
    │   ├── utils/       # API utilities
    │   ├── App.jsx      # Main app component
    │   └── main.jsx     # Entry point
    └── index.html
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd secops-website
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB connection string
# MONGO_URI=mongodb://localhost:27017/secops
# JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
# PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

### 4. Add Your Logo and Images

Place your `CTFs_Enigma.png` logo and other images in:
```
frontend/public/images/
```

## Running the Application

### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod
```

Or use a cloud MongoDB service like MongoDB Atlas and update your connection string in `.env`.

### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### Build for Production
```bash
cd frontend
npm run build
```

## Default Admin Account

To create an admin account, first register a normal user through the website, then manually update the user's role in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post (admin only)
- `PUT /api/posts/:id` - Update post (admin only)
- `DELETE /api/posts/:id` - Delete post (admin only)
- `POST /api/posts/:id/like` - Like/unlike post (requires auth)

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create member (admin only)
- `PUT /api/members/:id` - Update member (admin only)
- `DELETE /api/members/:id` - Delete member (admin only)

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create class (admin only)
- `PUT /api/classes/:id` - Update class (admin only)
- `DELETE /api/classes/:id` - Delete class (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

## Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/secops
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
PORT=5000
```

## Features Breakdown

### For Regular Users
- Browse posts and like them
- View events, classes, and members
- Submit contact form
- Register and login

### For Admins
- All user features
- Access to admin dashboard
- Create, edit, and delete posts
- Create, edit, and delete events
- Create, edit, and delete members
- Create, edit, and delete classes
- View and delete contact messages

## Design Philosophy

- **Dark Theme**: Professional black background with blue accents
- **Smooth Animations**: Framer Motion for entrance and hover effects
- **Responsive**: Mobile-first design approach
- **Modern UI**: Clean, minimalist interface with card-based layouts
- **Performance**: Optimized loading and rendering

## Customization

### Colors
Edit `frontend/src/index.css` to change the color scheme:
```css
:root {
  --black: #000000;
  --blue: #00b4d8;
  --dark-blue: #0096c7;
  --light-blue: #48cae4;
  /* ... */
}
```

### Logo
Replace `/frontend/public/images/CTFs_Enigma.png` with your logo.

## Dependencies

### Backend
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.0",
  "bcryptjs": "^3.0.2",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "nodemon": "^3.1.10" (dev)
}
```

### Frontend
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.3",
  "axios": "^1.7.9",
  "framer-motion": "^11.18.0",
  "react-icons": "^5.4.0"
}
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity

### CORS Errors
- Backend CORS is configured to allow all origins
- Check if backend is running on correct port

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET is set in backend .env
- Verify token expiration (default 7 days)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

SECOPS - ENSA Fès Cybersecurity Club
- Email: contact@secops.com
- Location: ENSA Fès, Morocco

---

Built with passion by the SECOPS team
