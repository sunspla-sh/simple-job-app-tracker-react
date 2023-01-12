import { useState, useEffect, useContext } from 'react';
import { WSContext } from 'react-ws'
import { JobAppContext } from '../contexts/JobAppContext';

export const JobAppDailyCount = () => {

  const { jobAppService } = useContext(JobAppContext);
  const { socket } = useContext(WSContext);

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
  }, []);

  useEffect(() => {
    if(socket){
      const handleDailyCount = () => setDailyCount(dailyCount + 1);
      const handleDailyCountReset = () => setDailyCount(0);
      socket.on('jobapp:create', handleDailyCount);
      socket.on('jobapp:daily-count-reset', handleDailyCountReset);
      return () => {
        socket.off('jobapp:create', handleDailyCount);
        socket.off('jobapp:daily-count-reset', handleDailyCountReset);
      };
    }
  }, [socket]);



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