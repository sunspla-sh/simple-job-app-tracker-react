import { JobAppList } from '../components/JobAppList';
import { TimeRemaining } from 'react-ui';

export const DashboardPage = () => {

  return (
    <div className='dashboard_page'>
      <div className='dashboard_page-header'>
        <div className='dashboard_page-title-container'>
          <h1 className='dashboard_page-title'>Dashboard</h1>
        </div>
        <div> 
          {/* needs to be separate component */}
          <h3>Time Remaining</h3>
        </div>
        <TimeRemaining />
        <div>
          {/* also needs to be separate component */}
          <h3>Today's Job App Count</h3>
        </div>        
      </div>
      <JobAppList />
    </div>
  );


};