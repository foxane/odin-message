import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ChatPage isGroup={false} />,
      },
      {
        path: '/group',
        element: <ChatPage isGroup={true} />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);
