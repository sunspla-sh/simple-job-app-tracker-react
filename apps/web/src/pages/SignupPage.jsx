import { SignupForm } from "react-auth";
import { Link } from "react-router-dom";

export const SignupPage = ({ loginPath }) => {

  const onSubmit = async ({ email, password }) => {
    console.log('sign up: ', email, password)
  }

  return (
    <div>
      <h1>Signup</h1>
      <SignupForm onSubmit={onSubmit} />
      <Link
        to={loginPath}
      >
        Already have an account? Log in!
      </Link>
    </div>
  );
};