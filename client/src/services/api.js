import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://52.8.193.15:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

console.log('API URL =', api.defaults.baseURL);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication
export const login = (credentials) =>
  api.post('/auth/login', credentials);

export const register = (credentials) =>
  api.post('/auth/register', credentials);

export const verifyIdentity = (username, phone) =>
  api.post('/auth/verify-identity', { username, phone });

export const resetPassword = (resetToken, newPassword) =>
  api.post('/auth/reset-password', { resetToken, newPassword });

// Buyers
export const fetchBuyers = () =>
  api.get('/buyers');

export const getBuyerById = (id) =>
  api.get(`/buyers/${id}`);

export const addBuyer = (payload) =>
  api.post('/buyers', payload);

export const updateBuyer = (id, payload) =>
  api.put(`/buyers/${id}`, payload);

export const deleteBuyer = (id) =>
  api.delete(`/buyers/${id}`);

export default api;
