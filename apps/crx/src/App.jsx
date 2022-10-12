import { Routes, Route, Link } from 'react-router-dom';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';

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
            <h1>Job App Create Form</h1>
          }
        />
      </Routes>
    </main>
  )
}

export default App
