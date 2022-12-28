import { prisma } from '../db.js';

export class NoteService {

  constructor(){}

  /**
   * NoteService getAll() is currently unused because JobAppService getSingle()
   * retrieves a single job app and includes all of its notes
   */
  getAll(){}

  async create({ content, jobAppId, userId }){

    if(!content){
      return Promise.reject(new Error('content is required'));
    }

    try{
      
      const foundJobApp = await prisma.jobApp.findUnique({
        where: {
          id: jobAppId
        }
      });

      if(!foundJobApp || foundJobApp.userId !== userId){
        return Promise.reject(new Error('job app not found'));
      }

      const createdNote = prisma.note.create({
        data: {
          content,
          jobAppId
        }
      });

      return Promise.resolve(createdNote);

    } catch (err){
      return Promise.reject(err);
    }

  }

  async edit({ content, jobAppId, userId, noteId }){
    
    if(!content){
      return Promise.reject(new Error('content is required'));
    }

    try{
      
      const foundJobApp = await prisma.jobApp.findUnique({
        where: {
          id: jobAppId
        }
      });

      if(!foundJobApp || foundJobApp.userId !== userId){
        return Promise.reject(new Error('job app not found'));
      }

      const { count } = await prisma.note.updateMany({
        where: {
          id: noteId,
          jobAppId
        },
        data: {
          content
        }
      });

      if(count === 0){
        return Promise.reject(new Error('note not found'))
      }

      return Promise.resolve({ success: true });

    } catch (err){
      return Promise.reject(err);
    }

  }

  async delete({ userId, jobAppId, noteId }){

     
    try {

      const foundJobApp = await prisma.jobApp.findUnique({
        where: {
          id: jobAppId
        }
      });

      if(!foundJobApp || foundJobApp.userId !== userId){
        return Promise.reject(new Error('job app not found'));
      }
      
      const { count } = await prisma.note.deleteMany({
        where: {
          id: noteId,
          jobAppId
        }
      });

      if(count === 0){
        return Promise.reject(new Error('failed to delete note'));
      }

      return Promise.resolve({ success: true });

    } catch (err) {
      return Promise.reject(err);
    }

  }

}