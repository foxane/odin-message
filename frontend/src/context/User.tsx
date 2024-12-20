import { createContext, ReactNode, useEffect, useState } from 'react';

export interface User {
  id: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (cred: Credentials) => void;
  register: (cred: Credentials) => void;
  logout: () => void;
  error: ApiError | null;
  removeError: () => void;
}

export interface Credentials {
  name?: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export class ApiError extends Error {
  constructor(message: string, errorDetails: string[]) {
    super(message);
    this.errorDetails = errorDetails;
  }
  errorDetails?: string[];
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  error: null,
  removeError: () => {},
});

enum AuthEndpoint {
  LOGIN = '/login',
  REGISTER = '/register',
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const url = import.meta.env.VITE_API_URL + '/users/me';
  const token = localStorage.getItem('token') ?? '';

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  // Fetch user data on page load
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json() as Promise<User>;
      })
      .then(user => {
        setUser(user);
      })
      .catch((err: unknown) => {
        console.log(err);
        setUser(null);
        localStorage.removeItem('token');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, url]);

  // Use login() or register()
  const _auth = async (endpoint: AuthEndpoint, cred: Credentials) => {
    const url = import.meta.env.VITE_API_URL + '/auth' + endpoint;

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cred),
      });

      if (!response.ok) {
        // Extract the error response
        const errorData = (await response.json()) as ApiError;
        throw new ApiError(errorData.message, errorData.errorDetails ?? []);
      }

      const data = (await response.json()) as AuthResponse;
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        console.error('API Error:', err.message, err.errorDetails);
        setError(err);
      } else {
        console.error('Unexpected error:', err);
        setError(new Error(`Unexpected error ${JSON.stringify(err)}`));
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (cred: Credentials) => {
    void _auth(AuthEndpoint.LOGIN, cred);
  };

  const register = (cred: Credentials) => {
    void _auth(AuthEndpoint.REGISTER, cred);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const removeError = () => {
    setError(null);
  };

  return (
    <UserContext.Provider
      value={{ error, user, loading, login, register, logout, removeError }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
