import './MainPage.css';
import logo from '../../assets/logo.svg';

export default function MainPage() {
  return (
    <div className='main-page'>
      <img src={logo} alt='' />
      <h1>Добро пожаловать в Moodle</h1>
      <h2>Здесь каждый может создать курс, который смогут пройти 100500 людей по всему миру!</h2>
    </div>
  );
}
