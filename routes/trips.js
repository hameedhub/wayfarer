import { Router } from 'express';
import Controller from '../controller/tripController';
import Authentication from '../middleware/tokenAuthentication';
import tokenAccess from '../helper/tokenAccess';
import validation from '../validation/Trip';
const router = Router();


router.post('/', Authentication.checkToken, tokenAccess.adminAccess, validation.createTripValidation, Controller.createTrip);
router.get('/', Authentication.checkToken, Controller.viewTrip);
router.patch('/:tripId', Authentication.checkToken, tokenAccess.adminAccess, validation.tripCancellation, Controller.cancelTrip);
router.get('/destination/:destination', Authentication.checkToken, validation.filterTripByDestination, Controller.filterTripByDestination);
router.get('/origin/:origin', Authentication.checkToken, validation.filterTripByOrigin, Controller.filterTripByOrigin);

export default router;