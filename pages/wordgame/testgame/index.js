// pages/index.js
import { useState, useEffect } from 'react';
import Confetti from "react-confetti";
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import Link from 'next/link';

let socket;

export default function Home() {
  const [gamePin, setGamePin] = useState('');
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [gameStatus, setGameStatus] = useState(null);
  const [player, setPlayer] = useState('');
  const [pin, setpin] = useState(false);
  const [wor, setWor] = useState(false);
  const [won, setWon] = useState(false);
  const router = useRouter();
  const { pins } = router.query;

  useEffect(() => {
    console.log(pins)
    socketInitializer(pins);
  }, []);

  const socketInitializer = async (pins) => {
    // await fetch('/api/socket');
    socket = io("http://localhost:3001");

    socket.on('playerJoined', (data) => {
      setGameStatus(`${data.opponent} has joined the game`);
    });

    socket.on('startGuessing', (data) => {
      setGameStatus(`Start guessing! Opponent's word length: ${data.opponentWordLength}`);
    });

    socket.on('yourTurn', (data) => {
      setGameStatus(`Your opponent guessed: ${data.guessedWord}`);
    });
    socket.on('checkGuess', (data) => {
      console.log(data)
      setGameStatus(`Correct Postion: ${data.check.correctPosition} And Correct Number: ${data.check.correctNumber}`)
    })

    socket.on('gameOver', (data) => {
      setGameStatus(`${data.winner} has won the game!`);
      console.log(player)
      if (data.winner == player){
        console.log("I am the winner")
      }
      setWon(true);
    });
    if (pins){
      console.log("it is working")
      socket.emit('joinGame', pins, (response) => {
        if (response.success) {
          setPlayer('Player 2');
          setpin(true);
        } else {
          // setGameStatus(response.message);
          // alert("invaild pin")
        }
      });
    }
  };

  const createGame = () => {
    socket.emit('createGame', ({ gamePin }) => {
      setGamePin(gamePin);
      setPlayer('Player 1');
      setpin(true);
    });
  };

  const joinGame = (pin) => {
    socket.emit('joinGame', pin, (response) => {
      if (response.success) {
        setPlayer('Player 2');
        setpin(true);
      } else {
        setGameStatus(response.message);
        alert("invaild pin")
      }
    });
  };

  const submitWord = () => {
    socket.emit('submitWord', gamePin, word, (response) => {
      setGameStatus('Word submitted');
      setWor(true);
    });
  };

  const submitGuess = () => {
    socket.emit('guessWord', gamePin, guess, (response) => {
      setGuess("")
      // setGameStatus('Guess submitted');
      setWor(true);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-4">Number Guessing Game</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2 text-center">
        {!pin && (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={createGame}
            >
              Create Game
            </button>
            <div className="mt-4">
              <input
                className="border p-2 rounded-md"
                placeholder="Enter Game PIN to join"
                onChange={(e) => setGamePin(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-green-700"
                onClick={() => joinGame(gamePin)}
              >
                Join Game
              </button>
            </div>
          </>
        )}
        {pin && (
          <>
            <p className="mb-4">Game PIN: {gamePin}</p>
            <p className="mb-4">{gameStatus}</p>

            {!wor && (
              <div className="mb-4">
                <input
                type="number"
                  className="border p-2 rounded-md"
                  placeholder="Enter your word"
                  onChange={(e) => setWord(e.target.value)}
                />
                <button
                  className="bg-yellow-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-yellow-700"
                  onClick={submitWord}
                >
                  Submit Word
                </button>
              </div>
            )}

            {wor && (
              <div>
              {!won && (<div className="mb-4">
                <input
                type="number"
                  className="border p-2 rounded-md"
                  placeholder="Guess opponent's word"
                  onChange={(e) => setGuess(e.target.value)}
                />
                <button
                  className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-700"
                  onClick={submitGuess}
                >
                  Submit Guess
                </button>
              </div>)}
              {
                won && (
                  <div>
                  <Link href={'/'} className='bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-700'>
                  Back to Home
                  </Link>
                  <Confetti /></div>
                )
              }
              
              
              
              </div>
              
            )}
          </>
        )}
      </div>
    </div>
  );
}
