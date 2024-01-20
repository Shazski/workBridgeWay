import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const initialSeconds = 120; // 2 minutes
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    // Clear the interval when the component unmounts or when seconds reach 0
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div>
        { seconds > 0 ? (

            <h1>{formatTime(seconds)}</h1>
            ):(
                <button className='bg-blue-400 rounded-md px-2 py-1 text-white text-xs font-medium'>Resend otp</button>
            )
        }
    </div>
  );
};

export default CountdownTimer;
