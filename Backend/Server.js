import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// Create an Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.IO server and bind it to the HTTP server
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle connection event
io.on('connection', (socket) => {
    console.log('A user connected');
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
