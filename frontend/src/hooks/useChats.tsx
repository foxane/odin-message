// hooks/useChats.ts
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Chat, Message } from '../App';

export function useChats(userId: string | undefined) {
  const [allChat, setChats] = useState<Chat[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const chatList = useMemo(() => allChat?.filter(el => !el.isGroup), [allChat]);
  const groupList = useMemo(() => allChat?.filter(el => el.isGroup), [allChat]);

  const addMessage = useCallback(
    (newMessage: Message) => {
      if (!allChat) return;
      setChats(
        allChat.map(chat =>
          chat.id === newMessage.chatId
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat,
        ),
      );
    },
    [allChat],
  );

  const addChat = useCallback(
    (newChat: Chat) => {
      if (!allChat) return;
      setChats([...allChat, newChat]);
    },
    [allChat],
  );

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
        if (error instanceof Error) setError(error.message);
        else setError('Unexpected error');
      } finally {
        setLoading(false);
      }
    };
    void fetchChats();
  }, [userId]);

  return {
    allChat,
    chatList,
    groupList,
    addMessage,
    addChat,
    loading,
    error,
  };
}
