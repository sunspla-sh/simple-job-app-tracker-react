import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-auth';
import { WSProvider } from 'react-ws';
import { JobAppProvider } from 'react-jobapp';

const baseUrl = 'http://localhost:3000'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={{
      signUpUrl: `${baseUrl}/auth/signup`,
      logInUrl: `${baseUrl}/auth/login`,
      verifyUrl: `${baseUrl}/auth/verify`,
    }}>
      <WSProvider>
        <JobAppProvider
          config={{
            getJobAppsUrl: `${baseUrl}/api/jobapp/all`,
            getJobAppsDailyCountUrl: `${baseUrl}/api/jobapp/daily-count`,
            postJobAppUrl: `${baseUrl}/api/jobapp/create`,
            deleteJobAppUrl: `${baseUrl}/api/jobapp/delete`
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </JobAppProvider>
      </WSProvider>
    </AuthProvider>
  </React.StrictMode>
)
