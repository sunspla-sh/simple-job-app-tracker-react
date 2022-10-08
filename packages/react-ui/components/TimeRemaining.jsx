import { useState, useEffect } from 'react';
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;

export const TimeRemaining = () => {

  const start = Temporal.Now.zonedDateTimeISO('America/New_York');
  const tomorrow = Temporal.ZonedDateTime.from(start).add({ days: 1}).round({ smallestUnit: 'day', roundingMode: 'floor' });

  const [time, setTime] = useState(start.until(tomorrow));

  useEffect(() => {
    
    const myIntervalId = setInterval(() => {
      const nowInEastern = Temporal.Now.zonedDateTimeISO('America/New_York');
      const tomorrowInEastern = Temporal.ZonedDateTime.from(nowInEastern).add({ days: 1}).round({ smallestUnit: 'day', roundingMode: 'floor' });
      const remaining = nowInEastern.until(tomorrowInEastern);
      setTime(remaining);
    }, 1000);
    
    return () => {
      clearInterval(myIntervalId);
    };

  }, [])


  return (
    <div className='timeremaining_container'>
      <h3 className='timeremaining_title'>
        Time Remaining
      </h3>
      <div className='timeremaining_time'>
        {time.hours < 10 ? `0${time.hours}` : `${time.hours}`}:
        {time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`}:
        {time.seconds < 10 ? `0${time.seconds}` : `${time.seconds}`}
      </div>
    </div>
  );

};