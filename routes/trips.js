import { Router } from 'express';
import Controller from '../controller/tripController';
import Authentication from '../middleware/tokenAuthentication';
import tokenAccess from '../helper/tokenAccess';
import validation from '../validation/Trip';
const router = Router();


router.post('/', Authentication.checkToken, tokenAccess.adminAccess, validation.createTripValidation, Controller.createTrip);
router.get('/', Authentication.checkToken, Controller.viewTrip);
router.patch('/:tripId', Authentication.checkToken, tokenAccess.adminAccess, validation.tripEdit, Controller.editTrip);

export default router;