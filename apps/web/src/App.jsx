import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { UnauthOnly, AuthOnly } from 'react-auth';
import { DashboardPage } from './pages/DashboardPage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { JobAppPage } from './pages/JobAppPage';

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
              <AuthOnly>
                <DashboardPage />
              </AuthOnly>
            }
          />
          <Route
            path='/jobapp/:jobAppId'
            element={
              <AuthOnly>
                <JobAppPage />
              </AuthOnly>
            }
          />
          <Route
            path='/profile'
            element={
              <AuthOnly>
                <h1>the profile page</h1>
              </AuthOnly>
            }
          />
          <Route
            path='/signup'
            element={
              <UnauthOnly>
                <SignupPage loginPath={'/login'} onSuccessNavigatePath={'/dashboard'}/>
              </UnauthOnly>
            }
          />
          <Route
            path='/login'
            element={
              <UnauthOnly>
                <LoginPage signupPath={'/signup'} onSuccessNavigatePath={'/dashboard'}/>
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
