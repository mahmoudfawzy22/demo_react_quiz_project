import { useEffect, useState } from "react";

export default function QuestionTimer({ timeOut, onTimeOut, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeOut);
  useEffect(() => {
    const time = setTimeout(onTimeOut, timeOut);
    console.log("SET TIMEOUT");
    return () => {
      clearTimeout(time);
    };
  }, [timeOut, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeOut}
      value={remainingTime}
      className={mode}
    />
  );
}
