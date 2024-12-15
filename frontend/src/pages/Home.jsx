import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

export default function Home() {
  const { user } = useUser();

  if (!user) return <Navigate to={'/auth'} />;
  return (
    <div>
      {Object.entries(user).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </div>
  );
}
