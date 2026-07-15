import { createBrowserRouter } from 'react-router-dom';

import Home from './routes/Home';
import Timeline from './routes/Timeline';
import Authenticate from './routes/Authenticate';
import Edit from './routes/Edit';

import ProtectedRoute from './routes/ProtectedRoute'


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/cronograma",
    element: <Timeline />
  },
  {
    path: "/autenticar",
    element: <Authenticate />
  },
  {
    path: "/editar",
    element: (
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    )
  }
]);

