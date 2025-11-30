import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiUser, FiUsers, FiFileText, FiExternalLink } from 'react-icons/fi';
import { api } from '../utils/api';
import './Pages.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.classes.getAll();
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Training Classes</h1>
        <p>Enhance your cybersecurity skills with our training sessions and workshops</p>
      </motion.div>

      <div className="cards-grid">
        {classes.length === 0 ? (
          <p className="no-data">No classes available yet</p>
        ) : (
          classes.map((classItem, index) => (
            <motion.div
              key={classItem._id}
              className="card class-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3>{classItem.title}</h3>
              <div className="card-meta">
                <span>
                  <FiCalendar />
                  {new Date(classItem.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span>
                  <FiClock />
                  {classItem.time}
                </span>
              </div>
              {classItem.instructor && (
                <div className="class-info">
                  <FiUser />
                  <span>Instructor: {classItem.instructor}</span>
                </div>
              )}
              {classItem.location && (
                <div className="class-info">
                  <FiMapPin />
                  <span>{classItem.location}</span>
                </div>
              )}
              {classItem.capacity && (
                <div className="class-info">
                  <FiUsers />
                  <span>Capacity: {classItem.capacity} students</span>
                </div>
              )}
              <p>{classItem.description}</p>
              {(classItem.contentFile || (classItem.contentLinks && classItem.contentLinks.length > 0)) && (
                <div className="class-content">
                  {classItem.contentFile && (
                    <>
                      <h4>Class Materials</h4>
                      <a
                        href={classItem.contentFile.startsWith('/uploads') ? `http://localhost:5000${classItem.contentFile}` : classItem.contentFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="content-file"
                      >
                        <FiFileText />
                        Download Content
                      </a>
                    </>
                  )}
                  {classItem.contentLinks && classItem.contentLinks.length > 0 && (
                    <>
                      <h4>Additional Resources</h4>
                      <div className="content-links">
                        {classItem.contentLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url || link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="content-link"
                          >
                            <FiExternalLink />
                            {link.label || link.url || link}
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Classes;
