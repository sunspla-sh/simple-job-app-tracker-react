
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
      if(json.error){
        throw new Error(json.error.message);
      }
      const authToken = json.authToken;
      return authToken;
    } catch (err) {
      return err;
    }
  }

  async logIn(body){

  }

}

// export { AuthService };
