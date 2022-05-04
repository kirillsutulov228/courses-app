import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Header from '../components/Header/Header.js';
import { useAuth } from '../hooks/useAuth.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';

function App() {
  const { refresh } = useAuth();

  useEffect(() => {
    async function handleRefresh() {
      try { await refresh(); }
      catch (err) {}
    }

    handleRefresh();
  }, [refresh]);

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
