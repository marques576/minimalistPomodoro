import { useState, useEffect } from 'react'


function App() {
  
  const initialTime = 1500; // 10 min
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStartPomodoro = () => {
    setTimeRemaining(1500); // 25 min
  };

  const handleStartShortBreak = () => {
    setTimeRemaining(300); // 5 min
  };

  const handleStartLongBreak = () => {
    setTimeRemaining(900); // 15 min
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          //when 0
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    document.title = formatTime(timeRemaining)

    return () => clearInterval(intervalId);

  }, [timeRemaining]);

  return (
    <>
    <h1>Pomodoro</h1>
      <p>Time remaining: {formatTime(timeRemaining)}</p>
      <button onClick={handleStartPomodoro}>Pomodoro</button>
      <button onClick={handleStartShortBreak}>Short Break</button>
      <button onClick={handleStartLongBreak}>Long Break</button>
    </>
  )
}

export default App
