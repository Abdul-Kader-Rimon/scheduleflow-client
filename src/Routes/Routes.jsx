import { createBrowserRouter, Navigate } from 'react-router-dom';

 
import Dashboard from '../components/dashboard/Dashboard.jsx';
import RootLayout from '../publicLayout/PublicLayout.jsx';
import Signup from '../components/signup/signup.jsx';
import DashboardLayout from '../components/dashboardlayout/DashboardLayout.jsx';
import Login from '../components/login/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
  
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />
    ,
    children: [
    {
      index: true,
      element: <Dashboard />,
    },
  ],
  },
  
]);

export default router;