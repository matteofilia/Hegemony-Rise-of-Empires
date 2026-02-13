const WebSocket = require('ws');

const PORT = 8080;

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server started on ws://localhost:${PORT}`);
});

var player_turn = 0;
var num_players = 6;

// Connection event
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send a welcome message
    ws.send(JSON.stringify({ message: 'Test message' }));

    // Receive messages
    ws.on("message", (data) => {
        console.log('Received:', data.toString());
        
        var next_data = {};
        player_turn += 1;
        if (player_turn >= num_players) {
            player_turn = 0;
        }
        next_data.type = "next_turn";
        next_data.player_turn = player_turn;
        
        console.log("Data: "+next_data);
        ws.send(JSON.stringify(next_data));
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

