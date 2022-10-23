import { prisma } from '../db.js';
import bcryptjs from 'bcryptjs';
import validatorPkg from 'validator';
const { isEmail } = validatorPkg;
import jwt from 'jsonwebtoken';

export const signupController = async (req, res, next) => {

  const { email, password } = req.body;

  //check if email and password
  if(!email?.length || !password?.length){
    return res.status(400).json({
      error: {
        message: 'email and password required'
      }
    });
  }

  //check if valid email
  if(!isEmail(email)){
    return res.status(400).json({
      error: {
        message: 'please enter a valid email address'
      }
    });
  }

  //check if password long enough
  if(password.length < 8){
    return res.status(400).json({
      error: {
        message: 'password must be at least 8 characters'
      }
    });
  }

  //check if user exists
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if(existingUser){
      return res.status(400).json({
        error: {
          message: 'email already in use'
        }
      });
    }
  } catch (err) {
    return next(err);
  }
  
  //salt and hash password before adding user to database
  try{
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });
    const payload = {
      id: createdUser.id,
      email: createdUser.email
    };
    const authToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '6h'
      }
    );
    res.status(200).send({ authToken: authToken });
  } catch (err){
    next(err);
  }

};

export const loginController = async (req, res, next) => {

  //check if email and password
  const { email, password } = req.body;

  //check if email and password
  if(!email?.length || !password?.length){
    return res.status(400).json({
      error: {
        message: 'email and password required'
      }
    });
  }

  //check if user exists, compare hashed password
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if(!existingUser){
      return res.status(400).json({
        error: {
          message: 'email or password incorrect'
        }
      });
    }
    const isValidPassword = await bcryptjs.compare(password, existingUser.password);
    if(!isValidPassword){
      return res.status(400).json({
        error: {
          message: 'email or password incorrect'
        }
      });
    }
    const payload = {
      id: existingUser.id,
      email: existingUser.email
    };
    const authToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '6h'
      }
    );
    res.status(200).send({ authToken: authToken });
  } catch (err) {
    return next(err);
  }

};

export const verifyController = (req, res, next) => {

  //isAuthenticated checks jwt validity (non expired and signed by us) and makes the user data available on req.payload
  //then we send the user data from jwt back to frontend
  res.status(200).json(req.payload);

};