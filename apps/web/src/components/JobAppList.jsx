import { useEffect, useState, useContext } from 'react';
import { JobAppContext } from 'react-jobapp';
import { WSContext } from 'react-ws';
import { JobApp } from '../components/JobApp';

export const JobAppList = () => {

  const { jobAppService } = useContext(JobAppContext)

  const { socket } = useContext(WSContext);

  const [jobApps, setJobApps] = useState([]);

  //fetch job apps
  useEffect(() => {
    (async () => {
      try{
        const jobAppsArray = await jobAppService.getJobApps();
        setJobApps(jobAppsArray);
      } catch (err) {
        console.log('error fetching jobapps: ', err)
      }
    })();
  }, []);

  useEffect(() => {
    if(socket){
      const handleJobApps = createdJobApp => setJobApps([createdJobApp, ...jobApps]);
      socket.on('jobapp:create', handleJobApps);
      return () => socket.off('jobapp:create', handleJobApps);
    }
  }, [socket, jobApps]);

  return (
    <div className='jobapp_list'>
      <div className='jobapp_list-title-container'>
        <h2 className='jobapp_list-title'>Job Apps</h2>
      </div>
      <div>
        {jobApps.map(jobApp => <JobApp {...jobApp} key={jobApp.id} />)}
        {!jobApps.length && (
          <h3 className='jobapp_list-none-found'>No job applications found. Get to work!</h3>
        )}
      </div>
    </div>
  );

};