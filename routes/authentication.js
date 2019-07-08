import { Router } from 'express';
import AuthenticationController from '../controller/authenticationController';
import AuthValidation from '../validation/ValidateAuthentication';
const router = Router();

/**
 * @description authentication middlewares
 */

router.post('/signup', AuthValidation.ValidateSignup, AuthenticationController.signup);

export default router;
