import { useState, useEffect } from "react";

const Timer = ({ setStop, questionNumber, selectedAnswer, isPaused }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!isPaused && timer === 0) return setStop(true);

    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [setStop, timer, selectedAnswer, isPaused]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
};
export default Timer;
