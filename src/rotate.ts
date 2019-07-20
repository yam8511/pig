import Phaser from 'phaser'
import Game from "./game";

export default class Rotate {
    game: Game
    scene: Phaser.Scene
    rotate: Phaser.GameObjects.Image

    constructor(game: Game, scene: Phaser.Scene) {
        this.game = game
        this.scene = scene
        this.rotate = scene.add.image(0, 0, 'rotate')
        this.Hide()
    }

    Show = () => {
        const cx = this.game.screeWidth() / 2
        const cy = this.game.screeHeight() / 2
        this.rotate.setX(cx).setY(cy).setDisplaySize(this.rotate.width, this.rotate.height)
    }

    Hide = () => {
        this.rotate.setDisplaySize(0, 0)
    }
}
