import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useUserContext } from './hooks/useUserContext';
import { User } from './context/User';
import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';

export default function App() {
  const { user, logout } = useUserContext();
  const isChatOpen = useParams().chatId;

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

  const outletContext = { groupList, chatList, addMessage, loading, error };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user || !token) return;
    setLoading(true);

    const fetchChats = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + '/users/' + user.id + '/chats',
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
  }, [user]);

  if (!user) return <Navigate to={'/auth'} />;
  return (
    <main className="h-dvh w-full max-w-screen-2xl mx-auto lg:flex">
      {!isChatOpen && (
        // Small screen navbar
        /* Remove navbar when chat is open */
        <header className="fixed bottom-0 h-16 w-full bg-gray-700 lg:hidden">
          <Navbar className="h-full flex-1 flex justify-evenly items-center" />
        </header>
      )}

      {/* Large screen */}
      <header className="hidden py-5 px-2 bg-gray-700 flex-col justify-between lg:flex">
        <Navbar className="flex flex-col gap-8 items-center" />

        <button onClick={logout}>
          <ArrowLeftCircleIcon className="w-10 stroke-white hover:stroke-red-500" />
        </button>
      </header>

      <Outlet context={outletContext} />
    </main>
  );
}

export interface Chat {
  id: string;
  isGroup: boolean;
  name?: string;
  messages: Message[];
  members: User[];
}

export interface Message {
  id: string;
  chatId: string;
  content: string;
  createdAt: string;
  user: User;
}

export interface ChatOutletContext {
  groupList: Chat[] | null;
  chatList: Chat[] | null;
  addMessage: (newMessage: Message) => void;
  loading: boolean;
  error: string;
}
