import { useEffect, useState } from 'react';

export default function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = import.meta.env.VITE_API_URL + endpoint;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!endpoint) return;

    setError('');
    setLoading(true);

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [token, url, endpoint]);

  return { data, loading, error };
}
