import { useState } from "react";

export const Note = ({ id, createdAt, updatedAt, content, jobAppId, createMode, editMode }) => {

  const [state, setState] = useState({
    content: content ? content : '',
  });

  const updateState = e => setState({...state, [e.target.name]: e.target.value});

  const [isCreating, setIsCreating] = useState(false);

  const toggleIsCreating = () => setIsCreating(!isCreating);

  const handleSubmitCreateNote = e => {
    e.preventDefault();
    //note service - create note
    toggleIsCreating();
  };

  const handleCancelCreateNote = e => {
    e.preventDefault();
    setState({...state, content: ''});
    toggleIsCreating();
  };

  const [isEditing, setIsEditing] = useState(false);

  const updateIsEditing = () => setIsEditing(!isEditing);

  const handleSubmitEditNote = e => {
    e.preventDefault();
    //note service - edit note
  }

  if(createMode){
    return (
      <>
        {isCreating ? (
          <div className="note_container">
            <div className="note_content">
              <div className="note_content-descriptor">
                Content
              </div>
              <input type="text" className="note_content" name="content" onChange={updateState} />
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
  
  if (editMode) {

    return (
      <div className="note_container">
        <div className="note_content">
          <div className="note_content-descriptor">
            Content
          </div>
          <input type="text" className="note_content" onChange={updateState} />
        </div>
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
        <div className="note_edit-button">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
            <span>
              Edit
            </span>
          </button>
        </div>
      </div>
    );

  }

  return (
    <div className="note_container">
      <div className="note_content">
        <div className="note_content-descriptor">
          Content
        </div>
        <div className="note_content-value">
          {content}
        </div>
      </div>
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
    </div>
  );

};