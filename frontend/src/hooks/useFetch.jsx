import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData);
        if (response.ok) {
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch (err) {
        setData(err);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  });

  return { data, isLoading, isError };
}

export default useFetch;
