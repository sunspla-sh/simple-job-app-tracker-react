import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from 'react-auth';
import { JobAppProvider } from 'react-jobapp';

const baseUrl = 'http://localhost:3000'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={{
      signUpUrl: `${baseUrl}/auth/signup`,
      logInUrl: `${baseUrl}/auth/login`,
      verifyUrl: `${baseUrl}/auth/verify`,
    }}>
      <JobAppProvider
        config={{
          getJobAppsUrl: `${baseUrl}/api/jobapps`,
          getJobAppsDailyCountUrl: `${baseUrl}/api/jobapps-daily-count`,
          postJobAppUrl: `${baseUrl}/api/jobapp`,
          deleteJobAppUrl: `${baseUrl}/api/jobapp`
        }}
      >
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </JobAppProvider>
    </AuthProvider>
  </React.StrictMode>
)
