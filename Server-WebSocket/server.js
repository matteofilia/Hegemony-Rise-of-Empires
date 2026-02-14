const WebSocket = require('ws');

import GameState from "../game_state.js";

const PORT = 8080;

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server started on ws://localhost:${PORT}`);
});

var player_turn = 0;
var num_players = 6;

this.player_indices = [0, 0, 0, 0, 0, 0];
this.player_rolls = [0, 0, 0, 0, 0, 0];
this.player_money = [0, 0, 0, 0, 0, 0];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

this.cities = [
    "Vancover",
    "Ottawa",
    "Toronto",
    "Montreal",
    "Halifax",
    "Edmonton",
    "Calgary",
    "Regina",
    "Winnipeg",
    "Kyiv",
    "Moscow",
    "Hong Kong",
    "Singapore",
    "Shenzhen",
    "Shanghai",
    "New York",
    "LA",
    "Houston",
    "Chicago",
    "Dallas",
    "Tokyo",
    "Sydney",
    "London",
    "Paris",
    "Rome",
    "Sao Paulo",
    "Lima",
    "Berlin",
    "Mumbai",
    "Cairo",
    "Lagos",
    "Nairobi",
    "Cape Town",
    "Melbourne",
    "Aukland",
    "Wellington",
    "Miami",
    "Havana",
    "Santiago",
    "Madrid",
    "Milan",
    "Amsterdam",
    "Brussels",
    "Vienna",
    "Prague",
    "Lisbon",
    "Dublin",
    "Stockholm",
    "Oslo",
    "Helsinki",
    "Zurich",
    "Osaka",
    "Seoul",
    "Taipei",
    "Jakarta",
    "Hanoi",
    "Perth",
    "Boston",
    "Detroit",
    "Atlanta",
    "Charlotte",
    "Seattle",
    "Las Vegas"
];

this.selected_cities = [];

this.property_names = [
    null,
    get_random_city(this),
    get_random_city(this),
    get_random_city(this),
    get_random_city(this),
    get_random_city(this),
    get_random_city(this),
    null,
    null,
    get_random_city(this),
    get_random_city(this),
    get_random_city(this),
    null,
    get_random_city(this),
    get_random_city(this),
    get_random_city(this),
    null,
    get_random_city(this),
    get_random_city(this),
    null,
    get_random_city(this),
    get_random_city(this),
    get_random_city(this)
];

function get_random_city(that) {
    while (true) {
        let city = that.cities[randomInt(0, that.cities.length-1)];
        let city_already_exists = false;

        for (let i = 0; i < that.selected_cities.length; i++) {
            if (that.selected_cities[i] == city) {
                city_already_exists = true;
            }
        }

        if (!city_already_exists) {
            that.selected_cities.push(city);
            return city;
        }
    }
}

// Connection event
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send a welcome message
    ws.send(JSON.stringify({ message: 'Test message' }));

    // Receive messages
    ws.on("message", (data) => {
        if (data == "setup") {
            console.log("Data ="+data);
        
            var send_data = {};
            send_data.type = "properties_setup";
            send_data.data = this.property_names;
            ws.send(JSON.stringify(send_data));
        }
        
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

