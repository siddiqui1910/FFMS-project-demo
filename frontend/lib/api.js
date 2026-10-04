import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send Django session cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// Small helpers for common patterns
export const getList = (endpoint) => api.get(`${endpoint}/`);
export const getOne = (endpoint, id) => api.get(`${endpoint}/${id}/`);
export const createOne = (endpoint, data) => api.post(`${endpoint}/`, data);
export const updateOne = (endpoint, id, data) => api.put(`${endpoint}/${id}/`, data);
export const deleteOne = (endpoint, id) => api.delete(`${endpoint}/${id}/`);