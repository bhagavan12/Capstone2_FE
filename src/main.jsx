import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext';
import App1 from './App1.jsx'
// import App from './Images/DocApp'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App1 />
    </AuthProvider>
  </StrictMode>,
) 
