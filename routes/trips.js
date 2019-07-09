import { Router } from 'express';
import Controller from '../controller/tripController';
import Authentication from '../middleware/tokenAuthentication';
import tokenAccess from '../helper/tokenAccess';
import validation from '../validation/validateTrip';
const router = Router();


router.post('/trip', Authentication.checkToken, tokenAccess.adminAccess, validation.createTripValidation, Controller.createTrip);
router.get('/trips', Authentication.checkToken, Controller.viewTrip);

export default router;