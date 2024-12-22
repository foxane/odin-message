import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

export default function ProtectedRoutes({ page }: Props) {
  const { user } = useUserContext();

  if (!user) return <Navigate to={'/auth'} />;
  return page;
}

interface Props {
  page: React.ReactNode;
}
