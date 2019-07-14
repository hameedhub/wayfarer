import { Router } from 'express';
import Controller from '../controller/tripController';
import Authentication from '../middleware/tokenAuthentication';
import tokenAccess from '../helper/tokenAccess';
import validation from '../validation/Trip';
const router = Router();


router.post('/trip', Authentication.checkToken, tokenAccess.adminAccess, validation.createTripValidation, Controller.createTrip);
router.get('/trips', Authentication.checkToken, Controller.viewTrip);
router.patch('/trips/:tripId', Authentication.checkToken, tokenAccess.adminAccess, validation.tripCancellation, Controller.cancelTrip);
router.get('/trips/destination/:destination', Authentication.checkToken, validation.filterTripByDestination, Controller.filterTripByDestination);
router.get('/trips/origin/:origin', Authentication.checkToken, validation.filterTripByOrigin, Controller.filterTripByOrigin);

export default router;