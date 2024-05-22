require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000; // Use environment variable PORT
const io = socketIo(server, {
  cors: {
    origin: "https://check-app-fm9f.vercel.app/", // Update to your frontend's Vercel URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Handle client connections
io.on('connection', (socket) => {
    console.log('A new user connected');

    // Handle client disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    // Handle incoming messages from clients
    socket.on('message', (message) => {
        try {
            console.log('Received message:', message);
            // Broadcast the message to all clients
            io.emit('message', message);
        } catch (error) {
            console.error('Error broadcasting message:', error.message);
        }
    });
});

// Start the server and listen for incoming connections
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
