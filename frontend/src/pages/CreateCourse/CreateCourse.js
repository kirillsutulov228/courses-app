import Form from './../../components/Form/Form';
import './СreateCourse.css';
import api from './../../axios';

export default function CreateCourse() {

  async function create(formData) {
    await api.post('/auth/user/createdCourses', formData)
  }

  return (
    <div className='create-course'>
    <Form title='Создать новый курс' successMessage={'Курс успешно создан'} submitTitle='Создать курс' onSubmit={create}>
      <input type='text' name='name' title='Название курса'/>
      <input type='text' name='description' title='Описание'/>
    </Form>
    </div>
  )
}