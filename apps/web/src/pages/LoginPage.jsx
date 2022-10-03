import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from 'react-auth';

export const LoginPage = ({ signupPath }) => {

  return (
    <div
      className='login_page'
    >
      <h1
        className='login_page-title'
      >
        Log In
      </h1>
      <LoginForm />
      <Link
        to={signupPath}
      >
        Don't have an account? Sign up!
      </Link>
    </div>
  );
};