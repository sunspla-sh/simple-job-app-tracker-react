import express from 'express';

//import controllers here
import { createController, editController, deleteController } from '../controllers/note.controllers.js';

const router = express.Router({ mergeParams: true });

/**
 * GET /all is currently unused because the jobApp GET /:id route
 * retrieves a single job app and includes all of its notes
 */
// router.get('/all', allController);

router.post('/create', createController);

router.put('/:noteId/edit', editController);

router.delete('/:noteId/delete', deleteController);

export default router;