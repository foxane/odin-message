import { createBrowserRouter, Navigate } from 'react-router-dom';
import CompsPage from './lib/Comps';
import Home from './pages/Home';
import AuthPage from './pages/Auth';
import ChatPage from './pages/ChatPage';

const routes = createBrowserRouter([
  { path: '/', element: <Navigate to={'/home'} /> },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        index: true,
        element: <ChatPage />,
      },
      {
        path: 'group',
        element: <ChatPage isGroup={true} />,
      },
    ],
  },
  { path: '/auth', element: <AuthPage /> },
  { path: '/dev/comps', element: <CompsPage /> }, // TODO: CHANGE THE PATH
]);

export default routes;
