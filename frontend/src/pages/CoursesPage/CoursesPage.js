import avatar from '../../assets/avatar.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../axios.js';
import { useAuth } from '../../hooks/useAuth.js';
import './CoursesPage.css';
import CreateCourse from '../CreateCourse/CreateCourse.js';
import Courses from '../../components/Courses/Courses.js';

export default function CoursesPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [user, setUser] = useState(null);
  const { user: currUser } = useAuth();
  const [activePage, setActivePage] = useState('subscribedCourses');

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
      <div className='container'>
        <div className='courses'>
          <div className='courses__courses'>
            <div className='courses__courses__nav'>
              <div
                className={'courses__button' + (activePage === 'subscribedCourses' ? ` active` : '')}
                onClick={() => setActivePage('subscribedCourses')}
              >
                Подписки на курсы
              </div>
              <div
                className={'courses__button' + (activePage === 'createdCourses' ? ` active` : '')}
                onClick={() => setActivePage('createdCourses')}
              >
                Созданные курсы
              </div>
              <div
                className={'courses__button' + (activePage === 'allCourses' ? ` active` : '')}
                onClick={() => setActivePage('allCourses')}
              >
                Все курсы
              </div>
            </div>
            <div className='courses__courses-menu'>
              {activePage === 'createCourse' && <CreateCourse />}
              {activePage === 'createdCourses' && (
                <Courses limit={5}  fetchCourses={fetchCourses(`users/${currUser.id}/createdCourses`)} title={'Созданные курсы'} />
              )}
              {activePage === 'subscribedCourses' && (
                <Courses limit={5} fetchCourses={fetchCourses(`users/${currUser.id}/subscribedCourses`)} title={'Подписки на курсы'} />
              )}
              {activePage === 'allCourses' && (
                <Courses limit={5} fetchCourses={fetchCourses(`/courses`)} title={'Все курсы'} />
              )}

            </div>
          </div>
        </div>
      </div>
  );
}
