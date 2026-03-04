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
    null,
    600,
    600,
    600
];

class GameState {
    constructor(context, num_players) { 
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
        
        this.player_chance_cards = Array(num_players);
        
        this.current_dice_roll_1 = 0;
        this.current_dice_roll_2 = 0;
        
        this.INITIAL_RENT = context.INITIAL_RENT;
        this.MAX_CHANCE_CARDS = context.MAX_CHANCE_CARDS;
        this.RENT_INCREASE_PER_PASS_GO = context.RENT_INCREASE_PER_PASS_GO;
        this.PASS_GO_MONEY = context.PASS_GO_MONEY;
        
        this.rent_cost = this.INITIAL_RENT;
        
        this.UNIT_BUY_COST_MIN = context.UNIT_BUY_COST_MIN;
        this.UNIT_BUY_COST_MAX = context.UNIT_BUY_COST_MAX;
        
        this.unit_buy_cost = this.UNIT_BUY_COST_MIN;
        
        // TODO: make static
        this.NO_OWNER = -1;
                
        // Initialize all items to zero
        for (let i = 0; i < num_players; i++) {
            this.player_indices[i] = 0;
            this.player_future_indices[i] = 0;
            this.player_money[i] = 0;
            
            // Initialize Chance Cards
            this.player_chance_cards[i] = Array(this.MAX_CHANCE_CARDS);
            for (let a = 0; a < this.MAX_CHANCE_CARDS; a++){
                this.player_chance_cards[i][a] = null;
            }
            
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
            null,
            this.NO_OWNER,
            this.NO_OWNER,
            this.NO_OWNER
        ];
    }
    
    update_pass_go(player) {
        // Each time go is passed, increase the rent cost
        this.rent_cost += this.RENT_INCREASE_PER_PASS_GO;
        this.player_money[player] += this.PASS_GO_MONEY;
    }
    
    update_unit_cost(buy) {
        this.unit_buy_cost = buy;
    }
    
    update_player_position(player, future_position) {
        // $500 squares
        if (future_position == 7) {
            this.player_money[player] += this.CORNER_MONEY_B;
        } else if (future_position == 19) {
            this.player_money[player] += this.CORNER_MONEY_A;
        } else if (future_position == 8 || future_position == 16 || future_position == 20) {
            this.draw_chance_card(player);
        } 
        else {
            this.buy_property(player, future_position);
        }
    }
    
    draw_chance_card(player) {
        for (let i = 0; i < this.MAX_CHANCE_CARDS; i++) {
            if (this.player_chance_cards[player][i] == null) {
                this.player_chance_cards[player][i] = "Test Card";
                return;
            }
        }
    }
    
    update_properties() {        
        for (let i = 0; i < this.num_players; i++) {
            this.player_num_properties[i] = 0;
            
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
    
    // Rent is always HALF of the cost of a property
    // TODO: factor buildings into rent
    calculate_rent(property_index) {
        let rent = 0;
        
        if (PROPERTY_COSTS[property_index] != null) {
            return PROPERTY_COSTS[property_index] / 2;
        }
    }
    
    check_pay_rent(player, property_index) {
        if (this.properties[property_index] != null) {
            let owner = this.properties[property_index];
            
            if (owner != this.NO_OWNER) {
                if (this.player_money[player] < this.rent_cost) {
                    this.player_money[owner] = this.player_money[player];
                    this.player_money = 0;
                } else {
                    this.player_money[owner] += this.rent_cost;
                    this.player_money -= this.rent_cost;
                }
            }
        }
    }
}

module.exports = {GameState};