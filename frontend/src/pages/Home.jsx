import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/useWrapper';
import { useEffect } from 'react';
import ScreenSize from '../components/ScreenSize';
import Navbar from '../components/Navbar';

export default function Home() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  // Protect route
  useEffect(() => {
    // Redirect unauthorized
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
