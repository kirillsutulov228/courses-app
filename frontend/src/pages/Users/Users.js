import PaginateList from '../../components/PaginateList/PaginateList.js';
import { useCallback } from 'react';
import api from './../../axios';

export default function Users(props) {

  const fetchUsers = useCallback(async ({ page, setMaxPage, limit }) => {
    const { data } = await api.get('/users', { params: { page, limit } });
    const maxPage = Math.ceil(data.total / limit);
    setMaxPage(maxPage);
    return data.result;
  }, []);

  return (
    <PaginateList style={{flex: 1}} fetch={fetchUsers} limit='1'>
      {(users) => users.map((user) => <div className='user-item'>{user.username}</div>)}
    </PaginateList>
  )
}
