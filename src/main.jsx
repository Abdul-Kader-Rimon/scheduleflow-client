 
import { createRoot } from 'react-dom/client'
import './index.css'
 
import router from './Routes/Routes.jsx'

import { Toaster } from 'react-hot-toast'
 
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById("root")).render(
 
   <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
   </>
 
  
);