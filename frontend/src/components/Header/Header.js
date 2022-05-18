import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth.js';
import './Header.css';


export default function Header() {

  const { user, logout } = useAuth();

  return <>
    <header className='header'>
      <div className='logo header__logo'>
        <img className='logo__img' src={logo} alt=''></img>
        <p className='logo__title'>Moodlo</p>
      </div>
      <nav className='header__nav'>
        <Link className='header__nav-link' to='/'>Главная</Link>
        <Link className='header__nav-link' to='/courses'>Курсы</Link>
        <Link className='header__nav-link' to='/users'>Пользователи</Link>
        <Link className='header__nav-link' to='/about'>О нас</Link>
      </nav>
      <nav className='header__nav nav_type_auth'>
        {user ? <>
          <Link className='header__nav-link' to={`/users/${user.id}`}>Профиль: {user.username}</Link>
          <p className='header__nav-link' onClick={logout}>Выйти</p>
        </> : <>
          <Link className='header__nav-link' to="/login">Войти</Link>
          <Link className='header__nav-link' to="/register">Зарегистрироваться</Link>
        </>}
      </nav>
    </header>
  </>
}
