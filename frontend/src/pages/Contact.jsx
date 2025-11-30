import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiMessageSquare, FiMapPin, FiPhone } from 'react-icons/fi';
import { api } from '../utils/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      await api.contact.create(formData);
      setSuccess('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Contact Us</h1>
          <p>Have questions? We'd love to hear from you</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2>Get In Touch</h2>
            <p>Feel free to reach out to us for any inquiries, collaborations, or just to say hello!</p>

            <div className="info-item">
              <FiMapPin />
              <div>
                <h3>Location</h3>
                <p>ENSA Fès, Morocco</p>
              </div>
            </div>

            <div className="info-item">
              <FiMail />
              <div>
                <h3>Email</h3>
                <p>contact@secops.com</p>
              </div>
            </div>

            <div className="info-item">
              <FiPhone />
              <div>
                <h3>Phone</h3>
                <p>+212 XXX-XXXXXX</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="input-group">
              <label htmlFor="name">
                <FiUser /> Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">
                <FiMail /> Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="message">
                <FiMessageSquare /> Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you're thinking about..."
                rows="6"
                required
              />
            </div>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
