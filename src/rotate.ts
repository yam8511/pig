import Phaser from 'phaser'
import Game from "./game";

export default class Rotate {
    game: Game
    scene: Phaser.Scene
    rotate: Phaser.GameObjects.Image
    bg: Phaser.GameObjects.Image

    constructor(game: Game, scene: Phaser.Scene) {
        this.game = game
        this.scene = scene
        this.bg = scene.add.image(0, 0, 'bg')
        this.rotate = scene.add.image(0, 0, 'rotate')
        this.Hide()
    }

    Show = () => {
        const width = this.game.screeWidth()
        const height = this.game.screeHeight()
        if (this.game.needRotate()) {
            this.bg.
                setX(width / 2).
                setY(height / 2).
                setAngle(90).
                setDisplaySize(height, width)
        } else {
            this.bg.
                setX(width / 2).
                setY(height / 2).
                setAngle(0).
                setDisplaySize(width, height)
        }

        const cx = width / 2
        const cy = height / 2
        this.rotate.setX(cx).setY(cy).setDisplaySize(this.rotate.width, this.rotate.height)
    }

    Hide = () => {
        this.bg.setDisplaySize(0, 0)
        this.rotate.setDisplaySize(0, 0)
    }
}
