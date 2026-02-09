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
    }

    update(time, delta) {
        // Game loop
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1d1d1d',
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

new Phaser.Game(config);