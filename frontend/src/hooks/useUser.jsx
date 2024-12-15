import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';

const useUser = () => useContext(UserContext);

export default useUser;
