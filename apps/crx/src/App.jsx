import { Routes, Route, Link } from 'react-router-dom';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { JobAppCreatePage } from './pages/JobAppCreatePage';
import { HomePage } from './pages/HomePage';
import { UnauthOnly, AuthOnly } from 'react-auth';


function App() {

  return (
    <main>
      <Routes>
        <Route
          path='/'
          element={
            <UnauthOnly redirect={'/jobapp/create'}>
              <HomePage signupPath={'/signup'} loginPath={'/login'} />
            </UnauthOnly>
            
          }
        />
        <Route
          path='/signup'
          element={
            <UnauthOnly redirect={'/jobapp/create'}>
              <SignupPage
                loginPath={'/login'}
                onSuccessNavigatePath={'/jobapp/create'}
              />
            </UnauthOnly>
          }
        />
        <Route
          path='/login'
          element={
            <UnauthOnly redirect={'/jobapp/create'}>
              <LoginPage
                signupPath={'/signup'}
                onSuccessNavigatePath={'/jobapp/create'}
              />
            </UnauthOnly>
          }
        />
        <Route
          path='/jobapp/create'
          element={
            <AuthOnly redirect={'/login'}>
              <JobAppCreatePage />
            </AuthOnly>
          }
        />
      </Routes>
    </main>
  )
}

export default App
