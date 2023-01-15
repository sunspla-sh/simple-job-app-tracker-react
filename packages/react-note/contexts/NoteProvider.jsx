import { useContext } from 'react';
import { NoteContext } from './NoteContext';
import { AuthContext } from 'react-auth';
import { NoteService } from '../services/note.service';

export const NoteProvider = ({ children, config }) => {

  const { authService } = useContext(AuthContext);

  const { createNoteUrl, editNoteUrl, deleteNoteUrl } = config;
  
  const noteService = new NoteService({
    retrieveAuthToken: authService.retrieveAuthToken,
    createNoteUrl,
    editNoteUrl,
    deleteNoteUrl
  });

  const value = {
    noteService
  };

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};