import { Link } from "react-router-dom";
import { SignupForm } from "react-auth";

export const SignupPage = ({ loginPath, onSuccessNavigatePath }) => {

  return (
    <div
      className='signup_page'
    >
      <h1
        className='signup_page-title'
      >
        Sign Up
      </h1>
      <SignupForm onSuccessNavigatePath={onSuccessNavigatePath} />
      <div
        className='signup_page-login-container'
      >
        <Link
          to={loginPath}
          className='signup_page-login-link'
        >
          Already have an account? Log in!
        </Link>
      </div>
    </div>
  );
};