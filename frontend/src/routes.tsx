import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import SettingPage from './pages/SettingPage';

export const routes = createBrowserRouter([
  {
    // root will use App as layout
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to={'/chat'} /> },
      { path: '/chat/:chatId?', element: <ChatPage isGroup={false} /> },
      { path: '/group/:chatId?', element: <ChatPage isGroup={true} /> },
      { path: '/settings', element: <SettingPage /> },
    ],
  },

  { path: '/auth', element: <AuthPage /> },
]);
