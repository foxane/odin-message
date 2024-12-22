import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import SettingPage from './pages/SettingPage';
import ProtectedRoutes from './pages/ProtectedRoutes';

export const routes = createBrowserRouter([
  {
    // root will use App as layout
    path: '/',
    element: <App />,
    errorElement: <p>Something went wrong</p>,
    children: [
      {
        index: true,
        element: <ProtectedRoutes page={<Navigate to={'/chat'} />} />,
      },
      {
        path: '/chat/:chatId?',
        element: <ProtectedRoutes page={<ChatPage isGroup={false} />} />,
      },
      {
        path: '/group/:chatId?',
        element: <ProtectedRoutes page={<ChatPage isGroup={true} />} />,
      },
      {
        path: '/settings',
        element: <ProtectedRoutes page={<SettingPage />} />,
      },
    ],
  },

  { path: '/auth', element: <AuthPage /> },
]);
