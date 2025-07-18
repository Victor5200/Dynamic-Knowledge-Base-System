import { Router } from 'express';
import {
    createTopic, getAllTopics, getTopicById,
    updateTopic, deleteTopic, getTopicTree
} from '../controllers/topicController';
import { validate } from '../middleware/validate';
import { createTopicSchema } from '../validators/topicValidator';

import { mockAuth } from '../middleware/mockAuth';
import { authorize } from '../middleware/authorization';

import { getTopicPath } from '../controllers/topicPathController';

const router = Router();


router.post('/', mockAuth, authorize('create'), validate(createTopicSchema), createTopic);
router.get('/', authorize('read'), getAllTopics);
router.get('/:id', authorize('read'), getTopicById);
router.put('/:id', authorize('update'), validate(createTopicSchema), updateTopic);
router.delete('/:id', authorize('delete'), deleteTopic);

router.get('/:id/tree', getTopicTree);

router.get('/path', getTopicPath);

export default router;
