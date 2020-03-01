import Phaser from 'phaser'
import {
    skyIMG,
    platformIMG,
    starIMG,
    bombIMG,
    dudeIMG,
} from './assets/assets'

export default class Game {

    game: Phaser.Game
    physics: Phaser.Physics.Arcade.ArcadePhysics
    platforms: Phaser.Physics.Arcade.StaticGroup
    player: Phaser.Physics.Arcade.Sprite
    stars: Phaser.Physics.Arcade.Group
    bombs: Phaser.Physics.Arcade.Group
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    score: number
    scoreText: Phaser.GameObjects.Text
    gameOver: boolean

    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 },
                    debug: true
                }
            },
        }

        this.game = new Phaser.Game(config)
    }

    // 載入素材
    preload = () => {
        const scene: Phaser.Scene = this.game.scene.scenes[0]
        scene.load.image('sky', skyIMG);
        scene.load.image('ground', platformIMG);
        scene.load.image('star', starIMG);
        scene.load.image('bomb', bombIMG);
        scene.load.spritesheet('dude',
            dudeIMG,
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    // 建置場景
    create = () => {
        const scene: Phaser.Scene = this.game.scene.scenes[0]
        this.physics = scene.physics

        let width = this.game.scale.gameSize.width / 2
        let height = this.game.scale.gameSize.height / 2
        const sky = scene.add.image(width, height, 'sky');
        this.platforms = scene.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = scene.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(100)

        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = scene.input.keyboard.createCursorKeys()

        this.stars = scene.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child: Phaser.Physics.Arcade.Image) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });


        this.bombs = scene.physics.add.group();

        scene.physics.add.collider(this.player, this.platforms)
        scene.physics.add.collider(this.stars, this.platforms)
        scene.physics.add.collider(this.bombs, this.platforms)

        scene.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        scene.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this)

        this.scoreText = scene.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })
    }

    collectStar = (
        _player: Phaser.Physics.Arcade.Sprite,
        star: Phaser.Physics.Arcade.Sprite,
    ) => {
        star.disableBody(true, true);
        // star.destroy()
        if (!this.score) {
            this.score = 0
        }
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child: Phaser.Physics.Arcade.Image) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    hitBomb = (
        player: Phaser.Physics.Arcade.Sprite,
        bomb: Phaser.Physics.Arcade.Sprite,
    ) => {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }

    // 運行遊戲
    update = () => {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
