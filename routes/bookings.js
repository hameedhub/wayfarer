import { Router } from 'express';
import Controller from '../controller/bookingsController';
import Validation from '../validation/Bookings';
import Authentication from '../middleware/tokenAuthentication';
import Access from '../helper/tokenAccess';

const router = Router();

router.post('/bookings', Authentication.checkToken, Access.clientAccess, Validation.book, Controller.book);
router.get('/bookings', Authentication.checkToken, Controller.bookings);

export default router;