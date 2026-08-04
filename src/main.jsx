import './style/Reset.css';
import './index.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import { AuthContextProvider } from './context/AuthContext';
import { DataContextProvider } from './context/DataContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </DataContextProvider>
  </StrictMode>
);



