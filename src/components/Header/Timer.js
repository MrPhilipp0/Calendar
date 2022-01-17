import React, { useEffect, useState } from 'react';

const Timer = () => {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime(time => new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [time])

  return ( 
    <div className="me-3 display-6">
      <label>{time.getHours()}</label>
      :
      {time.getMinutes() < 10 ? <label>0{time.getMinutes()}</label> : <label>{time.getMinutes()}</label>}
    </div>
   );
}
 
export default Timer;