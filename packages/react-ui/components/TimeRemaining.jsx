import { useState, useEffect } from 'react';
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;

export const TimeRemaining = () => {

  const [time, setTime] = useState(Temporal.Now.zonedDateTimeISO('America/New_York'));

  useEffect(() => {
    
    const myIntervalId = setInterval(() => {
      const nowInEastern = Temporal.Now.zonedDateTimeISO('America/New_York');
      const tomorrowInEastern = Temporal.ZonedDateTime.from(nowInEastern).add({ days: 1}).round({ smallestUnit: 'day', roundingMode: 'floor' });
      console.log(nowInEastern.toString());
      console.log(tomorrowInEastern.toString());
      // console.log(tomorrowInEastern);
      //i think i need to make a temporal duration here using the difference between the two times
      setTime(Temporal.Now.zonedDateTimeISO('America/New_York'));
    }, 1000);
    
    return () => {
      clearInterval(myIntervalId);
    };

  }, [])


  return (
    <div>
      {`${time.hour}:${time.minute}:${time.second}`}
    </div>
  );

};