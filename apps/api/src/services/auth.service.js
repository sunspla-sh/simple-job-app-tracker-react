import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const jwtSign = promisify(jwt.sign);

import { prisma } from '../db.js';

import validatorPkg from 'validator';
const { isEmail } = validatorPkg;

export class AuthService {

  constructor({ JWT_SECRET }){
    this.JWT_SECRET = JWT_SECRET;
  }

  async signup({ email, password }){
    //check if email and password
    if(!email?.length || !password?.length){
      return Promise.reject(new Error('email and password required'));
    }

    //check if valid email
    if(!isEmail(email)){
      return Promise.reject(new Error('please enter a valid email address'));
    }

    //check if password long enough
    if(password.length < 8){
      return Promise.reject(new Error('password must be at least 8 characters'));
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
    if(!email?.length || !password?.length){
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

  }

  async passwordReset({ email, token, password }){

  }

}