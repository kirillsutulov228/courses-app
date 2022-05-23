import api from '../../axios.js';
import { useAuth } from '../../hooks/useAuth.js';
import './RedactUser.css';
import { useEffect } from 'react';
import Form from '../../components/Form/Form.js';

export default function RedactUser() {
    const { user, setUser } = useAuth();

    async function handleChange(data, setError) {
        try {
          const req = await api.put('/auth/user', data);
          console.log(req.data);
          setUser(req.data);
        } catch(err) {
          console.log(err);
          for (const key in err.response.data) {
            setError(key, { message: err.response.data[key].error });
          }
        }
      }
    
    return (
        <div className='change-user-form-wrapper'>
            <Form submitTitle='Применить изменения' successMessage={'Пользователь успешно изменен'} defaultValues={{ username: user.username, email: user.email }} title='Изменение пользователя' onSubmit={handleChange}>
                <input type='text' required name='username' title='Имя пользователя'></input>
                <input type='email' required name='email' title='Email'></input>
                <input type='password' name='password' title='Новый пароль'></input>
                <input type='password' name='passwordConfirmation' title='Подтверждение пароля'></input>
            </Form>
        </div>
    );
}