import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Header from '../components/Header/Header.js';
import { useAuth } from '../hooks/useAuth.js';
import CreateCourse from './CreateCourse/CreateCourse.js';
import Login from './Login/Login.js';
import Profile from './Profile/Profile.js';
import Register from './Register/Register.js';
import Users from './Users/Users.js';

function App() {
  const { refresh } = useAuth();

  useEffect(() => {
    async function handleRefresh() {
      try {
        await refresh();
      } catch (err) {}
    }

    handleRefresh();
  }, [refresh]);

  return (
    <div className='app'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/users/:id' element={<Profile />} />
          <Route path='/users' element={<Users />} />
          <Route path='/createCourse' element={<CreateCourse />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
