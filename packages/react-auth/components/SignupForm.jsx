import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const SignupForm = ({ onSubmit }) => {

  const { authService } = useContext(AuthContext);

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
      console.log('signup success:', authToken);
    } catch (err) {
      setState({
        ...state,
        error: err.message
      });
    }
  }

  return (
    <form onSubmit={signUp} >
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
          Sign Up
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



