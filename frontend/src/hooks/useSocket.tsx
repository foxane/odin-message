import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Chat, Message } from '../App';

export default function useSocket() {
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const [newChat, setNewChat] = useState<Chat | null>(null);

  // Socket init
  useEffect(() => {
    const newSocket = io(url, { auth: { token } });
    newSocket.on('connect', () => {
      setIsConnected(true);
    });
    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token, url]);

  // EventListener
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMsg: Message): void => {
      setNewMessage(newMsg);
    };
    const handleNewChat = ({ chat, isCreator }: NewChatArgs) => {
      setNewChat({ ...chat, isCreator });
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChat', handleNewChat);

    return () => {
      setNewMessage(null);
      socket.off('newMessage', handleNewMessage);
      socket.on('newChat', handleNewChat);
    };
  }, [socket]);

  const joinChat = useCallback(
    (chatIds: string[]) => {
      if (!socket || !isConnected) return;
      socket.emit('joinChat', chatIds);
    },
    [socket, isConnected],
  );

  const sendMessage = (message: Message) => {
    if (!socket || !isConnected) return;

    socket.emit('sendMessage', message);
  };

  const createChat = (receiverId: string) => {
    if (!socket || !isConnected) return;

    socket.emit('createChat', { receiverId });
  };

  return {
    isConnected,
    newMessage,
    setNewMessage,
    newChat,
    setNewChat,
    createChat,
    joinChat,
    sendMessage,
  };
}

interface NewChatArgs {
  chat: Chat;
  isCreator: boolean;
}
