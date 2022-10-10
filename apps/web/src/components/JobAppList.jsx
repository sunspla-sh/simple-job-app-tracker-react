import { useEffect, useState, useContext } from 'react';
import { JobAppContext } from 'react-jobapp';
import { JobApp } from '../components/JobApp';

export const JobAppList = () => {

  const { jobAppService } = useContext(JobAppContext)

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
    })()
  }, []);

  return (
    <div className='jobapp_list'>
      <div className='jobapp_list-title-container'>
        <h2 className='jobapp_list-title'>Job Apps</h2>
      </div>
      <div>
        {jobApps.map(jobApp => <JobApp {...jobApp} key={jobApp.id} />)}
      </div>
    </div>
  );

};