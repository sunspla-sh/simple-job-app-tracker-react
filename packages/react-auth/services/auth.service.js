
export class AuthService {

  constructor({ signUpUrl, logInUrl, verifyUrl, requestPasswordResetUrl, passwordResetUrl }){
    this.signUpUrl = signUpUrl;
    this.logInUrl = logInUrl;
    this.verifyUrl = verifyUrl;
    this.requestPasswordResetUrl = requestPasswordResetUrl;
    this.passwordResetUrl = passwordResetUrl;
  }

  async signUp({ email, password, firstName, lastName }){
    try {
      const res = await fetch(this.signUpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, firstName, lastName })
      });
      const json = await res.json();
      //check for errors because fetch doesn't automatically throw an error with a 400 or 500 response code
      if(json.error){
        throw new Error(json.error.message);
      }
      const authToken = json.authToken;
      return authToken;
    } catch (err) {
      throw err;
    }
  }

  async logIn({ email, password }){
    try {
      const res = await fetch(this.logInUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      //check for errors because fetch doesn't automatically throw an error with a 400 or 500 response code
      if(json.error){
        throw new Error(json.error.message);
      }
      const authToken = json.authToken;
      return authToken;
    } catch (err) {
      throw err;
    }
  }

  storeAuthToken(token){
    localStorage.setItem('authToken', token);
  }

  retrieveAuthToken(){
    return localStorage.getItem('authToken');
  }

  removeAuthToken(){
    localStorage.removeItem('authToken');
  }

  async verify(){
    
    const authToken = this.retrieveAuthToken();

    if(authToken){

      try{
        const res = await fetch(this.verifyUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const json = await res.json();
        if(json.error){
          throw new Error(json.error.message)
        }
        return json;
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error('missing authToken')
    }
  }

  async requestPasswordReset(email){
    try{
      const res = await fetch(this.requestPasswordResetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const json = await res.json();
      if(json.error){
        throw new Error(json.error.message)
      }
      return json;
    } catch (err) {
      throw err;
    }
  }

  async passwordReset({ userId, token, password }){
    try{
      const res = await fetch(this.passwordResetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, token, password })
      });
      const json = await res.json();
      if(json.error){
        throw new Error(json.error.message)
      }
      return json;
    } catch (err) {
      throw err;
    }
  }

}

