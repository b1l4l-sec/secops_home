import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { api } from '../utils/api';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response;
      switch (activeTab) {
        case 'posts':
          response = await api.posts.getAll();
          break;
        case 'events':
          response = await api.events.getAll();
          break;
        case 'members':
          response = await api.members.getAll();
          break;
        case 'classes':
          response = await api.classes.getAll();
          break;
        case 'ctfs':
          response = await api.ctfs.getAll();
          break;
        case 'messages':
          response = await api.contact.getAll();
          break;
        case 'users':
          response = await api.users.getAll();
          break;
        default:
          response = { data: [] };
      }
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditItem(null);
    setFormData(getEmptyForm());
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    const editData = { ...item };
    if (activeTab === 'classes' && item.contentLinks) {
      editData.contentLinks = item.contentLinks.map(link =>
        typeof link === 'string' ? { label: link, url: link } : link
      );
    }
    setFormData(editData);
    setImageFile(null);
    setImagePreview(item.image || item.preview || item.contentFile || '');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      switch (activeTab) {
        case 'posts':
          await api.posts.delete(id);
          break;
        case 'events':
          await api.events.delete(id);
          break;
        case 'members':
          await api.members.delete(id);
          break;
        case 'classes':
          await api.classes.delete(id);
          break;
        case 'ctfs':
          await api.ctfs.delete(id);
          break;
        case 'messages':
          await api.contact.delete(id);
          break;
        case 'users':
          await api.users.delete(id);
          break;
      }
      fetchData();
    } catch (error) {
      alert('Failed to delete item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let requestData;

      if (activeTab === 'posts' || activeTab === 'events' || activeTab === 'classes' || activeTab === 'ctfs') {
        requestData = new FormData();
        Object.keys(formData).forEach(key => {
          if (key === 'contentLinks' && Array.isArray(formData[key])) {
            requestData.append(key, JSON.stringify(formData[key]));
          } else if (formData[key]) {
            requestData.append(key, formData[key]);
          }
        });
        if (imageFile) {
          if (activeTab === 'ctfs') {
            requestData.append('preview', imageFile);
          } else if (activeTab === 'classes') {
            requestData.append('contentFile', imageFile);
          } else {
            requestData.append('image', imageFile);
          }
        }
      } else {
        requestData = formData;
      }

      if (editItem) {
        switch (activeTab) {
          case 'posts':
            await api.posts.update(editItem._id, requestData);
            break;
          case 'events':
            await api.events.update(editItem._id, requestData);
            break;
          case 'members':
            await api.members.update(editItem._id, formData);
            break;
          case 'classes':
            await api.classes.update(editItem._id, requestData);
            break;
          case 'ctfs':
            await api.ctfs.update(editItem._id, requestData);
            break;
        }
      } else {
        switch (activeTab) {
          case 'posts':
            await api.posts.create(requestData);
            break;
          case 'events':
            await api.events.create(requestData);
            break;
          case 'members':
            await api.members.create(formData);
            break;
          case 'classes':
            await api.classes.create(requestData);
            break;
          case 'ctfs':
            await api.ctfs.create(requestData);
            break;
        }
      }
      setShowModal(false);
      setImageFile(null);
      setImagePreview('');
      fetchData();
    } catch (error) {
      alert('Failed to save item');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getEmptyForm = () => {
    switch (activeTab) {
      case 'posts':
        return { title: '', content: '' };
      case 'events':
        return { title: '', description: '', date: '', location: '' };
      case 'members':
        return { name: '', role: '', image: '', bio: '', linkedin: '', github: '' };
      case 'classes':
        return { title: '', description: '', instructor: '', date: '', time: '', location: '', capacity: '', contentLinks: [], linkLabels: [], linkUrls: [] };
      case 'ctfs':
        return { title: '', author: '', previewType: 'image', videoLink: '', description: '' };
      default:
        return {};
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <>
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Content</label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows="6"
                required
              />
            </div>
            <div className="input-group">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img src={imagePreview.startsWith('/uploads') ? `http://localhost:5000${imagePreview}` : imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
              )}
            </div>
          </>
        );
      case 'events':
        return (
          <>
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                required
              />
            </div>
            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img src={imagePreview.startsWith('/uploads') ? `http://localhost:5000${imagePreview}` : imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
              )}
            </div>
          </>
        );
      case 'members':
        return (
          <>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Role</label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Bio</label>
              <textarea
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows="3"
              />
            </div>
            <div className="input-group">
              <label>Image URL</label>
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>LinkedIn URL</label>
              <input
                type="text"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>GitHub URL</label>
              <input
                type="text"
                value={formData.github || ''}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
            </div>
          </>
        );
      case 'classes':
        return (
          <>
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                required
              />
            </div>
            <div className="input-group">
              <label>Instructor</label>
              <input
                type="text"
                value={formData.instructor || ''}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Time</label>
              <input
                type="time"
                value={formData.time || ''}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>Capacity</label>
              <input
                type="number"
                value={formData.capacity || ''}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>Content File (PPTX/PDF)</label>
              <input
                type="file"
                accept=".pptx,.ppt,.pdf"
                onChange={handleImageChange}
              />
            </div>
            <div className="input-group">
              <label>Content File (PPTX/PDF) - Current: {editItem?.contentFile ? 'Uploaded' : 'None'}</label>
              {editItem?.contentFile && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setFormData({ ...formData, contentFile: '' });
                    setImageFile(null);
                  }}
                  style={{ marginBottom: '10px' }}
                >
                  Clear File
                </button>
              )}
            </div>
            <div className="input-group">
              <label>Additional Resources</label>
              <div style={{ marginBottom: '10px' }}>
                <small>Add links with labels (click + to add more)</small>
              </div>
              {(formData.contentLinks || []).map((link, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="Label (e.g., Course Notes)"
                    value={link.label || ''}
                    onChange={(e) => {
                      const newLinks = [...(formData.contentLinks || [])];
                      newLinks[idx] = { ...newLinks[idx], label: e.target.value };
                      setFormData({ ...formData, contentLinks: newLinks });
                    }}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={link.url || ''}
                    onChange={(e) => {
                      const newLinks = [...(formData.contentLinks || [])];
                      newLinks[idx] = { ...newLinks[idx], url: e.target.value };
                      setFormData({ ...formData, contentLinks: newLinks });
                    }}
                    style={{ flex: 2 }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      const newLinks = formData.contentLinks.filter((_, i) => i !== idx);
                      setFormData({ ...formData, contentLinks: newLinks });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const newLinks = [...(formData.contentLinks || []), { label: '', url: '' }];
                  setFormData({ ...formData, contentLinks: newLinks });
                }}
              >
                + Add Link
              </button>
            </div>
          </>
        );
      case 'ctfs':
        return (
          <>
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Author</label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Preview Type</label>
              <select
                value={formData.previewType || 'image'}
                onChange={(e) => setFormData({ ...formData, previewType: e.target.value })}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="link">Link</option>
              </select>
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                placeholder="Add a description for this CTF..."
              />
            </div>
            {formData.previewType === 'link' ? (
              <div className="input-group">
                <label>Video Link URL</label>
                <input
                  type="text"
                  value={formData.videoLink || ''}
                  onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>
            ) : (
              <div className="input-group">
                <label>Upload {formData.previewType === 'video' ? 'Video' : 'Image'}</label>
                <input
                  type="file"
                  accept={formData.previewType === 'video' ? 'video/*' : 'image/*'}
                  onChange={handleImageChange}
                />
                {imagePreview && formData.previewType === 'image' && (
                  <img src={imagePreview.startsWith('/uploads') ? `http://localhost:5000${imagePreview}` : imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                )}
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Admin Dashboard</h1>
          <p>Manage your SECOPS content</p>
        </motion.div>

        <div className="admin-tabs">
          {['posts', 'events', 'members', 'classes', 'ctfs', 'messages', 'users'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="admin-content">
          {activeTab !== 'messages' && activeTab !== 'users' && (
            <button className="btn btn-primary add-btn" onClick={handleAdd}>
              <FiPlus /> Add New
            </button>
          )}

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="admin-table">
              {activeTab === 'users' ? (
                <div className="users-list">
                  {data.length === 0 ? (
                    <p className="no-data">No users</p>
                  ) : (
                    data.map((userItem) => (
                      <div key={userItem._id} className="user-card card">
                        <div className="user-header">
                          <h3>{userItem.name}</h3>
                          <span className={`badge ${userItem.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                            {userItem.role}
                          </span>
                        </div>
                        <p className="user-email">{userItem.email}</p>
                        <div className="user-actions">
                          <select
                            value={userItem.role}
                            onChange={async (e) => {
                              try {
                                await api.users.updateRole(userItem._id, e.target.value);
                                fetchData();
                              } catch (error) {
                                alert('Failed to update role');
                              }
                            }}
                            className="role-select"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(userItem._id)}
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : activeTab === 'messages' ? (
                <div className="messages-list">
                  {data.length === 0 ? (
                    <p className="no-data">No messages</p>
                  ) : (
                    data.map((message) => (
                      <div key={message._id} className="message-card card">
                        <div className="message-header">
                          <h3>{message.name}</h3>
                          <span className={`status ${message.status}`}>{message.status}</span>
                        </div>
                        <p className="message-email">{message.email}</p>
                        <p className="message-text">{message.message}</p>
                        <div className="message-footer">
                          <span className="message-date">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(message._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Title/Name</th>
                      <th>Details</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="no-data">No items found</td>
                      </tr>
                    ) : (
                      data.map((item) => (
                        <tr key={item._id}>
                          <td>{item.title || item.name}</td>
                          <td>
                            {activeTab === 'posts' && item.content?.substring(0, 50) + '...'}
                            {activeTab === 'events' && new Date(item.date).toLocaleDateString()}
                            {activeTab === 'members' && item.role}
                            {activeTab === 'classes' && `${new Date(item.date).toLocaleDateString()} - ${item.time}`}
                            {activeTab === 'ctfs' && item.author}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleEdit(item)}
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(item._id)}
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <motion.div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header">
              <h2>{editItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              {renderForm()}
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
