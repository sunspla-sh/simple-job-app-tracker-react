import express from 'express';
import { isAuthenticated } from '../middlewares/jwt.middleware.js';
import { signupController, loginController, verifyController, requestPasswordResetController, passwordResetController } from '../controllers/auth.controllers.js';


const router = express.Router();


// this route creates a new user and signs/sends a jwt
router.post('/signup', signupController);

//this route logs a user in by comparing passwords and signing/sending a jwt
router.post('/login', loginController);

//this route verifies that we signed the jwt and sends back the decoded user data
router.get('/verify', isAuthenticated, verifyController);

router.get('/request-password-reset', requestPasswordResetController);

router.get('/password-reset', passwordResetController);

export default router;