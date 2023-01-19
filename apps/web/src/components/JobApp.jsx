import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobAppContext } from 'react-jobapp';

import { STATUS_ENUM } from 'api';

import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;

const capitalizeAllWords = s => s.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');

export const JobApp = ( {  company, companyUrl, description, createdAt, updatedAt, title, status, id, listMode, createMode, jobApps, setJobApps, setJobApp  }) => {

  const navigate = useNavigate();

  const { jobAppService } = useContext(JobAppContext);

  const [isCreating, setIsCreating] = useState(false);

  const [showEditDropdown, setShowEditDropdown] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [state, setState] = useState({
    company: '',
    title: '',
    description: '',
    companyUrl: '',
    status: STATUS_ENUM[0]
  });

  const [editState, setEditState] = useState({
    company: company,
    title: title,
    description: description,
    companyUrl: companyUrl,
    status: STATUS_ENUM[0]
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const [errorEditMessage, setErrorEditMessage] = useState('');

  const [successEditMessage, setSuccessEditMessage] = useState('');

  const toggleShowEditDropdown = () => setShowEditDropdown(!showEditDropdown);

  const toggleIsEditing = () => {
    setShowEditDropdown(false);
    setIsEditing(!isEditing);
  };

  const toggleIsCreating = () => setIsCreating(!isCreating);

  const updateState = e => setState({
    ...state,
    [e.target.name]: e.target.value
  });

  const updateEditState = e => setEditState({
    ...editState,
    [e.target.name]: e.target.value
  });

  const handleCancelCreateJobApp = e => {
    e.preventDefault();
    toggleIsCreating();
    setState({
      company: '',
      title: '',
      description: '',
      companyUrl: '',
      status: STATUS_ENUM[0]
    });
  }

  const handleSubmitCreateJobApp = async e => {
    e.preventDefault();
    try {
      const createdJobApp = await jobAppService.postJobApp(state);
      setJobApps([
        createdJobApp,
        ...jobApps
      ]);
      setState({
        company: '',
        title: '',
        description: '',
        companyUrl: '',
        status: STATUS_ENUM[0]
      });
      setErrorMessage('');
      toggleIsCreating();
      setSuccessMessage('Job App created successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  }

  const handleCancelEditJobApp = e => {
    e.preventDefault();
    toggleIsEditing();
    setEditState({
      company: company,
      title: title,
      description: description,
      companyUrl: companyUrl,
      status: STATUS_ENUM[0]
    });
  }

  const handleSubmitEditJobApp = async e => {
    e.preventDefault();
    try {
      const editedJobApp = await jobAppService.editJobApp({ ...editState, jobAppId: id });
      const nowInstant = Temporal.Now.instant().toString();
      setJobApp({
        company: editState.company,
        title: editState.title,
        description: editState.description,
        companyUrl: editState.companyUrl,
        status: editState.status,
        createdAt: createdAt,
        updatedAt: nowInstant,
        id: id
      });
      toggleIsEditing();
      setSuccessEditMessage('Job App edited successfully!');
      setTimeout(() => setSuccessEditMessage(''), 5000);
    } catch (err) {
      console.log('err while editing job app', err);
      setErrorEditMessage(err.message);
      setTimeout(() => setErrorEditMessage(''), 5000);
    }

  }

  const handleDeleteJobApp = async e => {
    e.preventDefault();
    try {
      const deletedJobApp = await jobAppService.deleteJobApp(id);
      navigate('/dashboard');
    } catch (err) {
      console.log('err while deleting note', err);
    }
    
  }



  if(createMode){
    return (
      <>
        {isCreating ? (
          <form
            className="note_container-create"
            onSubmit={handleSubmitCreateJobApp}
          >
            <div>
              <label
                htmlFor="company"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={state.company}
                onChange={updateState}
              />
            </div>
            <div>
              <label
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={state.title}
                onChange={updateState}
              />
            </div>
            <div>
              <label
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={state.description}
                onChange={updateState}
              >
              </textarea>
            </div>
            <div>
              <label
                htmlFor="companyUrl"
              >
                Company URL
              </label>
              <input
                type="text"
                id="companyUrl"
                name="companyUrl"
                value={state.companyUrl}
                onChange={updateState}
              />
            </div>
            <div>
              <label
                htmlFor="status"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                value={state.status}
                onChange={updateState}
              >
                {STATUS_ENUM.map(s => (
                  <option value={s} key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="note_submit-or-cancel">
              <button
                className="note_cancel-create-button"
                onClick={handleCancelCreateJobApp}
              >
                Cancel
              </button>
              <button
                className="note_submit-create-button"
                type="submit"
              >
                Create Job App
              </button>
            </div>
            <div>
              {
                errorMessage && (
                  <p>
                    Error: {errorMessage}
                  </p>
                )
              }
            </div>
            
          </form>
        ) : (
          <>
            <button
              className='note_create-button'
              onClick={toggleIsCreating}
            > 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
              </svg>
              <span>
                Create Job App
              </span>
            </button>
            <div>
              {
                successMessage && (
                  <p>
                    {successMessage}
                  </p>
                )
              }
            </div>
          </>
        )}
      </>
    );
  }

  const createdAtTemporal = Temporal.Instant.from(createdAt).toZonedDateTimeISO('America/New_York').toPlainDate().toString();

  if(isEditing){
    return (
      <>
        <form
          className="note_container-create"
          onSubmit={handleSubmitEditJobApp}
        >
          <div>
            <label
              htmlFor="company"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={editState.company}
              onChange={updateEditState}
            />
          </div>
          <div>
            <label
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editState.title}
              onChange={updateEditState}
            />
          </div>
          <div>
            <label
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editState.description}
              onChange={updateEditState}
            >
            </textarea>
          </div>
          <div>
            <label
              htmlFor="companyUrl"
            >
              Company URL
            </label>
            <input
              type="text"
              id="companyUrl"
              name="companyUrl"
              value={editState.companyUrl}
              onChange={updateEditState}
            />
          </div>
          <div>
            <label
              htmlFor="status"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={editState.status}
              onChange={updateEditState}
            >
              {STATUS_ENUM.map(s => (
                <option value={s} key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="note_submit-or-cancel">
            <button
              className="note_cancel-create-button"
              type="button"
              onClick={handleCancelEditJobApp}
            >
              Cancel
            </button>
            <button
              className="note_submit-create-button"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
        {
          errorEditMessage && (
            <p className='jobapp_edit-error-message'>
              Error: {errorEditMessage}
            </p>
          )
        }
      </>
    );
  }

  return (
    <div className="jobapp_container">
      { !listMode && (
        <div className="jobapp_createdAt">
          <div className="jobapp_createdAt-descriptor">
            Created At
          </div>
          <div className="jobapp_createdAt-value">
            {createdAtTemporal}
          </div>
        </div>
      )}
      <div className="jobapp_company">
        <div className="jobapp_company-descriptor">
          Company
        </div>
        <div className="jobapp_company-value">
          {capitalizeAllWords(company)}
        </div>
      </div>
      <div className="jobapp_title">
        <div className="jobapp_title-descriptor">
          Title
        </div>
        <div className="jobapp_title-value">
          {capitalizeAllWords(title)}
        </div>
      </div>
      <div className="jobapp_description">
        <div className="jobapp_description-descriptor">
          Description
        </div>
        { listMode ? (
          <div className="jobapp_description-value">
            {description.length > 128 ? description.slice(0,128) + '... (click to see more)' : description}
          </div>
        ) : (
          <div className="jobapp_description-value">
            {description}
          </div>
        )}
      </div>          
      <div className="jobapp_companyUrl">
        <div className="jobapp_companyUrl-descriptor">
          Company URL
        </div>
        {listMode ? (
          <div className="jobapp_companyUrl-value">
            {companyUrl}
          </div>
        ) : (
          <div className="jobapp_companyUrl-value">
            <a href={`https://${companyUrl}`} target="_blank">
              {companyUrl}
            </a>
          </div>
        )}
      </div>
      <div className="jobapp_status">
        <div className="jobapp_status-descriptor">
          Status
        </div>
        <div className="jobapp_status-value">
          {status}
        </div>
      </div>
      { listMode && (
        <>
          <div className="jobapp_createdAt">
            <div className="jobapp_createdAt-descriptor">
              Created At
            </div>
            <div className="jobapp_createdAt-value">
              {createdAtTemporal}
            </div>
          </div>
          <div className="jobapp_see-details">
            <span>Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </div>
        </>
      )}
      { !listMode && (
        <div className='note_edit-button-container'>
          <button
            className='note_edit-button'
            onClick={toggleShowEditDropdown}
            style={{ display: showEditDropdown ? 'none' : 'inline' }}
          >
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
              onClick={handleDeleteJobApp}
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
      )}
      {
        successEditMessage && (
          <p className='jobapp_edit-success-message'>
            {successEditMessage}
          </p>
        )
      }
    </div>
  );
};