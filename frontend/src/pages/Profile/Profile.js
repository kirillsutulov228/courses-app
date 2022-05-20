import avatar from '../../assets/avatar.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../axios.js';
import { useAuth } from '../../hooks/useAuth.js';
import './Profile.css';
import CreateCourse from '../CreateCourse/CreateCourse.js';
import Courses from '../../components/Courses/Courses.js';

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [user, setUser] = useState(null);
  const { user: currUser } = useAuth();
  const [activePage, setActivePage] = useState('subscribedCourses');

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

  function fetchCourses(url) {
    return async function ({ page, setMaxPage, limit }) {
      const response = await api.get(url, { params: { page, limit } });
      const data = response.data;
      const maxPage = Math.ceil(data.total / limit);
      setMaxPage(maxPage);
      return data.result;
    };
  }

  return (
    user && (
      <div className='container'>
        <div className='profile'>
          <div class='card-container'>
            <img class='round' src={avatar} alt='user' />
            <h3>{user.username}</h3>
            <h6>{user.email}</h6>
            <p>Пользователь</p>

            {isCurrentUser ? (
              <>
                <div className='profile__button'>Редактировать</div>
                <div
                  className={'profile__button' + (activePage === 'createCourse' ? ` active` : '')}
                  onClick={() => setActivePage('createCourse')}
                >
                  Создать курс
                </div>
              </>
            ) : (
              currUser && <div className='profile__button'>Добавить в друзья</div>
            )}
          </div>
          <div className='profile__courses'>
            <div className='profile__courses__nav'>
              <div
                className={'profile__button' + (activePage === 'subscribedCourses' ? ` active` : '')}
                onClick={() => setActivePage('subscribedCourses')}
              >
                Подписанные курсы
              </div>
              <div
                className={'profile__button' + (activePage === 'createdCourses' ? ` active` : '')}
                onClick={() => setActivePage('createdCourses')}
              >
                Созданные курсы
              </div>
            </div>
            <div className='profile__courses-menu'>
              {activePage === 'createCourse' && <CreateCourse />}
              {activePage === 'createdCourses' && (
                <Courses fetchCourses={fetchCourses(`users/${id}/createdCourses`)} title={'Созданные курсы'} />
              )}
              {activePage === 'subscribedCourses' && (
                <Courses fetchCourses={fetchCourses(`users/${id}/subscribedCourses`)} title={'Подписанные курсы'} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
