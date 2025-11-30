import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { api } from '../utils/api';
import './Pages.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.members.getAll();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
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
        <h1>Our Team</h1>
        <p>Meet the passionate individuals behind SECOPS</p>
      </motion.div>

      <div className="members-grid">
        {members.length === 0 ? (
          <p className="no-data">No members available yet</p>
        ) : (
          members.map((member, index) => (
            <motion.div
              key={member._id}
              className="member-card card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              {member.image && (
                <img src={member.image} alt={member.name} className="member-image" />
              )}
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              {member.bio && (
                <p className="member-bio">{member.bio}</p>
              )}
              {(member.github || member.linkedin) && (
                <div className="member-social">
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <FiGithub />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <FiLinkedin />
                    </a>
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

export default Members;
