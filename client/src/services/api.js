// ...existing code...
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => {
  return api.post('/auth/login', credentials); // ✅ Correct endpoint
};

export const register = (credentials) => {
  // credentials: { username, password, phone }
  return api.post('/auth/register', credentials);
};

// Password reset via username + registered phone number (no SMS/OTP)
export const verifyIdentity = (username, phone) => api.post('/auth/verify-identity', { username, phone });
export const resetPassword = (resetToken, newPassword) => api.post('/auth/reset-password', { resetToken, newPassword });
export const fetchBuyers = () => api.get('/buyers');
export const getBuyerById = (id) => api.get(`/buyers/${id}`);
export const addBuyer = (payload) => api.post('/buyers', payload);
export const updateBuyer = (id, payload) => api.put(`/buyers/${id}`, payload);
export const deleteBuyer = (id) => api.delete(`/buyers/${id}`);

export default api;
// ...existing code...