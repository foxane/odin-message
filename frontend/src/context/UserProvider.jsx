import { node } from 'prop-types';
import { createContext, useEffect, useState } from 'react';

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    fetch(`${url}/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        // its fullstack bitch, i do what i want
        if (!data.id) {
          throw data;
        }

        setUser(data);
      })
      .catch(err => {
        setError(err);
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, [url]);

  const auth = (cred, login = true) => {
    setError(null);
    setLoading(true);
    const endpoint = login ? '/auth/login' : '/auth/register';

    fetch(`${url}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(cred),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.token) {
          throw data;
        }

        localStorage.setItem('token', data.token);
        setUser(data.user);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, error, loading, auth, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

UserProvider.propTypes = {
  children: node,
};
