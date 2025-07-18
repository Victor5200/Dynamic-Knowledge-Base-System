import { Router } from 'express';
import {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource,
} from '../controllers/resourceController';
import { authorize } from '../middleware/authorization';
import { validate } from '../middleware/validate';
import { createResourceSchema } from '../validators/resourceValidator';

const router = Router();

router.post('/', authorize('create'), validate(createResourceSchema), createResource);
router.get('/', authorize('read'), getAllResources);
router.get('/:id', authorize('read'), getResourceById);
router.put('/:id', authorize('update'), validate(createResourceSchema), updateResource);
router.delete('/:id', authorize('delete'), deleteResource);

export default router;
