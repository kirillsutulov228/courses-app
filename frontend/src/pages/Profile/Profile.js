import avatar from '../../assets/avatar.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../axios.js';
import { useAuth } from '../../hooks/useAuth.js';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [user, setUser] = useState(null);
  const { user: currUser } = useAuth();

  useEffect(() => {
    async function fetchUser() {
      try {
        const reqUser = (await api.get(`/users/${id}`)).data;
        if (currUser && reqUser.id === currUser.id) {
          setIsCurrentUser(true);
        }
        setUser(reqUser);
      } catch (err) {
        navigate('/');
      }
    }
    fetchUser();
  }, [id, currUser, navigate]);

  return (
    user && (
      <div className='container'>
        <div className='profile'>
          <div class='card-container'>
            <img class='round' src={avatar} alt='user' />
            <h3>{user.username}</h3>
            <h6>{user.email}</h6>
            <p>No description available</p>
            <div className='profile__button'>Редактировать</div>
            {isCurrentUser 
              ? <div className='profile__button'>Создать курс</div>
              : <div className='profile__button'>Добавить в друзья</div>}
          </div>
          <div className='profile__courses'>
            <div className='profile__courses__nav'>
              <div className='profile__button'>Подписанные курсы</div>
              <div className='profile__button'>Созданные курсы</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
