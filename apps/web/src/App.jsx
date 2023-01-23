import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { UnauthOnly, AuthOnly } from 'react-auth';
import { DashboardPage } from './pages/DashboardPage';
import { FAQPage } from './pages/FAQPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { JobAppPage } from './pages/JobAppPage';
import { RequestPasswordResetPage } from './pages/RequestPasswordResetPage';
import { PasswordResetPage } from './pages/PasswordResetPage';

function App() {

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route
            path='/'
            element={
              <HomePage />
            }
          />
          <Route
            path='/faq'
            element={
              <FAQPage />
            }
          />
          <Route
            path='/about'
            element={
              <AboutPage />
            }
          />
          <Route
            path='/dashboard'
            element={
              <AuthOnly redirect={'/login'}>
                <DashboardPage />
              </AuthOnly>
            }
          />
          <Route
            path='/jobapp/:jobAppId'
            element={
              <AuthOnly redirect={'/login'}>
                <JobAppPage />
              </AuthOnly>
            }
          />
          <Route
            path='/profile'
            element={
              <AuthOnly redirect={'/login'}>
                <ProfilePage />
              </AuthOnly>
            }
          />
          <Route
            path='/signup'
            element={
              <UnauthOnly redirect={'/dashboard'}>
                <SignupPage loginPath={'/login'} onSuccessNavigatePath={'/dashboard'}/>
              </UnauthOnly>
            }
          />
          <Route
            path='/login'
            element={
              <UnauthOnly redirect={'/dashboard'}>
                <LoginPage signupPath={'/signup'} requestPasswordResetPath={'/request-password-reset'} onSuccessNavigatePath={'/dashboard'}/>
              </UnauthOnly>
            }
          />
          <Route
            path='/request-password-reset'
            element={
              <UnauthOnly redirect={'/dashboard'}>
                <RequestPasswordResetPage />
              </UnauthOnly>
            }
          />
          <Route
            path='/password-reset'
            element={
              <UnauthOnly redirect={'/dashboard'}>
                <PasswordResetPage loginPath={'/login'} />
              </UnauthOnly>
            }
          />
          <Route
            path='*'
            element={<h1>Page Not Found</h1>}
          />
        </Routes>
      </main>
    </>
    
  )
}

export default App
