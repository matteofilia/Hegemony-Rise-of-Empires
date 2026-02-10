const WebSocket = require('ws');

const PORT = 8080;

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server started on ws://localhost:${PORT}`);
});

// Connection event
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send a welcome message
    ws.send(JSON.stringify({ message: 'Welcome to WebSocket server!' }));

    // Receive messages
    ws.on('message', (data) => {
        console.log('Received:', data.toString());

        // Broadcast to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    });

    // Handle close
    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // Handle errors
    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});

