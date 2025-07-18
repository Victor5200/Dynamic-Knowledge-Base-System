import { Router } from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController';
import { authorize } from '../middleware/authorization';
import { validate } from '../middleware/validate';
import { createUserSchema } from '../validators/userValidator';

const router = Router();

router.post('/', authorize('create'), validate(createUserSchema), createUser);
router.get('/', authorize('read'), getAllUsers);
router.get('/:id', authorize('read'), getUserById);
router.put('/:id', authorize('update'), validate(createUserSchema), updateUser);
router.delete('/:id', authorize('delete'), deleteUser);

export default router;
