import { Outlet, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import ScreenSize from '../components/ScreenSize';
import Navbar from '../components/Navbar';

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);

  return (
    <main className="h-dvh">
      <nav className="fixed bottom-0 w-full">
        <Navbar />
      </nav>

      <Outlet />

      <ScreenSize />
    </main>
  );
}
