import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
});

api.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    req.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return req;
});

api.interceptors.response.use((res) => res, async (err) => {
  const req = err.config;
  if (err.response.status === 401 && !req.isRetry) {
    try {
      req.isRetry = true;
      const result = await api.post('/refresh');
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('user', result.data.user);
      return await api(req);
    } catch(err) {
      console.error(err);
    }
  }
});

export default api;
