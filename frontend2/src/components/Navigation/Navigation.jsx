import React, { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

const Navigation = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const q = searchParams.get('query') || '';
    setQuery(`?query=${q}`);
  }, [searchParams]);

  return (
    <nav>
      <NavLink to={`/dashboard${query}`}>Dashboard</NavLink>
      <NavLink to={`/table${query}`}>Table</NavLink>
    </nav>
  );
};

export default Navigation;
