import Phaser from 'phaser'
import Game from "./game";

export default class Cover {
    game: Game
    scene: Phaser.Scene
    bg: Phaser.GameObjects.Image
    button: Phaser.GameObjects.Sprite
    isPressDown: Boolean
    gameStart: Function

    constructor(game: Game, scene: Phaser.Scene, gameStart?: Function) {
        this.game = game
        this.scene = scene
        this.bg = scene.add.image(0, 0, 'bg')
        this.button = scene.add.sprite(0, 0, 'start', 1)
        this.gameStart = gameStart
    }

    Show = () => {
        if (this.game.isGameStart) {
            return
        }

        const width = this.game.screeWidth()
        const height = this.game.screeHeight()
        if (this.game.needRotate()) {
            this.bg.
                setX(width / 2).
                setY(height / 2).
                setAngle(90).
                setDisplaySize(height, width)

            this.button.setDisplaySize(0, 0)
        } else {
            this.bg.
                setX(width / 2).
                setY(height / 2).
                setAngle(0).
                setDisplaySize(width, height)

            this.button.
                setX(width / 2).
                setY(height / 2).
                setDisplaySize(this.button.width, this.button.height)


            this.button.setInteractive()
            this.button.on('pointerout', () => {
                this.isPressDown = false
                this.button.setFrame(1)
            })
            this.button.on('pointerdown', () => {
                this.isPressDown = true
                this.button.setFrame(0)
            })
            this.button.on('pointerup', () => {
                if (this.isPressDown) {
                    this.isPressDown = false
                    this.Hide()
                    if (this.gameStart instanceof Function) {
                        this.gameStart()
                    }
                }
            })
        }
    }

    Hide = () => {
        this.bg.setDisplaySize(0, 0)
        this.button.removeInteractive()
        this.button.setScale(0, 0)
    }
}
