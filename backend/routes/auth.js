import {Router} from 'express';
// controllers imported
import {register, login, authCheck} from '../controllers/auth.js';
// router declared
const router = Router();
// registration route
router.post('/register', register);
// login route
router.post('/login', login);
// authenticate user used in client navigation (additional step)
router.get('/auth-check', authCheck);

export default router;