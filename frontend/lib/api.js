import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Read CSRF token from cookie (best effort)
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Attach CSRF token to unsafe requests
api.interceptors.request.use((config) => {
  const method = (config.method || 'get').toLowerCase();
  if (['post', 'put', 'patch', 'delete'].includes(method)) {
    const csrftoken = getCookie('csrftoken');
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken;
    }
  }
  return config;
});

export default api;

export const getList = (endpoint) => api.get(`${endpoint}/`);
export const getOne = (endpoint, id) => api.get(`${endpoint}/${id}/`);
export const createOne = (endpoint, data) => api.post(`${endpoint}/`, data);
export const updateOne = (endpoint, id, data) => api.put(`${endpoint}/${id}/`, data);
export const deleteOne = (endpoint, id) => api.delete(`${endpoint}/${id}/`);