// hooks/useChats.ts
import { useState, useEffect, useMemo } from 'react';
import { Chat, Message } from '../App';

export function useChats(userId: string | undefined) {
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const chatList = useMemo(() => chats?.filter(el => !el.isGroup), [chats]);
  const groupList = useMemo(() => chats?.filter(el => el.isGroup), [chats]);

  const addMessage = (newMessage: Message) => {
    if (!chats) return;
    setChats(
      chats.map(chat =>
        chat.id === newMessage.chatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat,
      ),
    );
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!userId || !token) return;

    setLoading(true);
    const fetchChats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/chats`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (!res.ok) throw new Error(res.statusText);
        const data = (await res.json()) as Chat[];
        setChats(data);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
        else setError('Unexpected error');
      } finally {
        setLoading(false);
      }
    };
    void fetchChats();
  }, [userId]);

  return {
    chatList,
    groupList,
    addMessage,
    loading,
    error,
  };
}
