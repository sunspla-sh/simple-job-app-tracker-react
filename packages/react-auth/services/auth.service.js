
export class AuthService {

  constructor({ signUpUrl, logInUrl, verifyUrl }){
    this.signUpUrl = signUpUrl;
    this.logInUrl = logInUrl;
    this.verifyUrl = verifyUrl;
  }

  async signUp({ email, password }){
    try {
      const res = await fetch(this.signUpUrl, {
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

  removeAuthToken(){
    localStorage.removeItem('authToken');
  }

  async verify(){
    
    const authToken = localStorage.getItem('authToken');

    if(authToken){

      try{
        const res = await fetch(this.verifyUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const json = res.json();
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

}

// export { AuthService };
