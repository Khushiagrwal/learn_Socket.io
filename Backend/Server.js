
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// Create an Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.IO server and set CORS options
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(cors());

// Handle connection event
io.on('connection', (socket) => {
  console.log('User Connected');

  socket.on('drawing', (data) => {
    // console.log("first")
    io.emit('drawing', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
