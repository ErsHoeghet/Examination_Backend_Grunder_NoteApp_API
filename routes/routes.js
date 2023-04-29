import { Router } from 'express';
import { checkRegistration, checkLogin, loggedInValidation, isUserIdInQuery, is_IdInQuery } from '../middleware/userValidation.js';
import { titleAndTextValidation } from '../middleware/noteValidation.js';
import { registerController, loginController } from '../controllers/userController.js';
import { createNote, getNotes, updateNote, removeNote } from '../controllers/noteController.js';

const router = Router();

router.post('/user/signup', checkRegistration, registerController);
router.post('/user/login', checkLogin, loginController);

router.use(loggedInValidation);
router.use(isUserIdInQuery);

router.post('/notes', titleAndTextValidation, createNote);
router.get('/notes', getNotes);

router.use(is_IdInQuery);

router.put('/notes', titleAndTextValidation, updateNote);
router.delete('/notes', removeNote);

export default router;