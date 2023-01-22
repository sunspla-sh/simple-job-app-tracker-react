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
            <p>
              Enter your new password. Password must be at least 8 characters.
            </p>
            <form
              onSubmit={handlePasswordReset}
            >
              <div>
                <label htmlFor="password">New Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div>
                <button
                  type='submit'
                >
                  { isLoading ? 'Loading...' : 'Update' }
                </button>
              </div>
            </form>  
          </>
        )}
        { successMessage && (
          <>
            <p>{successMessage}</p>
            <Link
              to={loginPath}
            >
              <button>Go to Login Page</button>
            </Link>
          </>
        )}
        
        { errorMessage && (
          <p>Error: {errorMessage}</p>
        )}
      </div>
    </div>
  );
}