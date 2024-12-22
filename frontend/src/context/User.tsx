import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserData } from '../pages/SettingPage';

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (cred: Credentials) => void;
  register: (cred: Credentials) => void;
  logout: () => void;
  error: ApiError | null;
  removeError: () => void;
  updateData: (userData: UserData) => Promise<void>;
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
  updateData: async () => {},
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
      .catch(() => {
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
        setError(err);
      } else {
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

  const updateData = async (userData: UserData): Promise<void> => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
      );

      if (!response.ok) {
        // Extract the error response
        const errorData = (await response.json()) as ApiError;
        throw new ApiError(errorData.message, errorData.errorDetails ?? []);
      }

      const data = (await response.json()) as AuthResponse;
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new Error(`Unexpected error ${JSON.stringify(err)}`));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        error,
        user,
        loading,
        login,
        register,
        logout,
        removeError,
        updateData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
