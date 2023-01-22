import { useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from 'react-auth';

export const PasswordResetPage = ({ loginPath }) => {

  const [queryStrings] = useSearchParams();
  const token = queryStrings.get('token');
  const id = queryStrings.get('id');

  const { authService } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [password, setPassword] = useState('');
  const updatePassword = e => setPassword(e.target.value);

  const handlePasswordReset = async e => {
    e.preventDefault();
    if(!isLoading){
      setIsLoading(true);
      try {
        const passwordReset = await authService.passwordReset({ userId: id, token, password });
        console.log(passwordReset);
        setPassword('');
        setSuccessMessage('Password successfully reset! Please try logging in again.');
        setErrorMessage('');
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    console.log('submitted', password, id, token);
  }

  return (
    <div
      className="password-reset_page"
    >
      <div
        className="password-reset_page-container"
      >
        <h1
          className="password-reset_title"
        >
          Password Reset
        </h1>
        { !successMessage && (
          <>
            <p
              className="password-reset_note"
            >
              Enter your new password. Password must be at least 8 characters.
            </p>
            <form
              onSubmit={handlePasswordReset}
              className='password-reset_form'
            >
              <div
                className='password-reset_form-group'
              >
                <label
                  htmlFor="password"
                  className='password-reset_form-label'  
                >
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  className='password-reset_form-input'  
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div
                className='password-reset_form-group'  
              >
                <button
                  className='password-reset_form-button'  
                  type='submit'
                >
                  { isLoading ? 'Loading...' : 'Update Password' }
                </button>
              </div>
            </form>  
          </>
        )}
        { successMessage && (
          <>
            <p
              className='password-reset_form-success'
            >
              {successMessage}
            </p>
            <div
              className='password-reset_form-success-button-container'  
            >
              <Link
                to={loginPath}
              >
                <button
                  className='password-reset_form-navigate-button'  
                >
                  Go to Login Page
                </button>
              </Link>
            </div>
          </>
        )}
        
        { errorMessage && (
          <p
            className='password-reset_form-error'
          >
            Error: {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}