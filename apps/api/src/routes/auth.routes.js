import express from 'express';
import { isAuthenticated } from '../middlewares/jwt.middleware.js';
import { signupController, loginController, verifyController } from '../controllers/auth.controllers.js';


const router = express.Router();


// this route creates a new user and signs/sends a jwt
router.post('/signup', signupController);

//this route logs a user in by comparing passwords and signing/sending a jwt
router.post('/login', loginController);

//this route verifies that we signed the jwt and sends back the decoded user data
router.get('/verify', isAuthenticated, verifyController);

//router.get('/request-reset-password', (req, res, next) => {

  //check if email

  //check if user exists

  //figure it out from here - idk generate some unique hash or some shit and send in an email???

//})


//router.get('/reset-password', (req, res, next) => {

  //check if email

  //check if user exists

  //figure it out from here - idk generate some unique hash or some shit and send in an email???

//})

export default router;