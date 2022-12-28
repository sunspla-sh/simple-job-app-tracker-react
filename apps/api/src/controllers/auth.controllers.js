import { AuthService } from '../services/auth.service.js';

const authService = new AuthService({ JWT_SECRET: process.env.JWT_SECRET, FRONTEND_URL: process.env.FRONTEND_URL });

export const signupController = async (req, res, next) => {

  const { email, password, firstName, lastName } = req.body;

  try{
    
    const createdUser = await authService.signup({ email, password, firstName, lastName });
    
    const payload = {
      id: createdUser.id,
      email: createdUser.email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName
    };
    
    const authToken = await authService.signAuthToken(payload);
    
    res.status(200).send({ authToken: authToken });

  } catch (err){

    next(err);

  }

};

export const loginController = async (req, res, next) => {

  const { email, password } = req.body;

  //check if user exists, compare hashed password
  try {
    
    const existingUser = await authService.login({ email, password })
    
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName
    };
    
    const authToken = await authService.signAuthToken(payload);

    res.status(200).send({ authToken: authToken });

  } catch (err) {

    next(err);

  }

};

export const verifyController = (req, res, next) => {

  //isAuthenticated checks jwt validity (non expired and signed by us) and makes the user data available on req.payload
  //then we send the user data from jwt back to frontend
  res.status(200).json(req.payload);

};

//edit account controller

//delete account controller

// verify email controller

export const requestPasswordResetController = async (req, res, next) => {

  const { email } = req.body;

  try{

    const requestPasswordReset = await authService.requestPasswordReset(email);

    res.send(requestPasswordReset);

  } catch(err){
    next(err);
  }

};

export const passwordResetController = async (req, res, next) => {
  
  /**
   *  force user to log in again (front end)
   */
  const { userId, token, password } = req.body;

  try {

    const passwordReset = await authService.passwordReset({ userId, token, password });

    res.send(passwordReset);

  } catch(err){
    next(err);
  }

};