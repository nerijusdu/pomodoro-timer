import { useEffect, useState } from "react";
import Button from "./button";

const SESSION_TIME = 25 * 60 * 1000;
const BREAK_TIME = 5 * 60 * 1000;

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor(time % 60000) / 1000;
  const leadingMinZero = minutes < 10 ? '0' : '';
  const leadingSecZero = seconds < 10 ? '0' : '';
  return `${leadingMinZero}${minutes}:${leadingSecZero}${seconds}`;
};

const Timer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const startTimer = (time: number) => {
    setIsRunning(true);
    setTimeLeft(time);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(x => {
          const newTime = x - 1000;
          if (newTime <= 0) {
            setIsRunning(false); // TODO: show message when done
            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div>
      {isRunning && (
        <div className="flex flex-col gap-4 justify-center items-center">
          {formatTime(timeLeft)}
          <Button onClick={stopTimer}>
            Stop Timer
          </Button>
        </div>
      )}
      {!isRunning && (
        <div className="flex gap-4">
          <Button variant="primary" onClick={() => startTimer(SESSION_TIME)}>
            Start Sesion
          </Button>
          <Button onClick={() => startTimer(BREAK_TIME)}>
            Start Break
          </Button>
        </div>
      )}
    </div>
  );
};

export default Timer;
