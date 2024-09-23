import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';

let socket;

export default function Game() {
  const router = useRouter();
  const { pin } = router.query;

  const [word, setWord] = useState('');
  const [maskedWord, setMaskedWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [turn, setTurn] = useState('player1'); // track turns
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameResult, setGameResult] = useState('');
  const [playerRole, setPlayerRole] = useState(''); // player1 or player2
  const [gameStarted, setGameStarted] = useState(false); // To track if the game has started
  const [drawRequested, setDrawRequested] = useState(false);

  useEffect(() => {
    socket = io('http://localhost:3001');

    // fetch('/api/socket'); // Initialize socket API

    // Determine role and join the game room
    socket.on('connect', () => {
      if (pin) {
        const role = playerRole || (confirm('Are you Player 1?') ? 'player1' : 'player2');
        setPlayerRole(role);
        socket.emit('joinGame', pin, role);
      }
    });

    // Listen for the players ready event
    socket.on('playersReady', () => {
      console.log('Both players are ready');
      if (playerRole === 'player1') {
        alert('You are Player 1. Please set the word to start the game.');
      } else {
        alert('You are Player 2. Waiting for Player 1 to start the game.');
      }
    });

    // Listen for game start
    socket.on('gameStart', (maskedWord) => {
      setMaskedWord(maskedWord);
      setGameStarted(true);
      setTurn('player2'); // Player 2 should start guessing
    });

    // Handle word updates (Player 2 guesses)
    socket.on('wordUpdated', (updatedMaskedWord, guessedLetters) => {
      setMaskedWord(updatedMaskedWord);
      setGuessedLetters(guessedLetters);
      setTurn('player1'); // Switch turn back to Player 1
    });

    // Listen for draw requests
    socket.on('draw', () => {
      setGameResult('The game ended in a draw');
    });

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, [pin, playerRole]);

  const handleWordSubmit = () => {
    const masked = word.replace(/./g, '_');
    console.log(masked)
    socket.emit('setWord', pin, masked, word);
    setTurn('player2');
  };

  const handleGuessSubmit = () => {
    const updatedGuessedLetters = [...guessedLetters, currentGuess];

    const updatedMaskedWord = word.split('').map((letter) =>
      updatedGuessedLetters.includes(letter) ? letter : '_'
    ).join('');

    setMaskedWord(updatedMaskedWord);
    setGuessedLetters(updatedGuessedLetters);

    if (updatedMaskedWord === word) {
      setGameResult('Player 2 wins!');
    } else {
      socket.emit('wordUpdated', pin, updatedMaskedWord, updatedGuessedLetters);
      setTurn('player1');
    }

    setCurrentGuess('');
  };

  const agreeToDraw = () => {
    socket.emit('agreeToDraw', pin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Game PIN: {pin}</h1>

      {gameResult ? (
        <p className="text-2xl font-bold text-green-600">{gameResult}</p>
      ) : (
        <>
          {!gameStarted && playerRole === 'player1' ? (
            <div>
              <input
                type="text"
                placeholder="Enter a word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="border-2 border-gray-400 p-2 rounded-md mb-4"
              />
              <button
                onClick={handleWordSubmit}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Start Game
              </button>
            </div>
          ) : (
            <div>
              <h2>Guess the word: {maskedWord}</h2>
              {turn === 'player2' && (
                <input
                  type="text"
                  placeholder="Guess a letter"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value)}
                  maxLength={1}
                  className="border-2 border-gray-400 p-2 rounded-md mt-4"
                />
              )}
              <button
                onClick={handleGuessSubmit}
                className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-600"
              >
                Submit Guess
              </button>
            </div>
          )}

          <button
            onClick={agreeToDraw}
            className="bg-red-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-red-600"
          >
            Agree to Draw
          </button>
        </>
      )}
    </div>
  );
}
