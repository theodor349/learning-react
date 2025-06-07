'use client'
import React, {useEffect, useState} from "react";

export function CurrentTimeDisplay() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Calculate milliseconds until the next full minute
    const seconds = now.getSeconds();
    const millisecondsToNextMinute = (60 - seconds) * 1000;

    // Set a timeout to update at the start of the next minute
    const initialTimeout = setTimeout(() => {
      setNow(new Date()); // Update immediately to the new minute
      // Then, set an interval to update every minute thereafter
      const interval = setInterval(() => {
        setNow(new Date());
      }, 60 * 1000); // Every minute
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, millisecondsToNextMinute);

    return () => clearTimeout(initialTimeout); // Cleanup initial timeout on unmount
  }, [now]); // Re-run effect when `now` changes, to reset the timeout for the next minute


  const hour = now.getHours();
  const minutes = now.getMinutes();

  const dayProgressed = (hour * 60 + minutes) / 1440;
  const heightPerHour = 160;
  const totalContentHeight = 24 * heightPerHour;
  const currentLineTopPosition = dayProgressed * totalContentHeight - 3;

  return (
    <div className={'relative z-10 border-b-4 border-dotted border-red-500 ml-10'}
         style={{
           top: `${currentLineTopPosition}px`,
         }}
    ></div>
  );
}