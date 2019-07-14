import { Router } from 'express';
import Controller from '../controller/bookingsController';
import Validation from '../validation/Bookings';
import Authentication from '../middleware/tokenAuthentication';
import Access from '../helper/tokenAccess';

const router = Router();

router.post('/', Authentication.checkToken, Access.clientAccess, Validation.book, Controller.book);
router.get('/', Authentication.checkToken, Controller.bookings);
router.delete('/:bookingId', Authentication.checkToken, Access.clientAccess, Validation.deleteBookings, Controller.deleteBookings);
router.patch('/:tripId', Authentication.checkToken, Access.clientAccess, Validation.changeSeat, Controller.changeSeat);

export default router;