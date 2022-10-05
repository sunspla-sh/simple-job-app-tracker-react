import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { UnauthOnly, AuthOnly } from 'react-auth';
import { DashboardPage } from './pages/DashboardPage';


function App() {

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route
            path='/'
            element={
              <h1>the home page</h1>
            }
          />
          <Route
            path='/faq'
            element={
              <h1>the faq page</h1>
            }
          />
          <Route
            path='/about'
            element={
              <h1>the about page</h1>
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
                <SignupPage loginPath={'/login'} />
              </UnauthOnly>
            }
          />
          <Route
            path='/login'
            element={
              <UnauthOnly>
                <LoginPage signupPath={'/signup'}/>
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
