import { useEffect, useState, useContext } from 'react';
import { JobAppContext } from 'react-auth';

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
      using dashboardpage
      {jobApps.map(({ company, companyUrl, createdAt, description, title, id }) => (
        <div style={{ margin: '2rem' }} key={id}>
          <div>Company: {company}</div>
          <div>Title: {title}</div>
          <div>Description: {description}</div>          
          <div>Application Date: {createdAt}</div>
          <div>Website: {companyUrl}</div>
        </div>
      ))}
    </div>
  );


};