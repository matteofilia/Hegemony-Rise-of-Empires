let PROPERTY_COSTS = [
    null,
    400,
    400,
    400,
    400,
    350,
    350,
    null,
    null,
    250,
    250,
    250,
    null,
    500,
    500,
    500,
    null,
    300,
    300,
    null,
    600,
    600,
    600
];

class GameState {
    constructor(num_players) {
        this.num_players = num_players;
        
        this.player_money = new Array(num_players);
        this.player_num_properties = new Array(num_players);
        this.player_num_countries = new Array(num_players);

        this.player_turn = 0;
        this.active_player = 0;
        
        this.player_indices = Array(num_players);
        this.player_future_indices = Array(num_players);
        this.player_money = Array(num_players);
        
        this.random_offset = Array(num_players);
        
        this.current_dice_roll_1 = 0;
        this.current_dice_roll_2 = 0;
        
        // TODO: make static
        this.NO_OWNER = -1;
        
        // Initialize all items to zero
        for (let i = 0; i < num_players; i++) {
            this.player_indices[i] = 0;
            this.player_future_indices[i] = 0;
            this.player_money[i] = 0;
            
            // TODO: debug
            this.player_money[i] = 2000;
            
            this.player_num_properties[i] = 0;
            this.player_num_countries[i] = 0;
            this.random_offset[i] = 0;
        }
        
        this.properties = this.properties = [
            null,
            this.NO_OWNER,
            this.NO_OWNER,
            this.NO_OWNER,
            this.NO_OWNER,
            this.NO_OWNER,
            this.NO_OWNER,
            null,
            null,
            this.NO_OWNER,
            this.NO_OWNER,
            this.NO_OWNER,
            null,
            this.NO_OWNER,
            this.NO_OWNER,
            this.NO_OWNER,
            null,
            this.NO_OWNER,
            this.NO_OWNER,
            null,
            this.NO_OWNER,
            this.NO_OWNER,
            this.NO_OWNER
        ];
    }
    
    update_player_position(player, future_position) {
        // Position bounds check
        if (future_position > 23) {
            future_position -= 24;
        }
        
        // $500 squares
        if (future_position == 7 || future_position == 19) {
            this.player_money[player] += 500;
        } else {
            this.buy_property(player, future_position);
        }
    }
    
    update_properties() {
        for (let i = 0; i < this.num_players; i++) {
            this.player_num_countries[i] = 0;
            
            for (let a = 0; a < 24; a++) {
                if (this.properties[a] == i) {
                    this.player_num_properties[i] += 1;
                } 
            }
        }
    }
    
    buy_property(player, property_index) {
        if (this.properties[property_index] != null) {
            if (this.player_money[player] >= PROPERTY_COSTS[property_index] && this.properties[property_index] == this.NO_OWNER) {
                this.player_money[player] -= PROPERTY_COSTS[property_index];
                this.properties[property_index] = player;
            }
        }
        
        this.update_properties();
    }
}

module.exports = {GameState, PROPERTY_COSTS, };