function load_game_board(that) {
    const square0_1 = that.add.rectangle(50, 50, 100, 100, light_grey);
    const square0_2 = that.add.rectangle(150, 50, 100, 100, dark_grey);
    const square0_3 = that.add.rectangle(250, 50, 100, 100, light_grey);
    const square0_4 = that.add.rectangle(350, 50, 100, 100, dark_grey);
    const square0_5 = that.add.rectangle(450, 50, 100, 100, light_grey);
    const square0_6 = that.add.rectangle(550, 50, 100, 100, dark_grey);
    const square0_7 = that.add.rectangle(650, 50, 100, 100, light_grey);
    const square0_8 = that.add.rectangle(750, 50, 100, 100, dark_grey);

    const square1_1 = that.add.rectangle(50, 550, 100, 100, dark_grey);
    const square1_2 = that.add.rectangle(150, 550, 100, 100, light_grey);
    const square1_3 = that.add.rectangle(250, 550, 100, 100, dark_grey);
    const square1_4 = that.add.rectangle(350, 550, 100, 100, light_grey);
    const square1_5 = that.add.rectangle(450, 550, 100, 100, dark_grey);
    const square1_6 = that.add.rectangle(550, 550, 100, 100, light_grey);
    const square1_7 = that.add.rectangle(650, 550, 100, 100, dark_grey);
    const square1_8 = that.add.rectangle(750, 550, 100, 100, light_grey);

    const square2_1 = that.add.rectangle(50, 450, 100, 100, light_grey);
    const square2_2 = that.add.rectangle(50, 350, 100, 100, dark_grey);
    const square2_3 = that.add.rectangle(50, 250, 100, 100, light_grey);
    const square2_4 = that.add.rectangle(50, 150, 100, 100, dark_grey);

    const square3_1 = that.add.rectangle(750, 450, 100, 100, dark_grey);
    const square3_2 = that.add.rectangle(750, 350, 100, 100, light_grey);
    const square3_3 = that.add.rectangle(750, 250, 100, 100, dark_grey);
    const square3_4 = that.add.rectangle(750, 150, 100, 100, light_grey);

    const rect0_1 = that.add.rectangle(150, 87, 100, 25, green);
    const rect0_2 = that.add.rectangle(250, 87, 100, 25, green);
    const rect0_3 = that.add.rectangle(350, 87, 100, 25, green);
    const rect0_4 = that.add.rectangle(450, 87, 100, 25, white);
    const rect0_5 = that.add.rectangle(550, 87, 100, 25, blue);
    const rect0_6 = that.add.rectangle(650, 87, 100, 25, blue);

    const text0_1 = that.add.text(150, 87, "New York", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);
    const text0_2 = that.add.text(250, 87, "Houston", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);
    const text0_3 = that.add.text(350, 87, "Chicago", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);
    const text0_5 = that.add.text(550, 87, "Tokyo", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);
    const text0_6 = that.add.text(650, 87, "Sydney", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);

    const text0_4 = that.add.text(450, 87, "???", text_style_black)
    .setResolution(that.RESOLUTION).setOrigin(0.5);

    const subtext0_1 = that.add
        .text(150, that.SUBTEXT_SPACING, "$" + that.get_property_cost(13), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5);
    const subtext0_2 = that.add
        .text(250, that.SUBTEXT_SPACING, "$" + that.get_property_cost(14), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5);
    const subtext0_3 = that.add
        .text(350, that.SUBTEXT_SPACING, "$" + that.get_property_cost(15), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5);
    const subtext0_5 = that.add
        .text(550, that.SUBTEXT_SPACING, "$" + that.get_property_cost(17), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5);
    const subtext0_6 = that.add
        .text(650, that.SUBTEXT_SPACING, "$" + that.get_property_cost(18), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5);

    const rect1_1 = that.add.rectangle(150, 513, 100, 25, purple);
    const rect1_2 = that.add.rectangle(250, 513, 100, 25, purple);
    const rect1_3 = that.add.rectangle(350, 513, 100, 25, white);
    const rect1_4 = that.add.rectangle(450, 513, 100, 25, red);
    const rect1_5 = that.add.rectangle(550, 513, 100, 25, red);
    const rect1_6 = that.add.rectangle(650, 513, 100, 25, red);

    const text1_1 = that.add.text(150, 513, "Moscow", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);
    const text1_2 = that.add.text(250, 513, "Kyiv", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);
    const text1_4 = that.add.text(450, 513, "Montreal", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);
    const text1_5 = that.add.text(550, 513, "Toronto", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);
    const text1_6 = that.add.text(650, 513, "Ottawa", text_style)
    .setResolution(that.RESOLUTION).setOrigin(0.5);

    const subtext1_1 = that.add
        .text(150, 600 - that.SUBTEXT_SPACING, "$" + that.get_property_cost(6), text_style)
        .setResolution(that.RESOLUTION)    
        .setOrigin(0.5);
    const subtext1_2 = that.add
        .text(250, 600 - that.SUBTEXT_SPACING, "$" + that.get_property_cost(5), text_style)
        .setResolution(that.RESOLUTION)
        .setOrigin(0.5);
    const subtext1_4 = that.add
        .text(450, 600 - that.SUBTEXT_SPACING, "$" + that.get_property_cost(3), text_style)
        .setResolution(that.RESOLUTION)
        .setOrigin(0.5);
    const subtext1_5 = that.add
        .text(550, 600 - that.SUBTEXT_SPACING, "$" + that.get_property_cost(2), text_style)
        .setResolution(that.RESOLUTION)
        .setOrigin(0.5);
    const subtext1_6 = that.add
        .text(650, 600 - that.SUBTEXT_SPACING, "$" + that.get_property_cost(1), text_style)
        .setResolution(that.RESOLUTION)
        .setOrigin(0.5);

    const text1_3 = that.add.text(350, 513, "???", text_style_black)
        .setResolution(that.RESOLUTION).setOrigin(0.5);

    const rect2_1 = that.add.rectangle(87, 150, 25, 100, brown);
    const rect2_2 = that.add.rectangle(87, 250, 25, 100, brown);
    const rect2_3 = that.add.rectangle(87, 350, 25, 100, brown);
    const rect2_4 = that.add.rectangle(87, 450, 25, 100, white);

    const text2_1 = (that.add.text(87, 150, "Shanghai", text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(90));
    const text2_2 = (that.add.text(87, 250, "Shenzhen", text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(90));
    const text2_3 = (that.add.text(87, 350, "Hong Kong", text_style)
         .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(90));

    const subtext2_1 = (that.add
        .text(that.SUBTEXT_SPACING, 150, "$" + that.get_property_cost(11), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90));
    const subtext2_2 = (that.add
        .text(that.SUBTEXT_SPACING, 250, "$" + that.get_property_cost(10), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90));
    const subtext2_3 = (that.add
        .text(that.SUBTEXT_SPACING, 350, "$" + that.get_property_cost(9), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90));

    const text2_4 = (that.add.text(87, 450, "???", text_style_black)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(90));

    const rect3_1 = that.add.rectangle(713, 150, 25, 100, white);
    const rect3_2 = that.add.rectangle(713, 250, 25, 100, light_blue);
    const rect3_3 = that.add.rectangle(713, 350, 25, 100, light_blue);
    const rect3_4 = that.add.rectangle(713, 450, 25, 100, light_blue);

    const text3_2 = (that.add.text(713, 250, "London", text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(270));
    const text3_3 = (that.add.text(713, 350, "Paris", text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(270));
    const text3_4 = (that.add.text(713, 450, "Rome", text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(270));

    const subtext3_2 = (that.add
        .text(800 - that.SUBTEXT_SPACING, 250, "$" + that.get_property_cost(20), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270));
    const subtext3_3 = (that.add
        .text(800 - that.SUBTEXT_SPACING, 350, "$" + that.get_property_cost(21), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270));
    const subtext3_4 = (that.add
        .text(800 - that.SUBTEXT_SPACING, 450, "$" + that.get_property_cost(22), text_style)
        .setResolution(that.RESOLUTION).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270));

    const text3_1 = (that.add.text(713, 150, "???", text_style_black).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(270));

    var text4_1 = (that.add.text(750, 50, "Cool", text_style_black)
                   .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(45));
    var text5_1 = (that.add.text(50, 50, "Free Parking", text_style_black)
                   .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(45 - 90));
    var text6_1 = (that.add.text(50, 550, "Cool", text_style_black)
                   .setResolution(that.RESOLUTION).setOrigin(0.5).rotation =
        Phaser.Math.DegToRad(45));
    var text7_1 = (that.add.text(750, 550, "GO", text_style_black)
                   .setResolution(that.RESOLUTION).setOrigin(0.5).rotation = 
        Phaser.Math.DegToRad(45 + 270));
}