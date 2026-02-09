class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // Load assets here
        // this.load.image('logo', 'assets/logo.png');
    }

    create() {
        this.add.text(400, 300, 'Hello World', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        var green = 0x00ff00;
        var blue = 0x0000ff;
        var red = 0xff0000;
        var purple = 0xbd0bd3;
        
        var light_blue = 0x0aebff;
        var brown = 0xc19540;
        
        var light_grey = 0xd1d1d1;
        var dark_grey = 0x959595;
        var white = 0xffffff;
        
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
        
        const rect1_1 = this.add.rectangle(150, 513, 100, 25, purple);
        const rect1_2 = this.add.rectangle(250, 513, 100, 25, purple);
        const rect1_3 = this.add.rectangle(350, 513, 100, 25, white);
        const rect1_4 = this.add.rectangle(450, 513, 100, 25, red);
        const rect1_5 = this.add.rectangle(550, 513, 100, 25, red);
        const rect1_6 = this.add.rectangle(650, 513, 100, 25, red);
        
        const rect2_1 = this.add.rectangle(87, 150, 25, 100, brown);
        const rect2_2 = this.add.rectangle(87, 250, 25, 100, brown);
        const rect2_3 = this.add.rectangle(87, 350, 25, 100, brown);
        const rect2_4 = this.add.rectangle(87, 450, 25, 100, white);
        
        const rect3_1 = this.add.rectangle(713, 150, 25, 100, white);
        const rect3_2 = this.add.rectangle(713, 250, 25, 100, light_blue);
        const rect3_3 = this.add.rectangle(713, 350, 25, 100, light_blue);
        const rect3_4 = this.add.rectangle(713, 450, 25, 100, light_blue);

    }

    update(time, delta) {
        // Game loop
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#e3e3e3',
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

new Phaser.Game(config);