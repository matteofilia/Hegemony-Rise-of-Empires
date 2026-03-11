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



var greenland = new Country("Greenland", [
    [200, 75],
    [200, 9],
    [229, 9],
    [229, 75]
]);

var alberta = new Country("Alberta", [
    [57, 111],
    [57, 71],
    [101, 71],
    [101, 111]
]);

var ontario = new Country("Ontario", [
    [101, 111],
    [101, 71],
    [142, 71],
    [142, 111]
]);

var quebec = new Country("Quebec", [
    [142, 111],
    [142, 71],
    [190, 71],
    [190, 111]
]);

var northwest_territories = new Country("Northwest Territories", [
    [57, 71],
    [57, 41],
    [190, 41],
    [190, 71]
]);

var west_us = new Country("West US", [
    [57, 167],
    [57, 111],
    [120, 111],
    [120, 167]
]);

var east_us = new Country("East US", [
    [120, 167],
    [120, 111],
    [180, 111],
    [180, 167]
]);

var south_america = new Country("South America", [
    [100, 200],
    [100, 280],
    [100+50, 280],
    [100+50, 200],
]);

var europe = new Country("Europe", [
    [147+100, 101],
    [147+100, 101+50],
    [147+200, 101+50],
    [147+200, 101],
]);

var asia = new Country("Asia", [
    [147+200, 80],
    [147+200, 101+50],
    [147+350, 101+50],
    [147+350, 80],
]);

var australia = new Country("Australia", [
    [147+320, 101+170],
    [147+320, 101+250],
    [147+400, 101+250],
    [147+400, 101+170],
]);