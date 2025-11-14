import API from './axios';
export const signup = (payload) => API.post('/api/auth/register', payload);
export const login = (payload) => API.post('/api/auth/login', payload);
export const getMe = () => API.get('/api/user/me');
