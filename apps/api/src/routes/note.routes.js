import express from 'express';

//import controllers here
import { allController, createController, editController, deleteController } from '../controllers/note.controllers';

const router = express.Router();

router.get('/all', allController);

router.post('/create', createController);

router.put('/:id/edit', editController);

router.delete('/:id/delete', deleteController);