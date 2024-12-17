import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="717065940169-hksutta6ah6k0e0ju3j0at21v1sel6c3.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
