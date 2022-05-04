import Form from '../../components/Form/Form.js';
import './Register.css';
import api from '../../axios.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate } from "react-router-dom";export default function Register() {

  const { register } = useAuth();
  let navigate = useNavigate();

  async function handleRegister(data, setError) {
    try {
      await register(data);
    } catch(err) {
      console.log(err);
      for (const key in err.response.data) {
        setError(key, { message: err.response.data[key].error });
      }
    }
  }

  return (
    <>
      <div className='register-form-wrapper'>
        <Form submitTitle='Зарегистрироваться' title='Регистрация' onSubmit={handleRegister}>
          <input type='text' required name='username' title='Имя пользователя'></input>
          <input type='email' required name='email' title='Email'></input>
          <input type='password' required name='password' title='Пароль'></input>
          <input type='password' required name='passwordConfirmation' title='Подтверждение пароля'></input>
        </Form>
      </div>
    </>
  );
}
