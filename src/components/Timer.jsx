import React, { useState, useEffect } from 'react';

const Timer = ({ isRunning, onTimeUpdate, resetTime }) => {
  const [time, setTime] = useState(0);

  // Reset timer when resetTime prop changes
  useEffect(() => {
    if (resetTime) {
      setTime(0);
      onTimeUpdate(0);
    }
  }, [resetTime, onTimeUpdate]);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <div className="timer-icon">⏱️</div>
      <span className="stat-label">Time</span>
      <div className="timer-text">{formatTime(time)}</div>
    </div>
  );
};

export default Timer; 