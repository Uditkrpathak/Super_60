import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { StudentEditProvider } from './context/StudentEditContext.jsx';
import { AuthProvider } from './context/AuthContext';
import { BlogEditProvider } from './context/BlogEditContext.jsx';
import { EventEditProvider } from './context/EventEditContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='804637985401-gfros9hcr8ej1v5b1c60hr5csvrck6st.apps.googleusercontent.com'>
    <AuthProvider>
      <StudentEditProvider>
        <BlogEditProvider>
          <EventEditProvider>
            <App />
          </EventEditProvider>
        </BlogEditProvider>
      </StudentEditProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
