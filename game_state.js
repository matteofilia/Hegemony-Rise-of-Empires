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
        
        // Initialize all items to zero
        for (let i = 0; i < num_players; i++) {
            this.player_indices[i] = 0;
            this.player_future_indices[i] = 0;
            this.player_money[i] = 0;
            this.player_num_properties[i] = 0;
            this.player_num_countries[i] = 0;
            this.random_offset[i] = 0;
        }
    }
    
    update_player_position(player, future_position) {
        // $500 squares
        if (future_position == 7 || future_position == 19) {
            this.player_money[player] += 500;
        }
    }
}

module.exports = {GameState};