import { NoteService } from "../services/note.service.js";

const noteService = new NoteService();

// export const allController = (req, res, next) => {
//   console.log(req.params)
//   res.send(req.params)
// };

export const createController = async (req, res, next) => {
  
  const { id: userId } = req.payload;

  const { jobAppId } = req.params;

  const { content } = req.body;

  try{
    
    const createdNote = await noteService.create({ content, jobAppId, userId });

    res.status(201).send(createdNote);

  } catch (err){
    next(err);
  }

};

export const editController = async (req, res, next) => {

  const { id: userId } = req.payload;

  const { jobAppId, noteId } = req.params;

  const { content } = req.body;

  try{
    
    const editedNote = await noteService.edit({ content, jobAppId, userId, noteId });

    res.send(editedNote);

  } catch (err){
    next(err);
  }
  
};

export const deleteController = async (req, res, next) => {
  
  const { id: userId } = req.payload;

  const { jobAppId, noteId } = req.params;

  try {

    const deletedNote = await noteService.delete({ userId, jobAppId, noteId });

    res.send(deletedNote);

  } catch(err) {
    next(err);
  }

};