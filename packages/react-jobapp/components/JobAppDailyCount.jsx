import { useState, useEffect, useContext } from 'react';
import { JobAppContext } from '../contexts/JobAppContext';

export const JobAppDailyCount = () => {

  const { jobAppService } = useContext(JobAppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [dailyCount, setDailyCount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // throw new Error('failed to fetch')
        let count = await jobAppService.getJobAppsDailyCount();
        setDailyCount(count);
      } catch (err) {
        console.log('error', err)
        setErrorMessage('Error retrieving job app count')
      } finally {
        setIsLoading(false);
      }
    })()
  }, [])

  return (
    <div className='jobappdailycount_container'>
      <h3 className='jobappdailycount_title'>
        Today's Job App Count
      </h3>
      <div className='jobappdailycount_count'>
        {
          isLoading && (
            <div className='jobappdailycount_count-loading'>
              Loading...
            </div>
          )
        }
        {
          dailyCount !== null && (
            <div className='jobappdailycount_count-display'>
              {dailyCount} / 5
            </div>
          )
        }
        {
          errorMessage && (
            <div className='jobappdailycount_count-error'>
              {errorMessage}
            </div>
          )
        }
      </div>
    </div>
  );
};