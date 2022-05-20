import PaginateList from '../../components/PaginateList/PaginateList.js';
import { useCallback } from 'react';
import api from './../../axios';
import './Users.css';
import { useNavigate } from 'react-router-dom';

export default function Users(props) {

  const navigate = useNavigate();

  const fetchUsers = useCallback(async ({ page, setMaxPage, limit }) => {
    const { data } = await api.get('/users', { params: { page, limit } });
    const maxPage = Math.ceil(data.total / limit);
    setMaxPage(maxPage);
    return data.result;
  }, []);

  return (
    <div className='users'>
      <h1 className='users-list__title'>Список пользователей</h1>
      <div className='users-list'>
        <PaginateList style={{ flex: 1 }} fetch={fetchUsers} limit='10'>
          {(users) => (
            <div className='container'>
              <table>
                <tbody>
                  <tr>
                    <th>
                      <h3>Имя пользователя</h3>
                    </th>
                    <th>
                      <h3>Почта</h3>
                    </th>
                    <th>
                      <h3>Должность</h3>
                    </th>
                  </tr>
                  {users.map((user, index) => (
                    <tr style={{cursor: 'pointer'}} key={index} onClick={() => navigate(`/users/${user.id}`)}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.roles[0].id === 1 ? 'Пользователь' : 'Администратор'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </PaginateList>
      </div>
    </div>
  );
}
