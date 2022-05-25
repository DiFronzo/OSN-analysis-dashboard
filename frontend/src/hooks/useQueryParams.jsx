import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function useQueryParams() {
  const [searchParams] = useSearchParams();
  const [params] = useState(Object.fromEntries([...searchParams]));
  return { params };
}

export default useQueryParams;
