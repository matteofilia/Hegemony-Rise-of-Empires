class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // Load assets here
        this.load.image('risk_map', 'risk.png');
    }

    create() {
        this.cam = this.cameras.main;
        this.zoomDirection = 1;
        this.cam.setZoom(1);
        
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            this.cam.zoom -= deltaY * 0.001;
            this.cam.zoom = Phaser.Math.Clamp(this.cam.zoom, 0.5, 2);
        });
        
        // Enable dragging
        this.input.on('pointerdown', (pointer) => {
            this.dragStartX = pointer.x + this.cam.scrollX;
            this.dragStartY = pointer.y + this.cam.scrollY;
            this.isDragging = true;
        });

        this.input.on('pointerup', () => {
            this.isDragging = false;
        });

        this.input.on('pointermove', (pointer) => {
            if (!this.isDragging) return;
            this.cam.scrollX = this.dragStartX - pointer.x;
            this.cam.scrollY = this.dragStartY - pointer.y;
        });
        
        this.add.text(400, 300, 'Hello World', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        var green = 0x00bf00;
        var blue = 0x0000ff;
        var red = 0xff0000;
        var purple = 0xbd0bd3;
        
        var light_blue = 0x0aebff;
        var brown = 0xc19540;
        
        var light_grey = 0xd1d1d1;
        var dark_grey = 0x959595;
        var white = 0xffffff;
        
        const text_style = {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: 'monospace'
        };
        
        const text_style_tiny = {
            fontSize: '11px',
            color: 'ffffff',
            fontFamily: 'monospace'
        };
        
        const text_style_black = {
            fontSize: '16px',
            color: '000000',
            fontFamily: 'monospace'
        };
        
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
        
        const text0_1 = this.add.text(150, 87, 'New York', text_style).setOrigin(0.5); 
        const text0_2 = this.add.text(250, 87, 'Houston', text_style).setOrigin(0.5); 
        const text0_3 = this.add.text(350, 87, 'Chicago', text_style).setOrigin(0.5);
        const text0_5 = this.add.text(550, 87, 'Tokyo', text_style).setOrigin(0.5);
        const text0_6 = this.add.text(650, 87, 'Sydney', text_style).setOrigin(0.5);
        
        const text0_4 = this.add.text(450, 87, '???', text_style_black).setOrigin(0.5);
        
        const rect1_1 = this.add.rectangle(150, 513, 100, 25, purple);
        const rect1_2 = this.add.rectangle(250, 513, 100, 25, purple);
        const rect1_3 = this.add.rectangle(350, 513, 100, 25, white);
        const rect1_4 = this.add.rectangle(450, 513, 100, 25, red);
        const rect1_5 = this.add.rectangle(550, 513, 100, 25, red);
        const rect1_6 = this.add.rectangle(650, 513, 100, 25, red);
        
        const text1_1 = this.add.text(150, 513, 'Moscow', text_style).setOrigin(0.5); 
        const text1_2 = this.add.text(250, 513, 'Kyiv', text_style).setOrigin(0.5); 
        const text1_4 = this.add.text(450, 513, 'Montreal', text_style).setOrigin(0.5);
        const text1_5 = this.add.text(550, 513, 'Toronto', text_style).setOrigin(0.5);
        const text1_6 = this.add.text(650, 513, 'Ottawa', text_style).setOrigin(0.5);
        
        const text1_3 = this.add.text(350, 513, '???', text_style_black).setOrigin(0.5);
        
        const rect2_1 = this.add.rectangle(87, 150, 25, 100, brown);
        const rect2_2 = this.add.rectangle(87, 250, 25, 100, brown);
        const rect2_3 = this.add.rectangle(87, 350, 25, 100, brown);
        const rect2_4 = this.add.rectangle(87, 450, 25, 100, white);
        
        const text2_1 = this.add.text(87, 150, 'Shanghai', text_style).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90); 
        const text2_2 = this.add.text(87, 250, 'Shenzhen', text_style).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90); 
        const text2_3 = this.add.text(87, 350, 'Hong Kong', text_style).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90);
        
        const text2_4 = this.add.text(87, 450, '???', text_style_black).setOrigin(0.5).rotation = Phaser.Math.DegToRad(90);
        
        const rect3_1 = this.add.rectangle(713, 150, 25, 100, white);
        const rect3_2 = this.add.rectangle(713, 250, 25, 100, light_blue);
        const rect3_3 = this.add.rectangle(713, 350, 25, 100, light_blue);
        const rect3_4 = this.add.rectangle(713, 450, 25, 100, light_blue);
        
        const text3_2 = this.add.text(713, 250, 'London', text_style).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270); 
        const text3_3 = this.add.text(713, 350, 'Paris', text_style).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270); 
        const text3_4 = this.add.text(713, 450, 'Rome', text_style).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270);
        
        const text3_1 = this.add.text(713, 150, '???', text_style_black).setOrigin(0.5).rotation = Phaser.Math.DegToRad(270);

        const text4_1 = this.add.text(750, 50, 'Cool', text_style_black).setOrigin(0.5).rotation = Phaser.Math.DegToRad(45);
        const text5_1 = this.add.text(50, 50, '???', text_style_black).setOrigin(0.5).rotation = Phaser.Math.DegToRad(45-90);
        const text6_1 = this.add.text(50, 550, 'Cool', text_style_black).setOrigin(0.5).rotation = Phaser.Math.DegToRad(45);
        const text7_1 = this.add.text(750, 550, '???', text_style_black).setOrigin(0.5).rotation = Phaser.Math.DegToRad(45+270);





        
        const risk_map = this.add.image(400, 300, 'risk_map');
        risk_map.setOrigin(0.5);
        
        const player_marker_1 = this.add.circle(750, 150+Phaser.Math.Between(-20, 20), 20, green);
        const player_marker_2 = this.add.circle(750, 150+Phaser.Math.Between(-20, 20), 20, blue);
        const player_marker_3 = this.add.circle(50, 350+Phaser.Math.Between(-20, 20), 20, light_blue);
        const player_marker_4 = this.add.circle(50, 450+Phaser.Math.Between(-20, 20), 20, red);
        const player_marker_5 = this.add.circle(150+Phaser.Math.Between(-20, 20), 50, 20, purple);
        const player_marker_6 = this.add.circle(450+Phaser.Math.Between(-20, 20), 50, 20, brown);
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