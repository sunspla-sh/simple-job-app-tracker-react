import { JobAppList } from '../components/JobAppList';
import { JobAppDailyCount, JobAppTimeRemaining } from 'react-jobapp';

export const DashboardPage = () => {

  return (
    <div className='dashboard_page'>
      <div className='dashboard_page-header'>
        <div className='dashboard_page-title-container'>
          <h1 className='dashboard_page-title'>Dashboard</h1>
        </div>
        <div className='dashboard_page-stats-container'>
          <JobAppTimeRemaining />
          <JobAppDailyCount />
        </div>
        
      </div>
      <JobAppList />
    </div>
  );


};