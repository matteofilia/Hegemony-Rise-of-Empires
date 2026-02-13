class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        // Load assets here
        this.load.image("risk_map", "risk.png");

        this.load.image("dice_1", "dice_1.png");
        this.load.image("dice_2", "dice_2.png");
        this.load.image("dice_3", "dice_3.png");
        this.load.image("dice_4", "dice_4.png");
        this.load.image("dice_5", "dice_5.png");
        this.load.image("dice_6", "dice_6.png");

        this.load.html("modal-yes-or-no", "modal-yes-or-no.html");
    }

    dice_image(that, roll, x, y, container) {
        var dice = that.add.image(x, y, `dice_${roll}`).setOrigin(0.5);
        container.add(dice);
    }
    
    dice_text(that, container) {
        let ui_3_container_text = this.add.text((that.UI_3_WIDTH/2), 4+14, "Press SPACE to roll dice", text_style_black_word_wrap);
        container.add(ui_3_container_text);
        ui_3_container_text.setOrigin(0.5);
    }

    create() {
        // TODO: figure out why cam2 and cam3 cause html to hide from view
        this.add.dom(400, 300).createFromCache("modal-yes-or-no");

        this.cam = this.cameras.main;
        this.zoomDirection = 1;
        this.cam.setZoom(1);
        this.cam.setBounds(-600, -600, 800 + 1200, 1200 + 1200);

        this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            this.cam.zoom -= deltaY * 0.001;
            this.cam.zoom = Phaser.Math.Clamp(this.cam.zoom, 0.5, 2);
        });

        // Enable dragging
        this.input.on("pointerdown", (pointer) => {
            this.dragStartX = pointer.x + this.cam.scrollX;
            this.dragStartY = pointer.y + this.cam.scrollY;
            this.isDragging = true;
        });

        this.input.on("pointerup", () => {
            this.isDragging = false;
        });

        this.input.on("pointermove", (pointer) => {
            if (!this.isDragging) return;
            this.cam.scrollX = this.dragStartX - pointer.x;
            this.cam.scrollY = this.dragStartY - pointer.y;
        });

        this.add
            .text(400, 300, "Hello Phaser", {
                fontSize: "32px",
                color: "#ffffff"
            })
            .setOrigin(0.5);

        this.convert_board_index_to_x_y = function (entity, board_index) {
            board_index = board_index % 24;
            var coords = [];

            if (board_index >= 0 && board_index <= 7) {
                coords = [750 - board_index * 100, 550];
            } else if (board_index >= 7 && board_index <= 12) {
                coords = [50, 550 - (board_index - 7) * 100];
            } else if (board_index >= 12 && board_index <= 19) {
                coords = [50 + (board_index - 12) * 100, 50];
            } else if (board_index >= 19 && board_index <= 24) {
                coords = [750, 50 + (board_index - 19) * 100];
            }

            entity.x = coords[0];
            entity.y = coords[1];
        };

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
            "Perth"
        ];

        this.selected_cities = [];

        function get_random_city(that) {
            while (true) {
                let city = that.cities[Phaser.Math.Between(0, that.cities.length - 1)];
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

        this.PROPERTY_COSTS = [
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

        this.NO_OWNER = -1;

        this.TOTAL_PROPERTIES = 17;
        this.TOTAL_COUNTRIES = 23;

        this.properties = [
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

        this.VIEWPORT_WIDTH = 800;
        this.VIEWPORT_HEIGHT = 600;

        function get_properties_ownership_percentage(context, properties, player) {
            var count = 0;

            for (let i = 0; i < properties.length; i++) {
                if (properties[i] != null && properties[i] == colour) {
                    count += 1;
                }
            }

            return count / context.TOTAL_PROPERTIES;
        }

        this.RESOLUTION = 3;

        this.get_property_cost = function (board_index) {
            return this.PROPERTY_COSTS[board_index];
        };

        this.keys = this.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D",
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            one: Phaser.Input.Keyboard.KeyCodes.ONE,
            two: Phaser.Input.Keyboard.KeyCodes.TWO
        });

        this.SUBTEXT_SPACING = 20;

        this.player_colours = [green, orange, pink, red, purple, brown];

        this.player_turn = 0;

        load_game_board(this);

        // const risk_map = this.add.image(400, 300, "risk_map");
        // risk_map.setOrigin(0.5);

        // Player Markers
        this.player_marker_1 = this.add.circle(750, 150 + Phaser.Math.Between(-20, 20), 16, this.player_colours[0]);
        this.player_marker_2 = this.add.circle(750, 150 + Phaser.Math.Between(-20, 20), 16, this.player_colours[1]);
        this.player_marker_3 = this.add.circle(50, 350 + Phaser.Math.Between(-20, 20), 16, this.player_colours[2]);
        this.player_marker_4 = this.add.circle(50, 450 + Phaser.Math.Between(-20, 20), 16, this.player_colours[3]);
        this.player_marker_5 = this.add.circle(150 + Phaser.Math.Between(-20, 20), 50, 16, this.player_colours[4]);
        this.player_marker_6 = this.add.circle(450 + Phaser.Math.Between(-20, 20), 50, 16, this.player_colours[5]);

        this.player_money = [500, 200, 0, 700, 750, 0];

        this.player_properties = [0, 4, 0, 3, 1, 0];

        this.player_countries = [5, 0, 7, 3, 1, 0];
        
        class GameState {
            costructor(num_players) {
                this.money = new Array(num_players);
                this.num_properties = new Array(num_players);
                this.num_countries = new Array(num_players);
            }
        }

        this.UI_START_X = 3000;
        this.UI_START_Y = 3000;

        this.UI_2_START_X = 6000;
        this.UI_2_START_Y = 6000;

        this.UI_3_START_X = 8000;
        this.UI_3_START_Y = 8000;

        this.UI_MONEY_SPACING = 84;
        this.UI_INDICATOR_SPACING = 48;
        this.UI_INDICATOR_SIZE = 16;
        this.UI_VERTICAL_ADJUST = 16;

        function player_text(that, player) {
            let money = that.player_money[player];
            let properties = that.player_properties[player];
            let countries = that.player_countries[player];

            let properties_percentage = properties / that.TOTAL_PROPERTIES;
            let countries_percentage = countries / that.TOTAL_COUNTRIES;

            let text = `Player ${player + 1}\nMoney: \$${money}\nProperties: ${properties} (${(properties_percentage * 100).toFixed(1)}%)\nCountries: ${countries} (${(countries_percentage * 100).toFixed(1)}%)`;

            return text;
        }

        function player_turn_text(that, player) {
            return `Player ${player + 1}\'s Turn `;
        }

        const ui_text_player_money_1 = this.add.text(
            this.UI_INDICATOR_SPACING,
            this.UI_MONEY_SPACING * 0 + this.UI_VERTICAL_ADJUST,
            player_text(this, 0),
            text_style_white
        );
        const ui_text_player_money_2 = this.add.text(
            this.UI_INDICATOR_SPACING,
            this.UI_MONEY_SPACING * 1 + this.UI_VERTICAL_ADJUST,
            player_text(this, 1),
            text_style_white
        );
        const ui_text_player_money_3 = this.add.text(
            this.UI_INDICATOR_SPACING,
            this.UI_MONEY_SPACING * 2 + this.UI_VERTICAL_ADJUST,
            player_text(this, 2),
            text_style_white
        );
        const ui_text_player_money_4 = this.add.text(
            this.UI_INDICATOR_SPACING,
            this.UI_MONEY_SPACING * 3 + this.UI_VERTICAL_ADJUST,
            player_text(this, 3),
            text_style_white
        );
        const ui_text_player_money_5 = this.add.text(
            this.UI_INDICATOR_SPACING,
            this.UI_MONEY_SPACING * 4 + this.UI_VERTICAL_ADJUST,
            player_text(this, 4),
            text_style_white
        );
        const ui_text_player_money_6 = this.add.text(
            this.UI_INDICATOR_SPACING,
            this.UI_MONEY_SPACING * 5 + this.UI_VERTICAL_ADJUST,
            player_text(this, 5),
            text_style_white
        );

        this.ui_player_marker_1 = this.add.circle(
            this.UI_INDICATOR_SIZE,
            this.UI_MONEY_SPACING * 0 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[0]
        );
        this.ui_player_marker_2 = this.add.circle(
            this.UI_INDICATOR_SIZE,
            this.UI_MONEY_SPACING * 1 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[1]
        );
        this.ui_player_marker_3 = this.add.circle(
            this.UI_INDICATOR_SIZE,
            this.UI_MONEY_SPACING * 2 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[2]
        );
        this.ui_player_marker_4 = this.add.circle(
            this.UI_INDICATOR_SIZE,
            this.UI_MONEY_SPACING * 3 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[3]
        );
        this.ui_player_marker_5 = this.add.circle(
            this.UI_INDICATOR_SIZE,
            this.UI_MONEY_SPACING * 4 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[4]
        );
        this.ui_player_marker_6 = this.add.circle(
            this.UI_INDICATOR_SIZE,
            this.UI_MONEY_SPACING * 5 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[5]
        );

        this.UI_WIDTH = 280;
        this.UI_HEIGHT = 600;

        this.UI_2_WIDTH = 280;
        this.UI_2_HEIGHT = 600;

        this.UI_3_WIDTH = 250;
        this.UI_3_HEIGHT = 150;

        this.ui_text_player_turn = this.add
            .text(
                 this.UI_WIDTH / 2,
                 (this.UI_HEIGHT - 32),
                player_turn_text(this, this.player_turn),
                text_style_white_large
            )
            .setOrigin(0.5);

        this.ui_1_container = this.add.container(this.UI_START_X, this.UI_START_Y);
        this.ui_1_container.add(this.ui_player_marker_1);
        this.ui_1_container.add(this.ui_player_marker_2);
        this.ui_1_container.add(this.ui_player_marker_3);
        this.ui_1_container.add(this.ui_player_marker_4);
        this.ui_1_container.add(this.ui_player_marker_5);
        this.ui_1_container.add(this.ui_player_marker_6);
        this.ui_1_container.add(ui_text_player_money_1);
        this.ui_1_container.add(ui_text_player_money_2);
        this.ui_1_container.add(ui_text_player_money_3);
        this.ui_1_container.add(ui_text_player_money_4);
        this.ui_1_container.add(ui_text_player_money_5);
        this.ui_1_container.add(ui_text_player_money_6);
        this.ui_1_container.add(this.ui_text_player_turn);
        
        this.cam2 = this.cameras.add(0, 0, this.UI_WIDTH, this.UI_HEIGHT);
        this.cam2.setBackgroundColor(darker_grey);
        this.cam2.setZoom(1);
        this.cam2.setScroll(this.UI_START_X, this.UI_START_Y);

        
        class Card {
            constructor(name, effect_description) {
                this.name = name;
                this.effect_description = effect_description;
            }
        }
        
        this.cards = [
            new Card("Tax Return", "Gain $500"),
            new Card("Reinforcements", "Gain 5 units that can be added to any territory"),
            new Card("Blitzkrieg", "Gain a random territory from a player of your choosing"),
            new Card("Sacrifice", "Sacrifice your weakest territory but gain $1000"),
            new Card("War Reparations", "Steal $1200 from the last player that attacked you"),
            new Card("Arms Race", "All players gain 3 units, except the player with the most territories"),
            new Card("Last Stand", "All territories with one unit gain an additional unit"),
            new Card("Ceasefire", "No attacking for the next turn"),
        ];
        
        this.MAX_CARDS = 5;
        
        this.CARD_CONTAINER_PADDING = 8;
        this.CARD_WIDTH = 250;
        this.CARD_HEIGHT = 100;
        
        function create_card_container(that, card, index) {
            var card_container = that.add.container((that.UI_2_WIDTH-that.CARD_WIDTH)/2, (that.CARD_CONTAINER_PADDING+that.CARD_HEIGHT)*index);
            var bg = that.add.rectangle(0, 0, that.CARD_WIDTH, that.CARD_HEIGHT, white);
            bg.setOrigin(0);
            
            card_container.add(bg);
            card_container.add(that.add.text(that.CARD_CONTAINER_PADDING, that.CARD_CONTAINER_PADDING, card.name, text_style_black));
            card_container.add(that.add.text(that.CARD_CONTAINER_PADDING, that.CARD_CONTAINER_PADDING+32, card.effect_description, text_style_black_word_wrap));
            
            return card_container;
        }
        
        this.ui_2_container = this.add.container(this.UI_2_START_X, this.UI_2_START_Y);
        this.ui_2_container.add(create_card_container(this, this.cards[0], 0));
        this.ui_2_container.add(create_card_container(this, this.cards[1], 1));
        this.ui_2_container.add(create_card_container(this, this.cards[2], 2));
        this.ui_2_container.add(create_card_container(this, this.cards[3], 3));
        this.ui_2_container.add(create_card_container(this, this.cards[5], 4));
        
        this.cam3 = this.cameras.add(this.VIEWPORT_WIDTH - this.UI_2_WIDTH, 0, this.UI_2_WIDTH, this.UI_2_HEIGHT);
        this.cam3.setBackgroundColor(darker_grey);
        this.cam3.setZoom(1);
        this.cam3.setScroll(this.UI_2_START_X, this.UI_2_START_Y);
        
        
        this.cam4 = this.cameras.add(
            this.VIEWPORT_WIDTH / 2 - this.UI_3_WIDTH / 2,
            this.VIEWPORT_HEIGHT / 2 - this.UI_3_HEIGHT / 2,
            this.UI_3_WIDTH,
            this.UI_3_HEIGHT
        );
        this.cam4.setBackgroundColor(light_grey);
        this.cam4.setZoom(1);
        this.cam4.setScroll(this.UI_3_START_X, this.UI_3_START_Y);

        this.ui_3_container = this.add.container(this.UI_3_START_X,  this.UI_3_START_Y);
        this.dice_image(
            this,
            Phaser.Math.Between(1, 6),
            this.UI_3_WIDTH / 2 - 48,
            this.UI_3_HEIGHT / 2,
            this.ui_3_container
        );
        this.dice_image(
            this,
            Phaser.Math.Between(1, 6),
            this.UI_3_WIDTH / 2 + 48,
            this.UI_3_HEIGHT / 2,
            this.ui_3_container
        );
        
        this.dice_text(this, this.ui_3_container);

        this.board_game_index = 0;

        this.convert_board_index_to_x_y(this.player_marker_1, 1);
        this.convert_board_index_to_x_y(this.player_marker_2, 3);

        this.player_indices = [0, 0, 0, 0, 0, 0];
        this.player_rolls = [0, 0, 0, 0, 0, 0];

        this.player_cooldown_1 = 0;
        this.player_cooldown_2 = 0;
        this.player_cooldown_3 = 0;
        this.player_cooldown_4 = 0;
        this.player_cooldown_5 = 0;
        this.player_cooldown_6 = 0;

        this.MOVE_DELAY = 500;

        this.countries = [];

        let context = this;
        function add_country(country) {
            context.countries.push(country);
        }

        this.selected_country = ontario;

        add_country(alberta);
        add_country(greenland);
        add_country(ontario);
        add_country(quebec);
        add_country(northwest_territories);
        add_country(west_us);
        add_country(east_us);

        // TODO: remove debug information
        alberta.owner = 1;
        quebec.owner = 3;

        this.MAP_START_X = 100;
        this.MAP_START_Y = 100;

        this.COUNTRY_STROKE_WIDTH = 2;

        // Add Water
        this.add.rectangle(400, 300, 600, 400, water_colour);

        // Add Countries
        for (let c = 0; c < this.countries.length; c++) {
            let country = this.countries[c];
            country.draw(this);
        }

        this.input.on("pointerdown", (pointer) => {
            for (var i = 0; i < this.countries.length; i++) {
                var country = this.countries[i];

                if (
                    Phaser.Geom.Polygon.Contains(
                        country.poly,
                        pointer.worldX - this.MAP_START_X,
                        pointer.worldY - this.MAP_START_Y
                    )
                ) {
                    let old_selected_country = this.selected_country;
                    this.selected_country = country;

                    this.selected_country.graphics.clear();
                    this.selected_country.draw(this);

                    old_selected_country.graphics.clear();
                    old_selected_country.draw(this);
                }
            }
        });

        function update_game_state(context, game_state) {
            context.player_turn = game_state.player_turn;

            context.player_indices = game_state.player_indices;
            context.player_rolls = game_state.player_rolls;

            context.player_money = game_state.player_money;
        }

        let that = this;
        ws.onmessage = (event) => {
            console.log("Received something from server:", event.data);
            var parsed_data = JSON.parse(event.data);

            if (parsed_data.type == "next_turn") {
                console.log(`Player ${parsed_data.player_turn}'s Turn`);
                that.player_turn = parsed_data.player_turn;

                console.log("Updating game state...");
                update_game_state(that, parsed_data.game_state);
            }

            that.ui_text_player_turn.setText(player_turn_text(that, that.player_turn));
        };
    }

    update(time, delta) {
        this.convert_board_index_to_x_y(this.player_marker_1, this.board_game_index);

        if (Phaser.Input.Keyboard.JustDown(this.keys.up)) this.board_game_index += 1;
        if (Phaser.Input.Keyboard.JustDown(this.keys.down)) this.board_game_index -= 1;

        if (Phaser.Input.Keyboard.JustDown(this.keys.one)) {
            if (this.ui_1_container.visible) {
                this.ui_1_container.setVisible(false);
                this.cam2.setVisible(false);
            } else {
                this.ui_1_container.setVisible(true);
                this.cam2.setVisible(true);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.two)) {
            if (this.cam3.visible) {
                this.cam3.setVisible(false);
            } else {
                this.cam3.setVisible(true);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            // Simulate random dice roll
            this.ui_3_container.removeAll(true);
            let roll_1 = Phaser.Math.Between(1, 6);
            let roll_2 = Phaser.Math.Between(1, 6);
            this.dice_image(
                this,
                roll_1,
                this.UI_3_WIDTH / 2 - 48,
                this.UI_3_HEIGHT / 2,
                this.ui_3_container
            );
            this.dice_image(
                this,
                roll_2,
                this.UI_3_WIDTH / 2 + 48,
                this.UI_3_HEIGHT / 2,
                this.ui_3_container
            );
            this.dice_text(this, this.ui_3_container);
            this.player_rolls[1] = roll_1 + roll_2;

            // Next turn
            try {
                console.log("Client: sending next turn");
                ws.send("next turn");
            } catch (error) {
                console.log("WebSocket error"); 
            }
        }

        this.player_cooldown_2 += delta;
        if (this.player_cooldown_2 >= this.MOVE_DELAY && this.player_rolls[1] > 0) {
            this.player_cooldown_2 = 0;
            this.player_rolls[1] -= 1;
            this.player_indices[1] += 1;


            this.convert_board_index_to_x_y(this.player_marker_2, this.player_indices[1]);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#e3e3e3",
    mode: Phaser.Scale.FIT,
    scene: MainScene,
    dom: {
        createContainer: true
    },
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};

new Phaser.Game(config);
