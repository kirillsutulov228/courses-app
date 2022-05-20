import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import PaginateList from './../PaginateList/PaginateList';
import './Courses.css';
import api from './../../axios';

export default function Courses({ fetchCourses, title, style, limit = 2 }) {
  const { user } = useAuth();
  const [subcribedId, setSubscribedId] = useState({});
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    async function getSubscribedCourses() {
      if (user.id) {
        const response = await api.get(`/users/${user.id}/subscribedCourses`);
        const ids = response.data.result.reduce((acc, course) => {
          acc[course.id] = true;
          return acc;
        }, {});
        console.log(ids);
        setSubscribedId(ids);
      }
    }
    getSubscribedCourses();
  }, [user]);

  function update() {
    setUpdateFlag(!updateFlag);
  }
  
  function subscribeOnCourse(id) {
    return async () => {
      if (user) {
        await api.post(`/auth/user/subscribedCourses/${id}`);
        setSubscribedId({ [id]: true, ...subcribedId });
        update();
      }
    };
  }

  function unsubscribeFromCourse(id) {
    return async () => {
      if (user) {
        await api.delete(`/auth/user/subscribedCourses/${id}`);
        const changed = { ...subcribedId };
        delete changed[id];
        console.log(changed);
        setSubscribedId(changed);
        update();
      }
    };
  }

  return (
    <div className='courses' style={style}>
      <h1 className='courses__title'>{title}</h1>
      <div className='courses__list'>
        <PaginateList fetch={fetchCourses} limit={limit} updateFlag={updateFlag}>
          {(courses) =>
            courses.map((course) => (
              <div className='course__item' key={course.id}>
                <div className='course__info'>
                  <h1 className='course__name'>{course.name}</h1>
                  <p className='course__description'>Описание: {course.description}</p>
                </div>
                <div className='course__nav'>
                  {course.authorId === user?.id ? (
                    <>
                      <div className='course__nav-button'>Удалить курс</div>
                      <div className='course__nav-button'>Редактировать</div>
                    </>
                  ) : (
                    user && (
                      <>
                        {course.id in subcribedId ? (
                          <div className='course__nav-button' onClick={unsubscribeFromCourse(course.id)}>
                            Отписаться
                          </div>
                        ) : (
                          <div className='course__nav-button' onClick={subscribeOnCourse(course.id)}>
                            Подписаться
                          </div>
                        )}
                      </>
                    )
                  )}
                </div>
              </div>
            ))
          }
        </PaginateList>
      </div>
    </div>
  );
}
