import { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useUserContext } from './useWrapper';
import useSocket from '../hooks/useSocket';
import { node } from 'prop-types';

const MessageContext = createContext({});

const MessageProvider = ({ children }) => {
  const { user } = useUserContext();
  const { data } = useFetch(user ? `/user/${user.id}/chats` : null);
  const { joinChat, newMessage, sendMessage } = useSocket();

  const [chatList, setChatList] = useState(null);

  // Populate chatList
  useEffect(() => {
    if (!data) return;

    setChatList(data);
    joinChat(data.map(el => joinChat(el.id)));
  }, [data, joinChat]);

  // New message handler
  useEffect(() => {
    if (!newMessage) return;

    setChatList(prev =>
      prev.map(chat =>
        chat.id === newMessage.chatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat,
      ),
    );
  }, [newMessage]);

  return (
    <MessageContext.Provider value={{ chatList, sendMessage, newMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
MessageProvider.propTypes = {
  children: node,
};

export { MessageContext, MessageProvider };
