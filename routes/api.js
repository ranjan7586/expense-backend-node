import express from 'express';
import { indexUsers, loginUser, registerUser } from '../controllers/userController.js';
import { userValidation } from '../validations/userValidation.js';
import { jwtVerify } from '../middlewares/jwtmiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register',userValidation, registerUser);

router.use(jwtVerify);
router.get('/get-users', indexUsers);
export default router;