import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from './hooks/useUserContext';
import { useChats } from './hooks/useChats';
import Navbar from './components/Navbar';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { User } from './context/User';
import useSocket from './hooks/useSocket';
import { useEffect } from 'react';
import ScreenSize from './components/ui/ScreenSize';

export default function App() {
  const { user, logout } = useUserContext();
  const {
    isConnected,
    newMessage,
    setNewMessage,
    newChat,
    setNewChat,
    joinChat,
    sendMessage,
    createChat,
  } = useSocket();
  const navigate = useNavigate();

  const isChatOpen = useParams().chatId;
  const { allChat, chatList, groupList, addMessage, addChat, loading, error } =
    useChats(user?.id);

  // Append new message to local data
  useEffect(() => {
    if (!newMessage) return;

    addMessage(newMessage);
    setNewMessage(null);
  }, [newMessage, addMessage, setNewMessage]);

  // Append new chat to local data
  useEffect(() => {
    if (!newChat) return;

    addChat(newChat);
    if (newChat.isCreator) void navigate(`/chat/${newChat.id}`);
    setNewChat(null);
  }, [addChat, newChat, setNewChat, navigate]);

  // Join all chat
  useEffect(() => {
    if (!allChat || !isConnected) return;

    const chatIds: string[] = allChat.map(el => el.id);
    joinChat(chatIds);

    /* Only joining when allChat.length change, this prevent updating ui message 
    using addMessage() from useChats (changing state of allChats) make socket rejoin rooms.

    NOTE: probably make list of chat ids and memoize it based on allChats length, but useEffect
          with allChat.length below works for now. Just silencing eslint error
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinChat, isConnected, allChat?.length]);

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

      <Outlet
        context={{
          groupList,
          chatList,
          addMessage,
          sendMessage,
          createChat,
          loading,
          error,
        }}
      />

      <ScreenSize />
    </main>
  );
}

export interface Chat {
  id: string;
  isGroup: boolean;
  name?: string;
  messages: Message[];
  members: User[];
  isCreator?: boolean;
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
  sendMessage: (newMessage: Message) => void;
  createChat: (receiverId: string) => void;
  loading: boolean;
  error: string;
}
