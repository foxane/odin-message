import { createBrowserRouter } from 'react-router-dom';
import CompsPage from './pages/Comps';
import Home from './pages/Home';

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/dev/comps', element: <CompsPage /> }, // TODO: CHANGE THE PATH
]);

export default routes;
