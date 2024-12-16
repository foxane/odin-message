import { useState } from 'react';

export default function useMessage(chatId) {
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const url = `${import.meta.env.VITE_API_URL}/chat/${chatId}/message`;

  const request = (method, body) => {
    setLoading(true);
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(msg => setMsg(msg))
      .catch(err => {
        setError('Failed');
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const send = content => {
    request('POST', { content });
  };

  return { error, loading, msg, send };
}
