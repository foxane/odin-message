import { useState, useEffect } from 'react';
import { useUserContext } from './useUserContext';
import { User } from '../context/User';

export default function useGetUsers() {
  const { user } = useUserContext();

  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user || !token) return;

    setLoading(true);
    const fetchChats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = (await res.json()) as User[];
        setUsers(data.filter(el => el.id !== user.id));
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else setError('Unexpected error');
      } finally {
        setLoading(false);
      }
    };
    void fetchChats();
  }, [user]);

  return { users, loading, error };
}
