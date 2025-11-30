import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiExternalLink } from 'react-icons/fi';
import { api } from '../utils/api';
import './Pages.css';

const CTFs = () => {
  const [ctfs, setCtfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCTFs();
  }, []);

  const fetchCTFs = async () => {
    try {
      const response = await api.ctfs.getAll();
      setCtfs(response.data);
    } catch (error) {
      console.error('Error fetching CTFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = (ctf) => {
    if (ctf.previewType === 'link' && ctf.videoLink) {
      return (
        <a href={ctf.videoLink} target="_blank" rel="noopener noreferrer" className="ctf-link-preview">
          <FiExternalLink />
          <span>Watch CTF Video</span>
        </a>
      );
    } else if (ctf.previewType === 'video' && ctf.preview) {
      return (
        <video
          src={ctf.preview.startsWith('/uploads') ? `http://localhost:5000${ctf.preview}` : ctf.preview}
          controls
          className="card-image"
        />
      );
    } else if (ctf.preview) {
      return (
        <img
          src={ctf.preview.startsWith('/uploads') ? `http://localhost:5000${ctf.preview}` : ctf.preview}
          alt={ctf.title}
          className="card-image"
        />
      );
    }
    return null;
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
        <h1>CTF Previews</h1>
        <p>Check out our Capture The Flag competition previews and highlights</p>
      </motion.div>

      <div className="cards-grid">
        {ctfs.length === 0 ? (
          <p className="no-data">No CTF previews available yet</p>
        ) : (
          ctfs.map((ctf, index) => (
            <motion.div
              key={ctf._id}
              className="card ctf-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {renderPreview(ctf)}
              <h3>{ctf.title}</h3>
              <div className="card-meta">
                <span>
                  <FiUser />
                  {ctf.author}
                </span>
                <span>
                  <FiCalendar />
                  {new Date(ctf.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              {ctf.description && <p>{ctf.description}</p>}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CTFs;
