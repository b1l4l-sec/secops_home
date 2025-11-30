import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  posts: {
    getAll: () => axios.get(`${API_URL}/posts`),
    getOne: (id) => axios.get(`${API_URL}/posts/${id}`),
    create: (data) => axios.post(`${API_URL}/posts`, data),
    update: (id, data) => axios.put(`${API_URL}/posts/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/posts/${id}`),
    like: (id) => axios.post(`${API_URL}/posts/${id}/like`)
  },
  events: {
    getAll: () => axios.get(`${API_URL}/events`),
    getOne: (id) => axios.get(`${API_URL}/events/${id}`),
    create: (data) => axios.post(`${API_URL}/events`, data),
    update: (id, data) => axios.put(`${API_URL}/events/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/events/${id}`)
  },
  members: {
    getAll: () => axios.get(`${API_URL}/members`),
    getOne: (id) => axios.get(`${API_URL}/members/${id}`),
    create: (data) => axios.post(`${API_URL}/members`, data),
    update: (id, data) => axios.put(`${API_URL}/members/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/members/${id}`)
  },
  classes: {
    getAll: () => axios.get(`${API_URL}/classes`),
    getOne: (id) => axios.get(`${API_URL}/classes/${id}`),
    create: (data) => axios.post(`${API_URL}/classes`, data),
    update: (id, data) => axios.put(`${API_URL}/classes/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/classes/${id}`)
  },
  contact: {
    getAll: () => axios.get(`${API_URL}/contact`),
    create: (data) => axios.post(`${API_URL}/contact`, data),
    updateStatus: (id, status) => axios.put(`${API_URL}/contact/${id}/status`, { status }),
    delete: (id) => axios.delete(`${API_URL}/contact/${id}`)
  },
  users: {
    getAll: () => axios.get(`${API_URL}/auth/users`),
    updateRole: (id, role) => axios.put(`${API_URL}/auth/users/${id}/role`, { role }),
    delete: (id) => axios.delete(`${API_URL}/auth/users/${id}`)
  },
  ctfs: {
    getAll: () => axios.get(`${API_URL}/ctfs`),
    getOne: (id) => axios.get(`${API_URL}/ctfs/${id}`),
    create: (data) => axios.post(`${API_URL}/ctfs`, data),
    update: (id, data) => axios.put(`${API_URL}/ctfs/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/ctfs/${id}`)
  }
};
