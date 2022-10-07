import { useEffect, useState, useContext } from 'react';
import { JobAppContext } from 'react-auth';
import { JobApp } from '../components/JobApp';

export const DashboardPage = () => {

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

  //

  return (
    <div>
      <div>
        <div>
          <h1>Dashboard</h1>
        </div>
        <div>
          <h3>Time Remaining</h3>
        </div>
        <div>
          <h3>Today's Job App Count</h3>
        </div>        
      </div>
      
      
      <div>
        <div>
          <h2>Job Apps</h2>
        </div>
        <div>
          {jobApps.map(jobApp => <JobApp {...jobApp} key={jobApp.id} />)}
        </div>
      </div>
    </div>
  );


};