import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const SignupForm = ({ onSuccessNavigatePath }) => {

  const { authService, verifyUser } = useContext(AuthContext);

  const [state, setState] = useState({ email: '', password: '', error: ''});

  const updateState = e => setState({
    ...state,
    [e.target.name]: e.target.value
  });

  const signUp = async e => {

    e.preventDefault();

    try {

      const { email, password } = state;
      const authToken = await authService.signUp({ email, password });

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
      onSubmit={signUp}
      className='signup_form'
    >
      <div
        className='signup_form-group'
      >
        <label
          htmlFor='email'
          className='signup_form-label'
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
          className='signup_form-input'
        />
      </div>
      <div
        className='signup_form-group'
      >
        <label
          htmlFor='password'
          className='signup_form-label'
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
          className='signup_form-input'
        />
      </div>
      <div
        className='signup_form-group'
      >
        <button
          className='signup_form-button'
        >
          Sign Up
        </button>
      </div>
      {state.error && (
        <div
          className='signup_form-error'
        >
          <p>{state.error}</p>
        </div>
      )}
    </form>
  );

};



