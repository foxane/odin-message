import { createBrowserRouter } from 'react-router-dom';
import CompsPage from './pages/Comps';
import Home from './pages/Home';

const routes = createBrowserRouter([
  { path: '/home', element: <Home /> },
  { path: '/', element: <CompsPage /> }, // TODO: CHANGE THE PATH
]);

export default routes;
