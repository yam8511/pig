import Phaser from 'phaser'
import Game from "./game";

export default class Street {
    game: Game
    scene: Phaser.Scene
    street: Phaser.GameObjects.Image
    gameStart: Function

    constructor(game: Game, scene: Phaser.Scene, gameStart?: Function) {
        this.game = game
        this.scene = scene
        this.gameStart = gameStart

        this.street = scene.add.image(0, 0, 'street').setOrigin(0, 0).setDepth(-99)
        this.Hide()
    }

    Show = () => {
        if (!this.game.isGameStart) {
            return
        }

        const width = this.game.screeWidth()
        const height = this.game.screeHeight()
        const scaleX = this.game.screeWidth() / this.street.width
        const scaleY = this.game.screeHeight() / this.street.height

        this.street.
            setDisplaySize(width, height).
            setScale(scaleX, scaleY)
    }

    Hide = () => {
        this.street.setDisplaySize(0, 0)
    }
}
