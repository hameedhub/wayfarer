import { Router } from 'express';
import Controller from '../controller/busController';
import Authentication from '../middleware/tokenAuthentication';
import tokenAccess from '../helper/tokenAccess';
import validation from '../validation/Bus';
const router = Router();

router.post('/', Authentication.checkToken, tokenAccess.adminAccess, validation.createBus, Controller.createBus);
router.get('/', Authentication.checkToken, tokenAccess.adminAccess, Controller.getBuses);

export default router;