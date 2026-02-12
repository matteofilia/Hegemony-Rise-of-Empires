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

class Country {
    constructor(name, points) {
        this.name = name;
        this.points = points;
        this.poly = new Phaser.Geom.Polygon(points);
        this.graphics = null;
        this.owner = null;
    }

    draw(context) {
        let graphics = context.add.graphics(text_style_black_tiny);

        this.graphics = graphics;

        if (this.owner == null) {
            graphics.fillStyle(white, 2);
        } else {
            graphics.fillStyle(context.player_colours[this.owner]);
        }
       
        graphics.fillPoints(this.points, true);

        graphics.beginPath();
        if (context.selected_country == this) {    
            graphics.lineStyle(context.COUNTRY_STROKE_WIDTH, red);
        } else {
            graphics.lineStyle(context.COUNTRY_STROKE_WIDTH, black);
        }

        for (let i = 0; i < this.points.length; i++) {
            let x = this.points[i][0] + context.MAP_START_X;
            let y = this.points[i][1] + context.MAP_START_Y;

            if (i == 0) {
                graphics.moveTo(x, y);
            } else {
                graphics.lineTo(x, y);
            }
        }
        graphics.closePath();
        graphics.fillPath();
        graphics.strokePath();

        var centre = get_simple_polygon_centre(this.points);

        context.add
            .text(centre[0] + context.MAP_START_X, centre[1] + context.MAP_START_Y, this.name, text_style_black_tiny)
            .setOrigin(0.5)
            .setResolution(3);
    }
}

var alberta = new Country("Alberta", [
    [108, 109],
    [111, 69],
    [60, 69],
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

var ontario = new Country("Ontario", [
    [108, 109],
    [124, 108],
    [138, 127],
    [141, 130],
    [154, 123],
    [147, 120],
    [147, 103],
    [124, 80],
    [126, 69],
    [111, 69]
]);

var quebec = new Country("Quebec", [
    [147, 120],
    [147, 101],
    [160, 68],
    [180, 73],
    [194, 95],
    [168, 116],
    [155, 122]
]);

var northwest_territories = new Country("Northwest Territories", [
    [126, 69],
    [149, 42],
    [54, 39],
    [52, 69]
]);

var west_us = new Country("West US", [
    [124, 109],
    [69, 108],
    [61, 142],
    [68, 157],
    [98, 167],
    [119, 140]
]);

var east_us = new Country("East US", [
    [119, 140],
    [124, 108],
    [141, 132],
    [154, 123],
    [168, 116],
    [177, 127],
    [165, 167],
    [140, 167],
    [99, 176],
    [100, 166]
]);