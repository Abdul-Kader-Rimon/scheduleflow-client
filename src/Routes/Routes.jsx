import { createBrowserRouter, Navigate } from 'react-router-dom';

import Dashboard from '../components/dashboard/Dashboard.jsx';
import RootLayout from '../publicLayout/PublicLayout.jsx';
import Signup from '../components/signup/signup.jsx';
import DashboardLayout from '../components/dashboardlayout/DashboardLayout.jsx';
import Login from '../components/login/Login.jsx';
import Home from '../components/home/Home.jsx';
import StudentDashboard from '../components/student-dashboard/StudentDashboard.jsx';
import TeacherDashboard from '../components/teacher-dashboard/TeacherDashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",  
        element: <Home />,
      },
      {
        path: "signup",  
        element: <Signup />,
      },
      {
        path: "login",  
        element: <Login />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "student",  
        element: <StudentDashboard />,
      },
      {
        path: "teacher",  
        element: <TeacherDashboard />,
      },
    ],
  },
]);

export default router;