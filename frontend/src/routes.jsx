import { createBrowserRouter } from 'react-router-dom';
import CompsPage from './pages/Comps';
import Home from './pages/Home';
import AuthPage from './pages/Auth';

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/auth', element: <AuthPage /> },
  { path: '/dev/comps', element: <CompsPage /> }, // TODO: CHANGE THE PATH
]);

export default routes;
