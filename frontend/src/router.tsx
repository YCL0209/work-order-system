import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Contacts from './pages/Contacts';
import WorkOrderManagement from './pages/WorkOrderManagement';
import WorkOrderQuery from './pages/WorkOrderQuery';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <WorkOrderManagement />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
      {
        path: 'work-orders',
        element: <WorkOrderQuery />,
      },
    ],
  },
]);
