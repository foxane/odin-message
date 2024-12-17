import { io } from 'socket.io-client';
import { useEffect, useState, useCallback } from 'react';

export default function useSocket() {
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  // Socket init
  useEffect(() => {
    const newSocket = io(url, { auth: { token } });
    newSocket.on('connect', () => setIsConnected(true));
    newSocket.on('disconnect', () => setIsConnected(false));
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [url, token]);

  // New message listener
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = newMsg => {
      setNewMessage(newMsg);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      setNewMessage(null);
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket]);

  const joinChats = useCallback(
    chatIds => {
      if (!socket || !isConnected) return;
      chatIds.map(chatId => socket.emit('joinChat', chatId));
    },
    [socket, isConnected],
  );

  const sendMessage = useCallback(
    payload => {
      if (!socket || !isConnected) {
        console.warn('Socket not connected. Cannot send message.');
        return;
      }

      socket.emit('sendMessage', payload);
    },
    [socket, isConnected],
  );

  return { isConnected, newMessage, sendMessage, joinChats };
}
