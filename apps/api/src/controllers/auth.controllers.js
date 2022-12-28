import { prisma } from '../db.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AuthService } from '../services/auth.service.js';

const authService = new AuthService({ JWT_SECRET: process.env.JWT_SECRET });

export const signupController = async (req, res, next) => {

  const { email, password } = req.body;

  try{
    
    const createdUser = await authService.signup({ email, password });
    
    const payload = {
      id: createdUser.id,
      email: createdUser.email
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
      email: existingUser.email
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

export const requestPasswordResetController = (req, res, next) => {

  /**
   * generate crypto token
   * 
   * store in db
   * 
   * email with password reset link
   * 
   * respond with okay
   * 
   */

};

export const passwordResetController = (req, res, next) => {
  
  /**
   *  get valid token and new password from body
   * 
   *  check token validity
   * 
   *  check password
   * 
   *  hash password
   * 
   *  update password in database
   * 
   *  delete token from database
   * 
   *  force user to log in again (front end)
   */

};