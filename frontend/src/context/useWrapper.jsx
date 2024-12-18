import { MessageContext } from '../context/MessageProvider';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';

const useUserContext = () => useContext(UserContext);
const useMessageContext = () => useContext(MessageContext);

export { useMessageContext, useUserContext };
