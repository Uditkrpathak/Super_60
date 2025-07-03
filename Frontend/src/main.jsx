import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { StudentEditProvider } from './context/StudentEditContext.jsx';
import { AuthProvider } from './context/AuthContext';
import { BlogEditProvider } from './context/BlogEditContext.jsx';
import { EventEditProvider } from './context/EventEditContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <StudentEditProvider>
        <BlogEditProvider>
          <EventEditProvider>
            <App />
          </EventEditProvider>
        </BlogEditProvider>
      </StudentEditProvider>
    </AuthProvider>
  </StrictMode>,
)
