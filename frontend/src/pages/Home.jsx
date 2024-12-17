import { Outlet, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import ScreenSize from '../components/ScreenSize';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import useSocket from '../hooks/useSocket';

export default function Home() {
  const { user } = useUser();
  const { data } = useFetch(user ? `/user/${user.id}/chats` : null);
  const { joinChats, newMessage, sendMessage } = useSocket();
  const navigate = useNavigate();

  const [chatList, setChatList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  // Populate chat and group list
  useEffect(() => {
    if (!data) return;

    joinChats(data.map(el => el.id));
    setChatList(data.filter(el => !el.isGroup));
    setGroupList(data.filter(el => el.isGroup));
  }, [data, joinChats]);

  // Protect route
  useEffect(() => {
    // Redirect unauthorized
    if (!user) navigate('/auth');
  }, [user, navigate]);

  // TODO: listen to new message and update chat list
  // Try different approach, for example creating mock message with message class in utils
  useEffect(() => {}, [newMessage]);

  return (
    <main className="h-dvh">
      <nav className="fixed bottom-0 w-full">
        <Navbar />
      </nav>

      <Outlet context={{ chatList, groupList, sendMessage }} />

      <ScreenSize />
    </main>
  );
}
