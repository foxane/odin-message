import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes.jsx';
import { UserProvider } from './context/UserProvider.jsx';
import { MessageProvider } from './context/MessageProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <MessageProvider>
        <RouterProvider router={routes} />
      </MessageProvider>
    </UserProvider>
  </StrictMode>,
);
