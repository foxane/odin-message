import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes.tsx';
import { UserProvider } from './context/User.tsx';

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  </StrictMode>,
);
