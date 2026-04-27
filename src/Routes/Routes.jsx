import { createBrowserRouter, Navigate } from 'react-router-dom';

import Dashboard from '../components/dashboard/Dashboard.jsx';
import RootLayout from '../publicLayout/PublicLayout.jsx';
import Signup from '../components/signup/Signup.jsx';
import DashboardLayout from '../components/dashboardlayout/DashboardLayout.jsx';
import Login from '../components/login/Login.jsx';
import Home from '../components/home/Home.jsx';
 
 
import TeacherSlots from '../components/teacherSlots/TeacherSlots.jsx';
import CreateSlot from '../components/createSlot/CreateSlot.jsx';
import StudentSlots from '../components/studentview/StudentSlots.jsx';
import TeacherBookedSlots from '../components/teacherbookedslots/TeacherBookedSlots.jsx';
import MyBookings from '../components/studentbookingslot/Mybooking.jsx';

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
        path: "teacher",
        element: <Dashboard />,  
      },
   
      {
        path: "student-slots",
        element: <StudentSlots />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "teacher-booked-slots",  
        element: <TeacherBookedSlots />,
      },
      {
        path: "teacher-slots",  
        element: <TeacherSlots />,
      },
      {
        path: "create-slot",  
        element: <CreateSlot />,
      },
    ],
  },
]);

export default router;