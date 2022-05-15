import { useState, useEffect } from 'react';

export default function PaginateList({ children, fetchUrl, limit = 10 }) {

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function loadItems() {
      
    }  
  }, []); 
}
