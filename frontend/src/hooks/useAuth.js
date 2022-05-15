import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../axios.js';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [user, setUser] = useState(localStorage.getItem('user'));
  let navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (token !== accessToken) {
      setToken(accessToken);
    }
  }, [token]);

  async function login(data) {
    const res = await api.post('/login', data);
    setUser(res.data.user);
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('user', res.data.user);
    navigate('/');
  }

  async function register(data) {
    await api.post('/users', data);
    await login(data);
  }

  const refresh = useCallback(async function() {
    try {
      const res = await api.post('/refresh', null);
      setUser(res.data.user);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', res.data.user);
    } catch (err) {
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
    //navigate('/');
  }, []);
  
  async function logout() {
    await api.delete('/logout', null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/');
  }

  return <AuthContext.Provider value={{ token, setToken, user, setUser, login, register, refresh, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
