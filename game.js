class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        // Load assets here
        this.load.image("risk_map", "risk.png");
    }

    create() {
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
            .text(400, 300, "Hello World", {
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
        
        this.NO_OWNER = -1;
        
        this.TOTAL_PROPERTIES = 16;
        
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
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.SUBTEXT_SPACING = 20;

        this.player_colours = [
            green,
            orange,
            pink,
            red,
            purple,
            brown
        ];

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

        this.player_money_1 = 0;
        this.player_money_2 = 0;
        this.player_money_3 = 0;
        this.player_money_4 = 0;
        this.player_money_5 = 0;
        this.player_money_6 = 1200;

        this.UI_START_X = 3000;
        this.UI_START_Y = 3000;

        this.UI_MONEY_SPACING = 48;
        this.UI_INDICATOR_SPACING = 48;
        this.UI_INDICATOR_SIZE = 16;
        this.UI_VERTICAL_ADJUST = 16;

        const ui_text_player_money_1 = this.add.text(
            this.UI_START_X + this.UI_INDICATOR_SPACING,
            this.UI_START_Y + this.UI_MONEY_SPACING * 0 + this.UI_VERTICAL_ADJUST,
            "Player 1 Money: $" + this.player_money_1,
            text_style_white
        );
        const ui_text_player_money_2 = this.add.text(
            this.UI_START_X + this.UI_INDICATOR_SPACING,
            this.UI_START_Y + this.UI_MONEY_SPACING * 1 + this.UI_VERTICAL_ADJUST,
            "Player 2 Money: $" + this.player_money_2,
            text_style_white
        );
        const ui_text_player_money_3 = this.add.text(
            this.UI_START_X + this.UI_INDICATOR_SPACING,
            this.UI_START_Y + this.UI_MONEY_SPACING * 2 + this.UI_VERTICAL_ADJUST,
            "Player 3 Money: $" + this.player_money_3,
            text_style_white
        );
        const ui_text_player_money_4 = this.add.text(
            this.UI_START_X + this.UI_INDICATOR_SPACING,
            this.UI_START_Y + this.UI_MONEY_SPACING * 3 + this.UI_VERTICAL_ADJUST,
            "Player 4 Money: $" + this.player_money_4,
            text_style_white
        );
        const ui_text_player_money_5 = this.add.text(
            this.UI_START_X + this.UI_INDICATOR_SPACING,
            this.UI_START_Y + this.UI_MONEY_SPACING * 4 + this.UI_VERTICAL_ADJUST,
            "Player 5 Money: $" + this.player_money_5,
            text_style_white
        );
        const ui_text_player_money_6 = this.add.text(
            this.UI_START_X + this.UI_INDICATOR_SPACING,
            this.UI_START_Y + this.UI_MONEY_SPACING * 5 + this.UI_VERTICAL_ADJUST,
            "Player 6 Money: $" + this.player_money_6,
            text_style_white
        );

        this.ui_player_marker_1 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 0 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[0]
        );
        this.ui_player_marker_2 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 1 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[1]
        );
        this.ui_player_marker_3 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 2 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[2]
        );
        this.ui_player_marker_4 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 3 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[3]
        );
        this.ui_player_marker_5 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 4 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[4]
        );
        this.ui_player_marker_6 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 5 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colours[5]
        );

        const cam2 = this.cameras.add(0, 0, 280, 800);
        cam2.setBackgroundColor(0x5d5d5d);
        cam2.setZoom(1);
        cam2.setScroll(3000, 3000);

        this.board_game_index = 0;

        this.convert_board_index_to_x_y(this.player_marker_1, 1);
        this.convert_board_index_to_x_y(this.player_marker_2, 0);

        this.player_index_1 = 0;
        this.player_index_2 = 0;
        this.player_index_3 = 0;
        this.player_index_4 = 0;
        this.player_index_5 = 0;
        this.player_index_6 = 0;

        this.player_roll_1 = 0;
        this.player_roll_2 = 0;
        this.player_roll_3 = 0;
        this.player_roll_4 = 0;
        this.player_roll_5 = 0;
        this.player_roll_6 = 0;

        this.player_cooldown_1 = 0;
        this.player_cooldown_2 = 0;
        this.player_cooldown_3 = 0;
        this.player_cooldown_4 = 0;
        this.player_cooldown_5 = 0;
        this.player_cooldown_6 = 0;

        this.MOVE_DELAY = 500;

        this.countries = [];

        var context = this;
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
        
        this.input.on('pointerdown', (pointer) => {

            for (var i = 0; i < this.countries.length; i++) {
                var country = this.countries[i];

                if (Phaser.Geom.Polygon.Contains(country.poly, pointer.worldX-this.MAP_START_X, pointer.worldY-this.MAP_START_Y)) {
                    let old_selected_country = this.selected_country;
                    this.selected_country = country;
                    
                    this.selected_country.graphics.clear();
                    this.selected_country.draw(this);
                    
                    old_selected_country.graphics.clear();
                    old_selected_country.draw(this);
                }
            }
        });
    }

    update(time, delta) {
        this.convert_board_index_to_x_y(this.player_marker_1, this.board_game_index);

        if (Phaser.Input.Keyboard.JustDown(this.keys.up)) this.board_game_index += 1;
        if (Phaser.Input.Keyboard.JustDown(this.keys.down)) this.board_game_index -= 1;

        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            // Simulate random dice roll
            this.player_roll_2 = Phaser.Math.Between(1, 6) + Phaser.Math.Between(1, 6);
        }

        this.player_cooldown_2 += delta;
        if (this.player_cooldown_2 >= this.MOVE_DELAY && this.player_roll_2 > 0) {
            this.player_cooldown_2 = 0;
            this.player_roll_2 -= 1;
            this.player_index_2 += 1;

            this.convert_board_index_to_x_y(this.player_marker_2, this.player_index_2);
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
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};

new Phaser.Game(config);
