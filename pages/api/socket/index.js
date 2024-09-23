// pages/api/socket.js
import { Server } from 'socket.io';

let games = {};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      cors: {
        origin: "*",
      },
    });
    io.setMaxListeners(20);

    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      // Create a new game and generate a unique PIN
      socket.on('createGame', (callback) => {
        const pin = Math.floor(1000 + Math.random() * 9000);
        games[pin] = { player1: socket.id, player2: null, state: 'waiting' };
        console.log(games[pin]);
        socket.join(pin);
        callback(pin);
      });

      // Join an existing game using the PIN
      socket.on('joinGame', (pin) => {
        console.log(games[pin])
        if (games[pin] && games[pin].player2 === null) {
          games[pin].player2 = socket.id;
          socket.join(pin);
          io.to(pin).emit('gameStart');
          callback(true);
        } else{
          callback(false);
        }
      });

      socket.on('agreeToDraw', (pin) => {
        console.log(pin)
        const game = games[pin];
        if (game && game.state === 'waitingDraw') {
          io.to(pin).emit('draw');
        } else {
          game.state = 'waitingDraw';
          io.to(pin).emit('requestDraw');
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
    console.log('WebSocket server started');
  } else {
    console.log('WebSocket server already running');
  }
  res.end();
}
