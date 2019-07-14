import { Router } from 'express';
import AuthenticationController from '../controller/authenticationController';
import AuthValidation from '../validation/Authentication';
const router = Router();

/**
 * @description authentication middlewares
 */

router.post('/signup', AuthValidation.validateSignup, AuthenticationController.signup);
router.post('/signin', AuthValidation.validateLogin, AuthenticationController.login);

export default router;
