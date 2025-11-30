import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.posts.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }

    try {
      const response = await api.posts.like(postId);
      setPosts(posts.map(post =>
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
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
    <div className="posts-page container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Club Posts</h1>
        <p>Stay updated with the latest news and announcements from SECOPS</p>
      </motion.div>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <p className="no-data">No posts available yet</p>
        ) : (
          posts.map((post, index) => (
            <motion.article
              key={post._id}
              className="post-card card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {post.image && (
                <img
                  src={post.image.startsWith('/uploads') ? `http://localhost:5000${post.image}` : post.image}
                  alt={post.title}
                  className="post-image"
                />
              )}
              <div className="post-content">
                <h2>{post.title}</h2>
                <div className="post-meta">
                  <span>
                    <FiCalendar />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>{post.content}</p>
                <div className="post-actions">
                  <button
                    className={`like-btn ${user && post.likedBy?.includes(user.id) ? 'liked' : ''}`}
                    onClick={() => handleLike(post._id)}
                    disabled={!user}
                  >
                    <FiHeart />
                    <span>{post.likes} Likes</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
