import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer({ timeSeconds }: any) {
  const [seconds, setSeconds] = useState(timeSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds: any) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timerStyles: any = {
    '--progress': `${((60 - seconds) / 60) * 100}%`,
  };

  return (
    <div className='timer row w-100 justify-content-end'>
      <div className='circle' style={timerStyles}>
        <div className='time'>{seconds}</div>
      </div>
    </div>
  );
}

export default Timer;
