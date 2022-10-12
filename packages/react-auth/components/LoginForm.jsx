import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

export const LoginForm = ({ onSuccessNavigatePath }) => {

  const navigate = useNavigate();

  const { authService, verifyUser } = useContext(AuthContext);

  const [state, setState] = useState({ email: '', password: '', error: ''});

  const updateState = e => setState({
    ...state,
    [e.target.name]: e.target.value
  });

  const logIn = async e => {
    
    e.preventDefault();
    
    try {
      
      const { email, password } = state;
      const authToken = await authService.logIn({ email, password });

      authService.storeAuthToken(authToken);
      await verifyUser();
      navigate(onSuccessNavigatePath);

    } catch (err) {

      setState({
        ...state,
        error: err.message
      });

    }

  }

  return (
    <form
      onSubmit={logIn}
      className='login_form'
    >
      <div
        className='login_form-group'
      >
        <label
          className='login_form-label'
          htmlFor='email'
        >
          Email
        </label>
        <input
          id='email'
          type='email'
          name='email'
          autoComplete='email'
          value={state.email}
          onChange={updateState}
          className='login_form-input'
        />
      </div>
      <div
        className='login_form-group'
      >
        <label
          className='login_form-label'
          htmlFor='password'
        >
          Password
        </label>
        <input
          id='password'
          type='password'
          name='password'
          autoComplete='current-password'
          value={state.password}
          onChange={updateState}
          className='login_form-input'
        />
      </div>
      <div
        className='login_form-group'
      >
        <button
          className='login_form-button'
        >
          Log In
        </button>
      </div>
      {state.error && (
        <div
          className='login_form-error'
        >
          <p>{state.error}</p>
        </div>
      )}
    </form>
  );

};