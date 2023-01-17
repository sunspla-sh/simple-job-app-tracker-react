import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { JobAppContext } from 'react-jobapp';
import { JobApp } from '../components/JobApp';
import { Note } from '../components/Note';
import { LoadingHeart } from '../components/LoadingHeart/LoadingHeart';

export const JobAppPage = () => {

  const { jobAppService } = useContext(JobAppContext);

  const { jobAppId } = useParams();

  const [jobApp, setJobApp] = useState(null);

  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const updateIsCreatingNote = () => setIsCreatingNote(!isCreatingNote);

  useEffect(() => {
   (async () => {
    try {
      const retrievedJobApp = await jobAppService.getJobApp(jobAppId)
      setJobApp(retrievedJobApp);
    } catch (err) {
      console.log('error fetching jobapp:', err)
    }
   })()
  }, [jobAppId, jobAppService])

  return (
    <div className='jobapp_page'>
      <div className='jobapp_page-header'>
        <div className='jobapp_page-title-container'>
          <Link to={'/dashboard'} className='jobapp_page-title-back-link'>
            <button className='jobapp_page-title-back-button'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              <span>All Job Apps</span>
            </button>
          </Link>
          <h1 className='jobapp_page-title'>Job App</h1>
        </div>
      </div>
      {jobApp ? (
        <>
          <div className='jobapp_page-jobapp'>
            <JobApp {...jobApp} />
          </div>
          <div className='jobapp_page-notes'>
            <div className='jobapp_page-notes-title-container'>
              <h2 className='jobapp_page-notes-title'>Notes</h2>
              <div className='jobapp_page-notes-create-container'>
                <Note createMode={true} jobAppId={jobApp.id} jobApp={jobApp} setJobApp={setJobApp} />
              </div>
            </div>
            <div className='jobapp_page_notes-container'>
              {jobApp?.notes?.length ? (
                jobApp.notes.map(note => <Note {...note} key={note.id} jobApp={jobApp} setJobApp={setJobApp} />)
              ) : (
                <h3>No notes yet! Consider adding a note to track your application progress.</h3>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className='jobapp_page-loading'>
          <LoadingHeart message={'Loading...'} />
        </div>
      )}
    </div>
  );

};