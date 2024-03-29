import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-auth';
import { WSProvider } from 'react-ws';
import { JobAppProvider } from 'react-jobapp';
import { NoteProvider } from 'react-note';

const baseUrl = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={{
      signUpUrl: `${baseUrl}/auth/signup`,
      logInUrl: `${baseUrl}/auth/login`,
      verifyUrl: `${baseUrl}/auth/verify`,
      requestPasswordResetUrl: `${baseUrl}/auth/request-password-reset`,
      passwordResetUrl: `${baseUrl}/auth/password-reset`
    }}>
      <WSProvider config={{
        baseUrl
      }}>
        <JobAppProvider
          config={{
            getJobAppsUrl: `${baseUrl}/api/jobapp/all`,
            getJobAppUrl: `${baseUrl}/api/jobapp`,
            getJobAppsDailyCountUrl: `${baseUrl}/api/jobapp/daily-count`,
            postJobAppUrl: `${baseUrl}/api/jobapp/create`,
            deleteJobAppUrl: `${baseUrl}/api/jobapp/:jobAppId/delete`,
            editJobAppUrl: `${baseUrl}/api/jobapp/:jobAppId/edit`,
          }}
        >
          <NoteProvider
            config={{
              createNoteUrl: `${baseUrl}/api/jobapp/:jobAppId/note/create`,
              editNoteUrl: `${baseUrl}/api/jobapp/:jobAppId/note/:noteId/edit`,
              deleteNoteUrl: `${baseUrl}/api/jobapp/:jobAppId/note/:noteId/delete`
            }}
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NoteProvider>
        </JobAppProvider>
      </WSProvider>
    </AuthProvider>
  </React.StrictMode>
)
