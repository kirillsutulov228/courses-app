import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import api from './../../axios';
import './CoursePage.css';

export default function CoursePage() {
  const [author, setAuthor] = useState(null);
  const [course, setCourse] = useState(null);
  const { id: courseId } = useParams();
  const { user } = useAuth();
  console.log(user);
  useEffect(() => {
    async function fetchData() {
      const { data: course } = await api.get(`/courses/${courseId}`);
      const { data: author } = await api.get(`/users/${course.authorId}`);
      setAuthor(author);
      setCourse(course);
    }
    fetchData();
  }, [courseId]);

  return (
    course && (
      <div className='course-page'>
        <div className='container'>
          <div className='course-page__info'>
            <h1>{course.name}</h1>
            <p>{course.description || 'Описание отсутствует'}</p>
            <Link to={`/users/${author.id}`}>Автор курса: {author.username}</Link>
          </div>
          <div className='course-page__row'>
            {user && <div className='course-page__nav'>
              {user.id === author.id ? (
                <>
                  <div className='course-page__nav-btn'>Добавить задание</div>
                  <div className='course-page__nav-btn'>Редактировать</div>
                  <div className='course-page__nav-btn'>Удалить курс</div>
                </>
              ) : (
                <div className='course-page__nav-btn'>Подписаться</div>
              )}
            </div>}
            <div className='course-page__tasks'>
              <h1>Задания отсутствуют</h1>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
