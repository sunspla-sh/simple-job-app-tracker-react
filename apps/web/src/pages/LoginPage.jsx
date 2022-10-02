import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from 'react-auth';

export const LoginPage = ({ signupPath }) => {

  const onSubmit = async ({ email, password }) => {
    console.log('log in: ', email, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} />
      <Link
        to={signupPath}
      >
        Don't have an account? Sign up!
      </Link>
    </div>
  );
};