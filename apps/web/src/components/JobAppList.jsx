import { useEffect, useState, useContext } from 'react';
import { JobAppContext } from 'react-jobapp';
import { Link } from 'react-router-dom';
import { WSContext } from 'react-ws';
import { JobApp } from '../components/JobApp';
import { LoadingHeart } from 'react-ui';
import { JobAppFilter } from './JobAppFilter';

export const JobAppList = () => {

  const { jobAppService } = useContext(JobAppContext)

  const { socket } = useContext(WSContext);

  const [jobApps, setJobApps] = useState([]);

  const [filteredJobApps, setFilteredJobApps] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  //fetch job apps
  useEffect(() => {
    (async () => {
      try{
        const jobAppsArray = await jobAppService.getJobApps();
        setJobApps(jobAppsArray);
        setFilteredJobApps(jobAppsArray);
      } catch (err) {
        console.log('error fetching jobapps: ', err)
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if(socket){
      const addJobApp = createdJobApp => setJobApps([createdJobApp, ...jobApps]);
      const removeJobApp = deletedJobAppId => setJobApps(jobApps.filter(j => j.id !== deletedJobAppId));
      socket.on('jobapp:create', addJobApp);
      socket.on('jobapp:delete', removeJobApp);
      return () => {
        socket.off('jobapp:create', addJobApp);
        socket.off('jobapp:delete', removeJobApp);
      }
    }
  }, [socket, jobApps]);

  return (
    <div className='jobapp_list'>
      <div className='jobapp_list-title-container'>
        <h2 className='jobapp_list-title'>Job Apps</h2>
      </div>
      
      <div>
        {
          isLoading && (
            <div className='jobapp_list-loading'>
              <LoadingHeart message={'Loading...'} />
            </div>
          )
        }
        {
          !isLoading && !errorMessage && (
            <JobApp listMode={true} createMode={true} />
          )
        }
        {!!jobApps.length && !isLoading && !errorMessage && (
          <JobAppFilter filteredJobApps={filteredJobApps} setFilteredJobApps={setFilteredJobApps} jobApps={jobApps} />
        )}
        {filteredJobApps.map(jobApp => (
          <Link to={`/jobapp/${jobApp.id}`} key={jobApp.id} style={{ textDecoration: 'none' }}>
            <JobApp {...jobApp} listMode={true} />
          </Link>
        ))}
        {!jobApps.length && !isLoading && !errorMessage && (
          <h3 className='jobapp_list-none-found'>No job applications found. Get to work!</h3>
        )}
        { 
          errorMessage && (
            <p>err while loading jobapps: {errorMessage}</p>
          )
        }
      </div>
    </div>
  );

};