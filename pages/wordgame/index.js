import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';

let socket;

export default function Home() {
  const [gamePin, setGamePin] = useState('');
  const [joinPin, setJoinPin] = useState('');
  const router = useRouter();

  useEffect(() => {
    socket = io("http://localhost:3001");
    // fetch('/api/socket'); // Ensure that the WebSocket server is initialized
  }, []);

  const createGame = () => {
    socket.emit('createGame', (pin) => {
      console.log(pin);
      setGamePin(pin);
    });

    // When the second player joins, navigate to the game page
    socket.on('gameStart', () => {
      console.log("any thing here")
      router.push(`/game?pin=${gamePin}`);
    });
  };
  

  const joinGame = () => {
    socket.emit('joinGame', joinPin, (success) => {
      if (success) {
        router.push(`/game?pin=${joinPin}`);
      } else {
        alert('Invalid PIN');
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Word Game</h1>

      {gamePin ? (
        <div>
          <p className="text-lg text-green-600">Game created! Your PIN is: {gamePin}</p>
        </div>
      ) : (
        <button
          onClick={createGame}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create Game
        </button>
      )}

      <div className="mt-8">
        <h2 className="text-xl">Join Game</h2>
        <input
          type="text"
          className="border-2 border-gray-400 p-2 rounded-md mt-2"
          placeholder="Enter PIN"
          value={joinPin}
          onChange={(e) => setJoinPin(e.target.value)}
        />
        <button
          onClick={joinGame}
          className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-600 transition"
        >
          Join Game
        </button>
      </div>
    </div>
  );
}
