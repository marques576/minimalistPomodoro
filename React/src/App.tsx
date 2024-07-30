import { useState, useEffect, useRef } from 'react'

function App() {

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  
  const initialTime = 1500; // 25 min
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStartPomodoro = () => {
    playAudio()
    setTimeRemaining(1500); // 25 min
  };

  const handleStartShortBreak = () => {
    playAudio()
    setTimeRemaining(300); // 5 min
  };

  const handleStartLongBreak = () => {
    playAudio()
    setTimeRemaining(900); // 15 min
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          //when 0
          playAudio()
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
    <audio ref={audioRef}>
        <source src="/pling.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p>Time remaining: {formatTime(timeRemaining)}</p>
      <button onClick={handleStartPomodoro}>Pomodoro</button>
      <button onClick={handleStartShortBreak}>Short Break</button>
      <button onClick={handleStartLongBreak}>Long Break</button>
    </>
  )
}

export default App
