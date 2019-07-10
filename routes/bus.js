import { Router } from 'express';
import Controller from '../controller/busController';
import Authentication from '../middleware/tokenAuthentication';
import tokenAccess from '../helper/tokenAccess';
import validation from '../validation/Bus';
const router = Router();

router.post('/bus', Authentication.checkToken, tokenAccess.adminAccess, validation.createBus, Controller.createBus);
router.get('/buses', Authentication.checkToken, tokenAccess.adminAccess, Controller.getBuses);

export default router;