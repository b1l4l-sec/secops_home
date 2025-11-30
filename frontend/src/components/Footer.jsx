import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src="/images/CTFs_Enigma.png" alt="SECOPS Logo" className="footer-logo" />
          <h3>SECOPS</h3>
          <p>ENSA Fès Cybersecurity Club</p>
          <p>Building the next generation of security professionals</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/classes">Classes</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><Link to="/members">Members</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/register">Join Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
            <a href="mailto:contact@secops.com">
              <FiMail />
            </a>
          </div>
          <p className="contact-info">
            ENSA Fès, Morocco<br />
            contact@secops.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SECOPS. All rights reserved.</p>
        <p className="created-by">
          Created by <a href="https://github.com/b1l4l-sec" target="_blank" rel="noopener noreferrer">b1l4l</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
