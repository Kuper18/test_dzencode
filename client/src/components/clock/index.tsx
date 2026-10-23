import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.SOCKET_URL;

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [activeSessions, setActiveSessions] = useState(0);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('active-sessions:update', ({ count }) => {
      setActiveSessions(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p className="m-0 text-white">{time.toLocaleTimeString()}</p>
      <p className="m-0 text-white">Active sesstions: {activeSessions}</p>
    </div>
  );
};

export default Clock;
