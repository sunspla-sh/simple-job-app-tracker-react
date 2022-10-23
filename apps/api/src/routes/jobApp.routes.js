import express from 'express';

import { allController, dailyCountController, createController, editController, deleteController } from '../controllers/jobApp.controllers.js';

const router = express.Router();

router.get('/all', allController);

router.get('/daily-count', dailyCountController);

router.post('/create', createController);

router.put('/edit/:id', editController);

router.delete('/delete/:id', deleteController);

//route for fetching favicons
//https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://travis-ci.com&size=32

export default router;