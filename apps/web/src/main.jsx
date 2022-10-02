import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-auth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={{
      signUpUrl: 'http://localhost:3000/auth/signup',
      logInUrl: 'http://localhost:3000/auth/login',
      verifyUrl: 'http://localhost:3000/auth/verify'
    }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
