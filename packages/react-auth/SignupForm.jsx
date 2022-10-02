import { useState } from 'react';

export const SignupForm = ({ onSubmit }) => {

  const [state, setState] = useState({ email: '', password: '', error: ''});

  const updateState = e => setState({
    ...state,
    [e.target.name]: e.target.value
  });

  const signUp = async e => {
    e.preventDefault();
    try {
      await onSubmit(state);
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
          value={state.email}
          onChange={updateState}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
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



