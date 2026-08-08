import { createBrowserRouter } from 'react-router-dom';

import Home from './routes/Home';
import Timeline from './routes/Timeline';
import Authenticate from './routes/Authenticate';
import EditClasses from './routes/EditClasses';
import EditTeachers from './routes/EditTeachers';

import ProtectedRoute from './routes/ProtectedRoute'


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/gradehoraria",
    element: <Timeline />
  },
  {
    path: "/autenticar",
    element: <Authenticate />
  },
  {
    path: "/editarAulas",
    element: (
      <ProtectedRoute>
        <EditClasses />
      </ProtectedRoute>
    )
  },
  {
    path: "/editarProfessores",
    element: (
      <ProtectedRoute>
        <EditTeachers />
      </ProtectedRoute>
    )
  }
]);

