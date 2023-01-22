import { useState, useContext } from 'react';
import { AuthContext } from 'react-auth';

export const RequestPasswordResetPage = () => {

  const { authService } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const updateEmail = e => setEmail(e.target.value);

  const [successMessage, setSuccessMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleRequestPasswordReset = async e => {
    e.preventDefault();
    if(!isLoading){
      setIsLoading(true);
      console.log('submitted', email);
      try {
        const requestPasswordReset = await authService.requestPasswordReset(email);
        console.log(requestPasswordReset);
        setEmail('')
        setSuccessMessage('Success! If an account with this email exists, a password reset link has been sent. Please give several minutes for the email to arrive and also check your spam folder if you don\'t see it in your primary inbox.');
        setErrorMessage('');
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div
      className="request-password-reset_page"
    >
      <div
        className="request-password-reset_page-container"
      >
        <h1
          className="request-password-reset_title"
        >
          Request Password Reset
        </h1>
        <p
          className="request-password-reset_note"
        >
          Enter your account email in the following form and we'll send you a link to reset your password if an account with that email exists:
        </p>
        <form
          onSubmit={handleRequestPasswordReset}
          className='request-password-reset_form'
        >
          <div
            className='request-password-reset_form-group'
          >
            <label
              htmlFor="email"
              className='request-password-reset_form-label'  
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className='request-password-reset_form-input'  
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div
            className='request-password-reset_form-group'  
          >
            <button
              className='request-password-reset_form-button'  
              type='submit'
            >
              { isLoading ? 'Loading...' : 'Request Password Reset' }
            </button>
          </div>
        </form>
        { errorMessage && (
          <p
            className='request-password-reset_form-error'
          >
            Error: {errorMessage}
          </p>
        )}
        { successMessage && (
          <p
            className='request-password-reset_form-success'
          >
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
}