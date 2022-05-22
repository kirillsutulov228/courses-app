import Courses from '../../components/Courses/Courses.js';
import api from './../../axios';
import './AllCourses.css';

export default function AllCourses(props) {
  async function getAllCourses({ page, setMaxPage, limit }) {
    const result = await api.get('/courses', { params: { page, limit } });
    setMaxPage(Math.ceil(result.data.total / limit));
    return result.data.result;
  }

  return (
    <div className='courses__courses'>
      <Courses title={"Список курсов"} style={{flex: '1'}} fetchCourses={getAllCourses} limit={10} />
    </div>
  );
}
