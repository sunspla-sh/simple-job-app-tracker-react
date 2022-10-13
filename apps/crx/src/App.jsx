import { Routes, Route, Link } from 'react-router-dom';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { JobAppCreatePage } from './pages/JobAppCreatePage';

function App() {

  return (
    <main>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <h1>home</h1>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/login'>Log In</Link>
            </div>
          }
        />
        <Route
          path='/signup'
          element={
            <SignupPage
              loginPath={'/login'}
              onSuccessNavigatePath={'/jobapp/create'}
            />
          }
        />
        <Route
          path='/login'
          element={
            <LoginPage
              signupPath={'/signup'}
              onSuccessNavigatePath={'/jobapp/create'}
            />
          }
        />
        <Route
          path='/jobapp/create'
          element={
            <JobAppCreatePage />
          }
        />
      </Routes>
    </main>
  )
}

export default App
