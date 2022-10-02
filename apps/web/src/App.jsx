import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';


function App() {

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<h1>the home page</h1>} />
          <Route path='/faq' element={<h1>the faq page</h1>} />
          <Route path='/about' element={<h1>the about page</h1>} />
          <Route path='/dashboard' element={<h1>the dashboard page</h1>} />
          <Route path='/profile' element={<h1>the profile page</h1>} />
          <Route path='/signup' element={<SignupPage loginPath={'/login'} />} />
          <Route path='/login' element={<LoginPage signupPath={'/signup'}/>} />
        </Routes>
      </main>
    </>
    
  )
}

export default App
