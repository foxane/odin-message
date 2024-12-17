import { Outlet, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import ScreenSize from '../components/ScreenSize';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function Home() {
  const { user } = useUser();
  const { data } = useFetch(user ? `/user/${user.id}/chats` : null);
  const navigate = useNavigate();

  const [chatList, setChatList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  // Populate chat and group list
  useEffect(() => {
    if (!data) return;

    setChatList(data.filter(el => !el.isGroup));
    setGroupList(data.filter(el => el.isGroup));
  }, [data]);

  // Redirect unauthorized
  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);

  return (
    <main className="h-dvh">
      <nav className="fixed bottom-0 w-full">
        <Navbar />
      </nav>

      <Outlet context={{ chatList, groupList, setChatList, setGroupList }} />

      <ScreenSize />
    </main>
  );
}
