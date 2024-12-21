import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../App';

export default function useSocket() {
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState<Message | null>(null);

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

  // Message listener
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMsg: Message): void => {
      setNewMessage(newMsg);
    };
    socket.on('newMessage', handleNewMessage);

    return () => {
      setNewMessage(null);
      socket.off('newMessage', handleNewMessage);
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

  return { isConnected, newMessage, joinChat, sendMessage };
}
