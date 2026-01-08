import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import OrderFlow from '@/pages/OrderFlow';
import Orders from '@/pages/Orders';
import Customers from '@/pages/Customers';
import Consumables from '@/pages/Consumables';
import Finance from '@/pages/Finance';
import AccountManagement from '@/pages/AccountManagement';
import ICInventory from '@/pages/ICInventory';
import LoginPreview from '@/pages/LoginPreview';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'order-flow',
        element: <OrderFlow />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'consumables',
        element: <Navigate to="/consumables/tapes" replace />,
      },
      {
        path: 'consumables/tapes',
        element: <Consumables />,
      },
      {
        path: 'consumables/sockets',
        element: <Consumables />,
      },
      {
        path: 'consumables/others',
        element: <Consumables />,
      },
      {
        path: 'finance',
        element: <Finance />,
      },
      {
        path: 'accounts',
        element: <AccountManagement />,
      },
      {
        path: 'ic-inventory',
        element: <ICInventory />,
      },
      {
        path: 'login-preview',
        element: <LoginPreview />,
      },
    ],
  },
]);
