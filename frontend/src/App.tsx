import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useUserContext } from './hooks/useUserContext';
import { useChats } from './hooks/useChats';
import Navbar from './components/Navbar';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { User } from './context/User';

export default function App() {
  const { user, logout } = useUserContext();
  const isChatOpen = useParams().chatId;
  const { chatList, groupList, addMessage, loading, error } = useChats(
    user?.id,
  );

  if (!user) return <Navigate to={'/auth'} />;

  return (
    <main className="h-dvh w-full max-w-screen-2xl mx-auto lg:flex">
      {!isChatOpen && (
        <header className="fixed bottom-0 h-16 w-full bg-gray-700 lg:hidden">
          <Navbar className="h-full flex-1 flex justify-evenly items-center" />
        </header>
      )}

      <header className="hidden py-5 px-2 bg-gray-700 flex-col justify-between lg:flex">
        <Navbar className="flex flex-col gap-8 items-center" />
        <button onClick={logout}>
          <ArrowLeftCircleIcon className="w-10 stroke-white hover:stroke-red-500" />
        </button>
      </header>

      <Outlet context={{ groupList, chatList, addMessage, loading, error }} />
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
