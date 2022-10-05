import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom';

import { AuthProvider, JobAppProvider } from 'react-auth';

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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </JobAppProvider>
    </AuthProvider>
  </React.StrictMode>
)
