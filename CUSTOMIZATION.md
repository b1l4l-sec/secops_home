# Customization Guide

This guide shows you how to customize the SECOPS website for your needs.

## 🎨 Essential Customizations

### 1. Replace the Logo
**Required**: The current logo is a placeholder SVG.

**Location**: `frontend/public/images/CTFs_Enigma.png`

**Steps**:
1. Prepare your logo (recommended: PNG, 200x200px or larger)
2. Name it `CTFs_Enigma.png`
3. Replace the file at `frontend/public/images/CTFs_Enigma.png`

The logo appears in:
- Navbar (top left)
- Footer
- Login page
- Register page

### 2. Update Club Information

**Footer Component**: `frontend/src/components/Footer.jsx`

Change:
```jsx
<p>ENSA Fès, Morocco<br />contact@secops.com</p>
```

**Contact Page**: `frontend/src/pages/Contact.jsx`

Update location, email, and phone:
```jsx
<p>ENSA Fès, Morocco</p>
<p>contact@secops.com</p>
<p>+212 XXX-XXXXXX</p>
```

### 3. Social Media Links

**Footer Component**: `frontend/src/components/Footer.jsx`

Update these URLs:
```jsx
<a href="https://github.com">           // Your GitHub
<a href="https://linkedin.com">         // Your LinkedIn
<a href="https://twitter.com">          // Your Twitter
<a href="mailto:contact@secops.com">    // Your Email
```

## 🎨 Optional Customizations

### Change Color Scheme

**File**: `frontend/src/index.css`

Current colors:
```css
:root {
  --black: #000000;      /* Background */
  --blue: #00b4d8;       /* Primary accent */
  --dark-blue: #0096c7;  /* Hover state */
  --light-blue: #48cae4; /* Light accent */
  --gray: #1a1a1a;       /* Card background */
  --light-gray: #2a2a2a; /* Input background */
  --text-gray: #a0a0a0;  /* Secondary text */
  --white: #ffffff;      /* Primary text */
}
```

To change the theme:
1. Pick new colors
2. Update these variables
3. The entire site will update automatically

### Modify Home Page Content

**File**: `frontend/src/pages/Home.jsx`

**Hero Section**:
```jsx
<h1>Welcome to <span className="highlight">SECOPS</span></h1>
<p className="hero-subtitle">
  ENSA Fès Cybersecurity Club - Building the Future of Security
</p>
```

**Features Section**:
Edit the `features` array:
```jsx
const features = [
  {
    icon: <FiShield />,
    title: 'Your Title',
    description: 'Your description'
  },
  // Add more features...
];
```

**Achievements**:
```jsx
<div className="achievement-card">
  <h3>50+</h3>          // Change number
  <p>Active Members</p>  // Change label
</div>
```

### Change Typography

**File**: `frontend/index.html`

Current font: Inter from Google Fonts

To change:
```html
<link href="https://fonts.googleapis.com/css2?family=Your-Font:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Then update in `frontend/src/index.css`:
```css
body {
  font-family: 'Your-Font', sans-serif;
}
```

### Add New Pages

1. Create component in `frontend/src/pages/NewPage.jsx`
2. Create styles in `frontend/src/pages/NewPage.css`
3. Add route in `frontend/src/App.jsx`:
```jsx
<Route path="/newpage" element={<NewPage />} />
```
4. Add link in Navbar if needed

### Modify API URLs

**Development** (default):
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

**Production**:
Update `frontend/src/utils/api.js`:
```javascript
const API_URL = 'https://your-domain.com/api';
```

### Change Port Numbers

**Backend**: Edit `backend/.env`
```env
PORT=5000  # Change to any available port
```

**Frontend**: Vite will auto-assign if port is taken

### Customize Database Name

**Backend**: Edit `backend/.env`
```env
MONGO_URI=mongodb://localhost:27017/your_database_name
```

## 🔧 Advanced Customizations

### Add New Database Models

1. Create model in `backend/models/YourModel.js`
2. Create routes in `backend/routes/yourroute.js`
3. Register in `backend/server.js`:
```javascript
app.use('/api/yourroute', require('./routes/yourroute'));
```
4. Add API calls in `frontend/src/utils/api.js`
5. Create page to display data

### Modify Admin Dashboard

**File**: `frontend/src/pages/Admin.jsx`

Add new tab:
```jsx
<button
  className={`tab-btn ${activeTab === 'newtab' ? 'active' : ''}`}
  onClick={() => setActiveTab('newtab')}
>
  New Tab
</button>
```

Add case in fetchData and renderForm functions.

### Add Email Notifications

Install nodemailer in backend:
```bash
cd backend
npm install nodemailer
```

Create email service and integrate with contact form.

### Add File Upload

For images, use:
- Cloudinary (recommended)
- AWS S3
- Local storage with multer

Install in backend:
```bash
npm install multer cloudinary
```

### Add Search Functionality

Add search bar to pages:
```jsx
const [search, setSearch] = useState('');
const filtered = items.filter(item =>
  item.title.toLowerCase().includes(search.toLowerCase())
);
```

### Add Pagination

For large datasets, add pagination:
```jsx
const [page, setPage] = useState(1);
const perPage = 10;
const start = (page - 1) * perPage;
const end = start + perPage;
const paginated = items.slice(start, end);
```

## 📱 Mobile App

The website is mobile-responsive, but if you want a native app:
- Use React Native with same backend
- API endpoints are ready
- Auth system works the same

## 🌐 Internationalization

To add multiple languages:
1. Install i18next: `npm install react-i18next i18next`
2. Create translation files
3. Wrap strings with translation function
4. Add language selector in Navbar

## 🔒 Additional Security

### Add Rate Limiting

```bash
cd backend
npm install express-rate-limit
```

In `server.js`:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
```

### Add Helmet.js

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 📊 Analytics

### Add Google Analytics

In `frontend/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Performance Optimization

### Enable Lazy Loading

```jsx
import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./pages/Admin'));

<Suspense fallback={<div className="loading"><div className="spinner"></div></div>}>
  <Route path="/admin" element={<Admin />} />
</Suspense>
```

### Optimize Images

1. Use WebP format
2. Compress images
3. Use CDN
4. Add lazy loading to images

### Code Splitting

Vite does this automatically, but you can optimize further with dynamic imports.

## 📝 Content Management

### Add Rich Text Editor

For admin dashboard, use:
- React Quill
- Draft.js
- TinyMCE

Install:
```bash
npm install react-quill
```

Use in admin forms for better content editing.

## 🎨 Theme Switcher

Add light/dark theme toggle:
1. Create ThemeContext
2. Store preference in localStorage
3. Toggle CSS variables
4. Add switch in Navbar

## 💾 Backup & Restore

Setup MongoDB backups:
```bash
# Backup
mongodump --db secops --out /path/to/backup

# Restore
mongorestore --db secops /path/to/backup/secops
```

---

Remember: Test all customizations in development before deploying to production!
