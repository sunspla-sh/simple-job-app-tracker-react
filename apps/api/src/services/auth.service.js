import bcryptjs from 'bcryptjs';
import { randomBytes } from 'crypto';

import { promisify } from 'util';
const cryptoRandomBytes = promisify(randomBytes);

import { jwtSign } from '../utils/jwt/jwtSign.js';

import { prisma } from '../db.js';

import validatorPkg from 'validator';
const { isEmail } = validatorPkg;

import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;

import { sendEmail } from '../utils/email/sendEmail.js';

export class AuthService {

  constructor({ JWT_SECRET, FRONTEND_URL }){
    this.JWT_SECRET = JWT_SECRET;
    this.FRONTEND_URL = FRONTEND_URL;
  }

  async signup({ email, firstName, lastName, password }){
    //check if email and password
    if(
      !email
      || typeof email !== 'string'
      || !firstName
      || typeof firstName !== 'string'
      || !lastName
      || typeof lastName !== 'string'
      || !password
      || typeof password !== 'string'
    ){
      return Promise.reject(new Error('email, password, first name, and last name are required'));
    }

    //check if valid email
    if(!isEmail(email)){
      return Promise.reject(new Error('please enter a valid email address'));
    }

    //check if password long enough
    if(password.length < 8){
      return Promise.reject(new Error('password must be at least 8 characters'));
    }

    if(firstName.length > 32){
      return Promise.reject(new Error('first name must be between 1 and 32 characters'));
    }

    if(lastName.length > 32){
      return Promise.reject(new Error('last name must be between 1 and 32 characters'));
    }

    //check if user exists
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email
        }
      });
      if(existingUser){
        return Promise.reject(new Error('email already in use'));
      }
    } catch (err) {
      return Promise.reject(err)
    }

    try {
      const salt = await bcryptjs.genSalt();
      const hashedPassword = await bcryptjs.hash(password, salt);
      const createdUser = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword
        }
      });
      return Promise.resolve(createdUser);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async login({ email, password }){
    //check if email and password
    if(
      !email
      || typeof email !== 'string'
      || !password
      || typeof password !== 'string'
    ){
      return Promise.reject(new Error('email and password required'));
    }

    //check if user exists, compare hashed password
    try {
      
      const existingUser = await prisma.user.findUnique({
        where: {
          email
        }
      });
      
      if(!existingUser){
        return Promise.reject(new Error('email or password incorrect'));
      }

      const isValidPassword = await bcryptjs.compare(password, existingUser.password);
      if(!isValidPassword){
        return Promise.reject(new Error('email or password incorrect'));
      }
      
      return existingUser;

    } catch (err) {
      return Promise.reject(err);
    }

  }

  async signAuthToken(payload){

    try{
      const authToken = await jwtSign(
        payload,
        this.JWT_SECRET,
        {
          algorithm: 'HS256',
          expiresIn: '6h'
        }
      );
      return Promise.resolve(authToken)
    } catch (err) {
      return Promise.reject(err);
    }

  }

  async requestPasswordReset(email){

    if(
      !email
      || typeof email !== 'string'
    ){
      return Promise.reject(new Error('email is required'));
    }

    if(!isEmail(email)){
      return Promise.reject(new Error('please enter a valid email address'));
    }

    try {
      //generate token
      const resetToken = await cryptoRandomBytes(32);
      const resetTokenHex = resetToken.toString('hex');
      console.log('the reset token is', resetTokenHex);

      //hash token
      const hashedToken = await bcryptjs.hash(resetTokenHex, 10);

      //check that user exists
      const foundUser = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if(!foundUser){
        /**
         * resolve promise instead of rejecting to avoid leaking email information
         * because rejected promises get passed to next() and express error
         * handling route, where they are then sent to client
         */

        return Promise.resolve({ success: false });
      }

      //check if user already has an unexpired token
      const foundToken = await prisma.passwordResetToken.findUnique({
        where: {
          userId: foundUser.id
        }
      });

      if(foundToken){
        const deletedToken = await prisma.passwordResetToken.delete({
          where: {
            id: foundToken.id
          }
        })
      }

      //save token
      const createdPasswordResetToken = await prisma.passwordResetToken.create({
        data: {
          token: hashedToken,
          userId: foundUser.id
        }
      });

      const resetLink = `${this.FRONTEND_URL}/password-reset?token=${resetTokenHex}&id=${foundUser.id}`

      //send password reset request email
      console.log('email would be sent with the following link to the frontend password reset page', resetLink);

      const sentEmail = await sendEmail({
        emailTo: foundUser.email,
        emailSubject: 'Password Reset Request',
        handlebarsVariables: {
          firstName: foundUser.firstName,
          link: resetLink
        },
        handlebarsTemplate: 'request-password-reset.hbs'
      })

      console.log('here\'s the sent email', sentEmail);


      return Promise.resolve({ success: true });



    } catch(err) {
      return Promise.reject(err);
    }

    

  }

  async passwordReset({ userId, token, password }){

    try {
      if(
        !userId
        || typeof userId !== 'string'
        || !token
        || typeof token !== 'string'
        || !password
        || typeof password !== 'string'
      ){
        return Promise.reject(new Error('user id, token, and password are required'));
      }
  
      //check if password long enough
      if(password.length < 8){
        return Promise.reject(new Error('password must be at least 8 characters'));
      }
  
      //look up user
      const foundUser = await prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          passwordResetToken: true
        }
      });
  
      //verify token - do they have one?
      if(!foundUser || !foundUser.passwordResetToken || !foundUser.passwordResetToken.token){
        return Promise.reject(new Error('invalid user id or reset token'));
      }
  
      const isValidToken = await bcryptjs.compare(token, foundUser.passwordResetToken.token);
  
      //verify token - does it match?
      if(!isValidToken){
        return Promise.reject(new Error('invalid user id or reset token'));
      }
  
      //verify token - is it expired?
      const tokenCreatedAtTime = Temporal.Instant.fromEpochMilliseconds(foundUser.passwordResetToken.createdAt);
      const currentTime = Temporal.Now.instant();
      const millisecondsSinceTokenCreated = currentTime.epochMilliseconds - tokenCreatedAtTime.epochMilliseconds;
      const millisecondsPerHour = 1000 * 60 * 60;
  
      if(millisecondsSinceTokenCreated > millisecondsPerHour){
        return Promise.reject(new Error('password reset token has expired'));
      }
  
      //hash new password
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      //update user with hashed password
      const updatedUser = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          password: hashedPassword
        }
      });
  
      //delete password reset token
      const deletedToken = await prisma.passwordResetToken.delete({
        where: {
          userId
        }
      });

      //send password reset success email
      const sentEmail = await sendEmail({
        emailTo: updatedUser.email,
        emailSubject: 'Password Reset Successfully',
        handlebarsVariables: {
          firstName: updatedUser.firstName
        },
        handlebarsTemplate: 'password-reset-success.hbs'
      })
  
      return Promise.resolve({ success: true });

    } catch (err){
      return Promise.reject(err)
    }

  }

}