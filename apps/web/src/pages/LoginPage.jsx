import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from 'react-auth';

export const LoginPage = ({ signupPath }) => {

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <Link
        to={signupPath}
      >
        Don't have an account? Sign up!
      </Link>
    </div>
  );
};