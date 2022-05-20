import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader.js';
import './PaginateList.css';

export default function PaginateList({ fetch, children, limit = 10, withLoader = true ,emptyText = 'Список пуст', updateFlag, ...props }) {

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      setData([]);
      setLoading(true);
      const result = await fetch({ page, setMaxPage, limit });
      setTimeout(() => {
        setData(result);
        setLoading(false);
      }, 300);
    }
    loadData();
  }, [fetch, page, limit, updateFlag]);

  useEffect(() => {
    if (page > maxPage) {
      setPage(page - 1);
    }
  }, [page, maxPage]);

  function toPrevPage() {
    if (page > 1 && !loading) {
      setPage(page - 1);
    }
  }

  function toNextPage() {
    if (page < maxPage && !loading) {
      setPage(page + 1);
    }
  }

  return (
    <div className={'paginate-list' + (props.className ? ` ${props.className}` : '')} {...props}>
      {loading && withLoader && <Loader />}
      <div className='paginate-list__items'>
        {(data.length) 
          ? children(data) 
          : !loading && <div className='paginate-list__empty-msg'>{emptyText}</div>
        }
      </div>
      <nav className='paginate-list__nav'>
        <div className={'paginate-list__nav-button' + (page <= 1 ? ' disabled' : '')} onClick={toPrevPage}>&lArr;</div>
        <div className='paginate-list__nav-current-page'>{page}</div>
        <div className={'paginate-list__nav-button' + (page >= maxPage ? ' disabled' : '')} onClick={toNextPage}>&rArr;</div>
      </nav>
    </div>
  );
}
