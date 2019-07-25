import Phaser from 'phaser'
import Game from "./game";

export default class Player {
    game: Game
    scene: Phaser.Scene
    player: Phaser.GameObjects.Sprite

    constructor(game: Game, scene: Phaser.Scene) {
        this.game = game
        this.scene = scene

        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('player', { start: 2, end: 0 }),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        })


        this.player = scene.add.sprite(0, 0, 'player')

        this.Hide()
    }

    Show = () => {
        if (!this.game.isGameStart) {
            return
        }

        this.player.setX(0).setY(0).setDisplaySize(this.player.width, this.player.height)
    }

    Hide = () => {
        this.player.setDisplaySize(0, 0)
    }
}
