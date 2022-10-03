import { SignupForm } from "react-auth";
import { Link } from "react-router-dom";

export const SignupPage = ({ loginPath }) => {

  return (
    <div
      className='signup_page'
    >
      <h1
        className='signup_page-title'
      >
        Sign Up
      </h1>
      <SignupForm />
      <Link
        to={loginPath}
      >
        Already have an account? Log in!
      </Link>
    </div>
  );
};