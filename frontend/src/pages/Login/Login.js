import Form from '../../components/Form/Form.js';
import './Login.css';
import api from '../../axios.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useAuth();
  let navigate = useNavigate();

  async function handleLogin(data, setError) {
    try {
      await login(data);
    } catch(err) {
      setError('form', { type: 'custom', message: 'Incorrect username or password' });
    }
  }

  return (
    <>
      <div className='login-form-wrapper'>
        <Form submitTitle='Войти' title='Вход в аккаунт' onSubmit={handleLogin}>
          <input type='text' required name='username' title='Имя пользователя'></input>
          <input type='password' required name='password' title='Пароль'></input>
        </Form>
      </div>
    </>
  );
}
