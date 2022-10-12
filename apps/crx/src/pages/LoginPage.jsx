import { Link } from 'react-router-dom';
import { LoginForm } from 'react-auth';

export const LoginPage = ({ signupPath, onSuccessNavigatePath }) => {

  return (
    <div
      className='login_page'
    >
      <h1
        className='login_page-title'
      >
        Log In
      </h1>
      <LoginForm onSuccessNavigatePath={onSuccessNavigatePath} />
      <div
        className='login_page-signup-container'
      >
        <Link
          to={signupPath}
          className='login_page-signup-link'
        >
          Don't have an account? Sign up!
        </Link>
      </div>
    </div>
  );
};