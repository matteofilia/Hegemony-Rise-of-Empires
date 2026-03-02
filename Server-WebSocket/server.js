const WebSocket = require('ws');
const GameState = require('../game_state.js');

const PORT = 8080;

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server started on ws://localhost:${PORT}`);
});

this.num_players = 6;
this.game_state = new GameState.GameState(this.num_players);

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

// Initialize random offset
for (let i = 0; i < this.game_state.num_players; i++) {
    this.game_state.random_offset[i] = randomInt(-32, 32);
}

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
let that = this;

let web_sockets = [];

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send a welcome message
    ws.send(JSON.stringify({ message: 'Test message' }));

    // Receive messages
    ws.on("message", (data) => {
        if (data == "setup") {
            console.log("Data ="+data);
        
            let send_data = {};
            send_data.type = "setup";
            send_data.data = {};
            send_data.data.property_names = this.property_names;
            ws.send(JSON.stringify(send_data));
        } else if (data == "next turn") {
            let curr_index = this.game_state.player_indices[this.game_state.player_turn];
            let next_index_add = this.game_state.player_future_indices[this.game_state.player_turn];
            
            this.game_state.player_indices[this.game_state.player_turn] = curr_index + next_index_add;
            
            this.game_state.player_future_indices[this.game_state.player_turn] = 0;
            
            this.game_state.player_turn += 1;
            if (this.game_state.player_turn >= this.game_state.num_players) {
                this.game_state.player_turn = 0;
            }
            
            this.game_state.current_dice_roll_1 = randomInt(1, 6); 
            this.game_state.current_dice_roll_2 = randomInt(1, 6);
            console.log(`Player ${this.game_state.player_turn+1} rolled ${this.game_state.current_dice_roll_1} and ${this.game_state.current_dice_roll_2}`);
            this.game_state.random_offset[this.game_state.player_turn] = randomInt(-32, 32);
            
            let player_turn = this.game_state.player_turn;
            this.game_state.player_future_indices[player_turn] = this.game_state.current_dice_roll_1 + this.game_state.current_dice_roll_2;
            
            let future_position = this.game_state.player_indices[player_turn]+this.game_state.player_future_indices[player_turn];
            if (future_position >= 24) {
                this.game_state.update_pass_go(player_turn);
            }
            this.game_state.player_indices[player_turn] = this.game_state.player_indices[player_turn] % 24;
            this.game_state.update_player_position(player_turn, future_position);
            
            let send_data = {};
            send_data.type = "update";
            send_data.data = {};
            send_data.data.game_state = this.game_state;
            console.log(JSON.stringify(send_data, null, 2));
            
            ws.send(JSON.stringify(send_data));
        }
        
        /*
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
        */
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

