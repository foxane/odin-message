import { useContext } from 'react';
import { UserContext } from '../context/User';

export const useUserContext = () => {
  if (!import.meta.env.VITE_API_URL)
    throw new Error('API url is not set in the .env file!');

  return useContext(UserContext);
};
