import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from './hooks/useUserContext';
import { Button } from './components/ui/Button';

export default function App() {
  const { user, logout } = useUserContext();

  if (!user) return <Navigate to={'/auth'} />;
  return (
    <>
      <div>Welcome {user.name}</div>
      <Button onClick={logout}>Logout</Button>
      <Outlet />
    </>
  );
}
