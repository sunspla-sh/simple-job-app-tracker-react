import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;

import { useState, useContext } from "react";
import { NoteContext } from "react-note";

export const Note = ({ id, createdAt, updatedAt, content, jobAppId, createMode, jobApp, setJobApp }) => {

  const { noteService } = useContext(NoteContext);

  const [state, setState] = useState({
    content: content ? content : '',
    editContent: content ? content : ''
  });

  const updateState = e => setState({...state, [e.target.name]: e.target.value});

  const [isCreating, setIsCreating] = useState(false);

  const toggleIsCreating = () => setIsCreating(!isCreating);

  const handleSubmitCreateNote = async e => {
    e.preventDefault();
    //note service - create note
    try {
      const createdNote = await noteService.createNote({ content: state.content, jobAppId });
      setState({ ...state, content: '' });
      setJobApp({
        ...jobApp,
        notes: [
          createdNote,
          ...jobApp.notes
        ]
      });
      toggleIsCreating();
    } catch (err) {
      console.log('err while creating note', err);
    }
    
  };

  const handleCancelCreateNote = e => {
    e.preventDefault();
    setState({...state, content: ''});
    toggleIsCreating();
  };

  const [showEditDropdown, setShowEditDropdown] = useState(false);

  const toggleShowEditDropdown = () => setShowEditDropdown(!showEditDropdown);

  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => {
    setShowEditDropdown(false);
    setIsEditing(!isEditing);
  };

  const handleSubmitEditNote = async e => {
    e.preventDefault();
    //note service - edit note
    try {
      const editedNote = await noteService.editNote({ content: state.editContent, noteId: id, jobAppId });
      console.log(editedNote);
      const nowInstant = Temporal.Now.instant().toString();
      const copyNotes = jobApp.notes.map(n => {
        if(n.id === id){
          return {
            ...n,
            content: state.editContent,
            updatedAt: nowInstant
          };
        }
        return n;
      });
      setJobApp({
        ...jobApp,
        notes: copyNotes
      });
      setState({
        ...state,
        content: state.editContent
      });
      toggleIsEditing();
    } catch (err) {
      console.log('err while editing note', err);
    }
  }

  const handleCancelEditNote = e => {
    setState({
      ...state,
      editContent: state.content
    });
    setIsEditing(false);
  };

  const handleDeleteNote = async e => {
    e.preventDefault();
    try {
      const deletedNote = await noteService.deleteNote({ jobAppId, noteId: id });
      setJobApp({
        ...jobApp,
        notes: jobApp.notes.filter(n => n.id !== id)
      });
    } catch (err) {
      console.log('err while deleting note', err);
    }
    
  }

  if(createMode){
    return (
      <>
        {isCreating ? (
          <div className="note_container-create">
            <div className="note_content">
              <div className="note_content-descriptor">
                Content
              </div>
              <textarea type="text" className="note_content-value" name="content" onChange={updateState} rows={5}></textarea>
            </div>
            <div className="note_submit-or-cancel">
              <button
                className="note_cancel-create-button"
                onClick={handleCancelCreateNote}
              >
                Cancel
              </button>
              <button
                className="note_submit-create-button"
                onClick={handleSubmitCreateNote}
              >
                Create Note
              </button>
            </div>
          </div>
        ) : (
          <button
            className='note_create-button'
            onClick={toggleIsCreating}
          > 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
            <span>
              Create Note
            </span>
          </button>
        )}
      </>
      
    );
  }

  const createdAtTemporal = Temporal.Instant.from(createdAt).toZonedDateTimeISO('America/New_York').toPlainDate().toString();
  const updatedAtTemporal = Temporal.Instant.from(updatedAt).toZonedDateTimeISO('America/New_York').toPlainDate().toString();
  
  if (isEditing) {

    return (
      <div className="note_container-edit">
        <div className="note_createdAt">
          <div className="note_createdAt-descriptor">
            Created At
          </div>
          <div className="note_createdAt-value">
            {createdAtTemporal}
          </div>
        </div>
        <div className="note_updatedAt">
          <div className="note_updatedAt-descriptor">
            Updated At
          </div>
          <div className="note_updatedAt-value">
            {updatedAtTemporal}
          </div>
        </div>
        <div className="note_content">
          <div className="note_content-descriptor">
            Content
          </div>
          <textarea type="text" className="note_content-value" name="editContent" onChange={updateState} value={state.editContent} rows={5}></textarea>
        </div>
        <div className="note_submit-or-cancel">
          <button
            className="note_cancel-edit-button"
            onClick={handleCancelEditNote}
          >
            Cancel
          </button>
          <button
            className="note_submit-edit-button"
            onClick={handleSubmitEditNote}
          >
            Save
          </button>
        </div>
      </div>
    );

  }

  return (
    <div className="note_container">
      <div className="note_createdAt">
        <div className="note_createdAt-descriptor">
          Created At
        </div>
        <div className="note_createdAt-value">
          {createdAtTemporal}
        </div>
      </div>
      <div className="note_updatedAt">
        <div className="note_updatedAt-descriptor">
          Updated At
        </div>
        <div className="note_updatedAt-value">
          {updatedAtTemporal}
        </div>
      </div>
      <div className="note_content">
        <div className="note_content-descriptor">
          Content
        </div>
        <div className="note_content-value">
          {content}
        </div>
      </div>
      <div className='note_edit-button-container'>
        <button className='note_edit-button' onClick={toggleShowEditDropdown} style={{ display: showEditDropdown ? 'none' : 'inline' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </button>
        <div
          className='note_edit-options-container'
          style={{ display: showEditDropdown ? 'flex' : 'none' }}
        >
          <div
            className='note_edit-option-item close'
            onClick={toggleShowEditDropdown}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
            <span>
              Close
            </span>
          </div>
          <div
            className='note_edit-option-item edit'
            onClick={toggleIsEditing}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
            <span>
              Edit
            </span>
          </div>
          <div
            className='note_edit-option-item delete'
            onClick={handleDeleteNote}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
            </svg>
            <span>
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );

};