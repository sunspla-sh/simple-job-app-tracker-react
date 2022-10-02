import { useState, useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export const LoginForm = () => {

  const { authService } = useContext(AuthContext);

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
      console.log('login success:', authToken);
    } catch (err) {
      setState({
        ...state,
        error: err.message
      });
    }
  }

  return (
    <form onSubmit={logIn} >
      <div>
        <label>Email</label>
        <input
          type='email'
          name='email'
          autoComplete='email'
          value={state.email}
          onChange={updateState}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          autoComplete='current-password'
          value={state.password}
          onChange={updateState}
        />
      </div>
      <div>
        <button>
          Log In
        </button>
      </div>
      {state.error && (
        <div>
          <p>{state.error}</p>
        </div>
      )}
    </form>
  );

};