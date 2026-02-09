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

        var green = 0x00bf00;
        var blue = 0x0000ff;
        var red = 0xdd1f1f;
        var purple = 0xbd0bd3;

        var light_blue = 0x1bdaec;
        var brown = 0xa07520;

        var light_grey = 0xd1d1d1;
        var dark_grey = 0x959595;
        var white = 0xffffff;

        const text_style = {
            fontSize: "16px",
            color: "#ffffff",
            fontFamily: "monospace"
        };

        const text_style_tiny = {
            fontSize: "11px",
            color: "ffffff",
            fontFamily: "monospace"
        };

        const text_style_black = {
            fontSize: "16px",
            color: "000000",
            fontFamily: "monospace"
        };

        const text_style_black_tiny = {
            fontSize: "8px",
            color: "000000",
            fontFamily: "monospace"
        };

        const text_style_white = {
            fontSize: "16px",
            color: "ffffff",
            fontFamily: "monospace"
        };

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
            null,
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

        this.player_colour_1 = green;
        this.player_colour_2 = blue;
        this.player_colour_3 = light_blue;
        this.player_colour_4 = red;
        this.player_colour_5 = purple;
        this.player_colour_6 = brown;

        const square0_1 = this.add.rectangle(50, 50, 100, 100, light_grey);
        const square0_2 = this.add.rectangle(150, 50, 100, 100, dark_grey);
        const square0_3 = this.add.rectangle(250, 50, 100, 100, light_grey);
        const square0_4 = this.add.rectangle(350, 50, 100, 100, dark_grey);
        const square0_5 = this.add.rectangle(450, 50, 100, 100, light_grey);
        const square0_6 = this.add.rectangle(550, 50, 100, 100, dark_grey);
        const square0_7 = this.add.rectangle(650, 50, 100, 100, light_grey);
        const square0_8 = this.add.rectangle(750, 50, 100, 100, dark_grey);

        const square1_1 = this.add.rectangle(50, 550, 100, 100, dark_grey);
        const square1_2 = this.add.rectangle(150, 550, 100, 100, light_grey);
        const square1_3 = this.add.rectangle(250, 550, 100, 100, dark_grey);
        const square1_4 = this.add.rectangle(350, 550, 100, 100, light_grey);
        const square1_5 = this.add.rectangle(450, 550, 100, 100, dark_grey);
        const square1_6 = this.add.rectangle(550, 550, 100, 100, light_grey);
        const square1_7 = this.add.rectangle(650, 550, 100, 100, dark_grey);
        const square1_8 = this.add.rectangle(750, 550, 100, 100, light_grey);

        const square2_1 = this.add.rectangle(50, 450, 100, 100, light_grey);
        const square2_2 = this.add.rectangle(50, 350, 100, 100, dark_grey);
        const square2_3 = this.add.rectangle(50, 250, 100, 100, light_grey);
        const square2_4 = this.add.rectangle(50, 150, 100, 100, dark_grey);

        const square3_1 = this.add.rectangle(750, 450, 100, 100, dark_grey);
        const square3_2 = this.add.rectangle(750, 350, 100, 100, light_grey);
        const square3_3 = this.add.rectangle(750, 250, 100, 100, dark_grey);
        const square3_4 = this.add.rectangle(750, 150, 100, 100, light_grey);

        const rect0_1 = this.add.rectangle(150, 87, 100, 25, green);
        const rect0_2 = this.add.rectangle(250, 87, 100, 25, green);
        const rect0_3 = this.add.rectangle(350, 87, 100, 25, green);
        const rect0_4 = this.add.rectangle(450, 87, 100, 25, white);
        const rect0_5 = this.add.rectangle(550, 87, 100, 25, blue);
        const rect0_6 = this.add.rectangle(650, 87, 100, 25, blue);

        const text0_1 = this.add.text(150, 87, "New York", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);
        const text0_2 = this.add.text(250, 87, "Houston", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);
        const text0_3 = this.add.text(350, 87, "Chicago", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);
        const text0_5 = this.add.text(550, 87, "Tokyo", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);
        const text0_6 = this.add.text(650, 87, "Sydney", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);

        const text0_4 = this.add.text(450, 87, "???", text_style_black)
        .setResolution(this.RESOLUTION).setOrigin(0.5);

        const subtext0_1 = this.add
            .text(150, this.SUBTEXT_SPACING, "$" + this.get_property_cost(13), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5);
        const subtext0_2 = this.add
            .text(250, this.SUBTEXT_SPACING, "$" + this.get_property_cost(14), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5);
        const subtext0_3 = this.add
            .text(350, this.SUBTEXT_SPACING, "$" + this.get_property_cost(15), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5);
        const subtext0_5 = this.add
            .text(550, this.SUBTEXT_SPACING, "$" + this.get_property_cost(17), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5);
        const subtext0_6 = this.add
            .text(650, this.SUBTEXT_SPACING, "$" + this.get_property_cost(18), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5);

        const rect1_1 = this.add.rectangle(150, 513, 100, 25, purple);
        const rect1_2 = this.add.rectangle(250, 513, 100, 25, purple);
        const rect1_3 = this.add.rectangle(350, 513, 100, 25, white);
        const rect1_4 = this.add.rectangle(450, 513, 100, 25, red);
        const rect1_5 = this.add.rectangle(550, 513, 100, 25, red);
        const rect1_6 = this.add.rectangle(650, 513, 100, 25, red);

        const text1_1 = this.add.text(150, 513, "Moscow", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);
        const text1_2 = this.add.text(250, 513, "Kyiv", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);
        const text1_4 = this.add.text(450, 513, "Montreal", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);
        const text1_5 = this.add.text(550, 513, "Toronto", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);
        const text1_6 = this.add.text(650, 513, "Ottawa", text_style)
        .setResolution(this.RESOLUTION).setOrigin(0.5);

        const subtext1_1 = this.add
            .text(150, 600 - this.SUBTEXT_SPACING, "$" + this.get_property_cost(6), text_style)
            .setResolution(this.RESOLUTION)    
            .setOrigin(0.5);
        const subtext1_2 = this.add
            .text(250, 600 - this.SUBTEXT_SPACING, "$" + this.get_property_cost(5), text_style)
            .setResolution(this.RESOLUTION)
            .setOrigin(0.5);
        const subtext1_4 = this.add
            .text(450, 600 - this.SUBTEXT_SPACING, "$" + this.get_property_cost(3), text_style)
            .setResolution(this.RESOLUTION)
            .setOrigin(0.5);
        const subtext1_5 = this.add
            .text(550, 600 - this.SUBTEXT_SPACING, "$" + this.get_property_cost(2), text_style)
            .setResolution(this.RESOLUTION)
            .setOrigin(0.5);
        const subtext1_6 = this.add
            .text(650, 600 - this.SUBTEXT_SPACING, "$" + this.get_property_cost(1), text_style)
            .setResolution(this.RESOLUTION)
            .setOrigin(0.5);

        const text1_3 = this.add.text(350, 513, "???", text_style_black)
            .setResolution(this.RESOLUTION).setOrigin(0.5);

        const rect2_1 = this.add.rectangle(87, 150, 25, 100, brown);
        const rect2_2 = this.add.rectangle(87, 250, 25, 100, brown);
        const rect2_3 = this.add.rectangle(87, 350, 25, 100, brown);
        const rect2_4 = this.add.rectangle(87, 450, 25, 100, white);

        const text2_1 = (this.add.text(87, 150, "Shanghai", text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(90));
        const text2_2 = (this.add.text(87, 250, "Shenzhen", text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(90));
        const text2_3 = (this.add.text(87, 350, "Hong Kong", text_style)
             .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(90));

        const subtext2_1 = (this.add
            .text(this.SUBTEXT_SPACING, 150, "$" + this.get_property_cost(11), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90));
        const subtext2_2 = (this.add
            .text(this.SUBTEXT_SPACING, 250, "$" + this.get_property_cost(10), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90));
        const subtext2_3 = (this.add
            .text(this.SUBTEXT_SPACING, 350, "$" + this.get_property_cost(9), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90));

        const text2_4 = (this.add.text(87, 450, "???", text_style_black)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(90));

        const rect3_1 = this.add.rectangle(713, 150, 25, 100, white);
        const rect3_2 = this.add.rectangle(713, 250, 25, 100, light_blue);
        const rect3_3 = this.add.rectangle(713, 350, 25, 100, light_blue);
        const rect3_4 = this.add.rectangle(713, 450, 25, 100, light_blue);

        const text3_2 = (this.add.text(713, 250, "London", text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(270));
        const text3_3 = (this.add.text(713, 350, "Paris", text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(270));
        const text3_4 = (this.add.text(713, 450, "Rome", text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(270));

        const subtext3_2 = (this.add
            .text(800 - this.SUBTEXT_SPACING, 250, "$" + this.get_property_cost(20), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270));
        const subtext3_3 = (this.add
            .text(800 - this.SUBTEXT_SPACING, 350, "$" + this.get_property_cost(21), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270));
        const subtext3_4 = (this.add
            .text(800 - this.SUBTEXT_SPACING, 450, "$" + this.get_property_cost(22), text_style)
            .setResolution(this.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270));

        const text3_1 = (this.add.text(713, 150, "???", text_style_black).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(270));

        var text4_1 = (this.add.text(750, 50, "Cool", text_style_black)
                       .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(45));
        var text5_1 = (this.add.text(50, 50, "Free Parking", text_style_black)
                       .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(45 - 90));
        var text6_1 = (this.add.text(50, 550, "Cool", text_style_black)
                       .setResolution(this.RESOLUTION).setOrigin(0.5).rotation =
            Phaser.Math.DegToRad(45));
        var text7_1 = (this.add.text(750, 550, "GO", text_style_black)
                       .setResolution(this.RESOLUTION).setOrigin(0.5).rotation = 
            Phaser.Math.DegToRad(45 + 270));

        // const risk_map = this.add.image(400, 300, "risk_map");
        // risk_map.setOrigin(0.5);

        // Player Markers
        this.player_marker_1 = this.add.circle(750, 150 + Phaser.Math.Between(-20, 20), 16, this.player_colour_1);
        this.player_marker_2 = this.add.circle(750, 150 + Phaser.Math.Between(-20, 20), 16, this.player_colour_2);
        this.player_marker_3 = this.add.circle(50, 350 + Phaser.Math.Between(-20, 20), 16, this.player_colour_3);
        this.player_marker_4 = this.add.circle(50, 450 + Phaser.Math.Between(-20, 20), 16, this.player_colour_4);
        this.player_marker_5 = this.add.circle(150 + Phaser.Math.Between(-20, 20), 50, 16, this.player_colour_5);
        this.player_marker_6 = this.add.circle(450 + Phaser.Math.Between(-20, 20), 50, 16, this.player_colour_6);

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
            this.player_colour_1
        );
        this.ui_player_marker_2 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 1 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colour_2
        );
        this.ui_player_marker_3 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 2 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colour_3
        );
        this.ui_player_marker_4 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 3 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colour_4
        );
        this.ui_player_marker_5 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 4 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colour_5
        );
        this.ui_player_marker_6 = this.add.circle(
            this.UI_START_X + this.UI_INDICATOR_SIZE,
            this.UI_START_Y + this.UI_MONEY_SPACING * 5 + this.UI_INDICATOR_SIZE / 2 + this.UI_VERTICAL_ADJUST,
            this.UI_INDICATOR_SIZE,
            this.player_colour_6
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

        class Country {
            constructor(name, points) {
                this.name = name;
                this.points = points;
                this.poly = new Phaser.Geom.Polygon(points);
            }
        }

        this.countries = [];

        var context = this;
        function add_country(country) {
            context.countries.push(country);
        }

        function get_simple_polygon_centre(points) {
            let x_max = -Infinity;
            let y_max = -Infinity;
            let x_min = Infinity;
            let y_min = Infinity;

            for (let i = 0; i < points.length; i++) {
                x_max = Math.max(x_max, points[i][0]);
                y_max = Math.max(y_max, points[i][1]);

                x_min = Math.min(x_min, points[i][0]);
                y_min = Math.min(y_min, points[i][1]);
            }

            return [(x_max + x_min) / 2, (y_max + y_min) / 2];
        }

        var alberta = new Country("Alberta", [
            [108, 109],
            [111, 69],
            [60, 68],
            [65, 84],
            [60, 91],
            [68, 108]
        ]);
        var greenland = new Country("Greenland", [
            [203, 90],
            [211, 70],
            [237, 45],
            [243, 18],
            [230, 16],
            [213, 10],
            [192, 22],
            [168, 39]
        ]);

        add_country(alberta);
        add_country(greenland);

        this.MAP_START_X = 100;
        this.MAP_START_Y = 100;

        const graphics = this.add.graphics(text_style_black_tiny);
        for (let c = 0; c < this.countries.length; c++) {
            var country = this.countries[c];

            graphics.beginPath();
            for (let i = 0; i < country.points.length; i++) {
                let x = country.points[i][0] + this.MAP_START_X;
                let y = country.points[i][1] + this.MAP_START_Y;

                if (i == 0) {
                    graphics.moveTo(x, y);
                } else {
                    graphics.lineTo(x, y);
                }
            }
            graphics.closePath();
            graphics.fillPath();
            graphics.lineStyle(2, 0x000000);
            graphics.strokePath();

            var centre = get_simple_polygon_centre(country.points);

            // console.log(centre[0], centre[1]);
            this.add
                .text(centre[0] + this.MAP_START_X, centre[1] + this.MAP_START_Y, country.name, text_style_black_tiny)
                .setOrigin(0.5)
                .setResolution(3);
        }
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
