import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiTarget, FiTrendingUp, FiAward } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [membersRes, eventsRes] = await Promise.all([
        api.members.getAll(),
        api.events.getAll()
      ]);
      setMembers(membersRes.data.slice(0, 4));
      setEvents(eventsRes.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <FiShield />,
      title: 'Cybersecurity Training',
      description: 'Hands-on training in penetration testing, threat analysis, and security operations'
    },
    {
      icon: <FiTarget />,
      title: 'CTF Competitions',
      description: 'Regular Capture The Flag challenges to sharpen your hacking skills'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Skill Development',
      description: 'Workshops and bootcamps covering the latest security tools and techniques'
    },
    {
      icon: <FiAward />,
      title: 'Certifications',
      description: 'Prepare for industry certifications and build your professional portfolio'
    }
  ];

  return (
    <div className="home">
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to <span className="highlight">SECOPS</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            ENSA Fès Cybersecurity Club - Building the Future of Security
          </motion.p>
          <motion.p
            className="hero-description"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Join us in exploring the world of cybersecurity, ethical hacking, and information security.
            Learn, compete, and grow with fellow security enthusiasts.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {!user && <Link to="/register" className="btn btn-primary">Join SECOPS</Link>}
            <Link to="/events" className="btn btn-secondary">Upcoming Events</Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="features container">
        <h2>What We Offer</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="achievements container">
        <h2>Our Achievements</h2>
        <div className="achievements-grid">
          <motion.div
            className="achievement-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>50+</h3>
            <p>Active Members</p>
          </motion.div>
          <motion.div
            className="achievement-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3>30+</h3>
            <p>Events Organized</p>
          </motion.div>
          <motion.div
            className="achievement-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3>15+</h3>
            <p>CTF Competitions</p>
          </motion.div>
          <motion.div
            className="achievement-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3>100+</h3>
            <p>Training Hours</p>
          </motion.div>
        </div>
      </section>

      {events.length > 0 && (
        <section className="recent-events container">
          <h2>Upcoming Events</h2>
          <div className="events-grid">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                className="event-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {event.image && (
                  <img
                    src={event.image.startsWith('/uploads') ? `http://localhost:5000${event.image}` : event.image}
                    alt={event.title}
                  />
                )}
                <h3>{event.title}</h3>
                <p className="event-date">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p>{event.description.substring(0, 100)}...</p>
              </motion.div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/events" className="btn btn-primary">View All Events</Link>
          </div>
        </section>
      )}

      {members.length > 0 && (
        <section className="team-preview container">
          <h2>Meet Our Team</h2>
          <div className="members-grid">
            {members.map((member, index) => (
              <motion.div
                key={member._id}
                className="member-card card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {member.image && (
                  <img src={member.image} alt={member.name} />
                )}
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </motion.div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/members" className="btn btn-primary">View All Members</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
