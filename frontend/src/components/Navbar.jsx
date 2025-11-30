import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiFileText, FiCalendar, FiUsers, FiBook, FiMail, FiLogOut, FiSettings, FiFlag, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/CTFs_Enigma.png" alt="SECOPS Logo" />
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
              <FiHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/posts" className={isActive('/posts') ? 'active' : ''} onClick={closeMenu}>
              <FiFileText />
              <span>Posts</span>
            </Link>
          </li>
          <li>
            <Link to="/events" className={isActive('/events') ? 'active' : ''} onClick={closeMenu}>
              <FiCalendar />
              <span>Events</span>
            </Link>
          </li>
          <li>
            <Link to="/classes" className={isActive('/classes') ? 'active' : ''} onClick={closeMenu}>
              <FiBook />
              <span>Classes</span>
            </Link>
          </li>
          <li>
            <Link to="/members" className={isActive('/members') ? 'active' : ''} onClick={closeMenu}>
              <FiUsers />
              <span>Members</span>
            </Link>
          </li>
          <li>
            <Link to="/ctfs" className={isActive('/ctfs') ? 'active' : ''} onClick={closeMenu}>
              <FiFlag />
              <span>CTFs</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMenu}>
              <FiMail />
              <span>Contact</span>
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="user-name">Welcome, {user.name}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="btn btn-secondary">
                  <FiSettings />
                  <span>Admin</span>
                </Link>
              )}
              <button onClick={logout} className="btn btn-primary">
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
