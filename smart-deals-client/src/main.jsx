import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router/dom";
import { router } from './Route/Routes.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import 'animate.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
    <Toaster position="top-center" reverseOrder={false} />
    
  </StrictMode>,
)
