import Phaser from 'phaser'
import Rotate from './rotate'
import Cover from './cover'
import Street from './street'
import Player from './player'
import rotateImg from './assets/rotate-device.png'
import starImg from './assets/star.jpg'
import startImg from './assets/start.png'
import streetImg from './assets/street.png'
import playerImg from './assets/player.png'
import playerRunImg from './assets/player_run.png'

export default class Game {

    game: Phaser.Game
    rotate: Rotate
    cover: Cover
    isGameStart: Boolean
    street: Street
    player: Player

    constructor() {
        const config = {
            type: Phaser.AUTO,
            // physics: {
            //     default: 'arcade',
            //     arcade: {
            //         gravity: { y: 300 },
            //         debug: true
            //     }
            // },
            scale: {
                mode: Phaser.Scale.RESIZE,
                parent: 'phaser-example',
                width: '100%',
                height: '100%'
            },
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        }

        this.game = new Phaser.Game(config)
    }

    // 載入素材
    preload = () => {
        const scene: Phaser.Scene = this.game.scene.scenes[0]
        scene.load.image('rotate', rotateImg)
        scene.load.image('bg', starImg)
        scene.load.image('street', streetImg)
        scene.load.spritesheet('start', startImg, {
            frameWidth: 190,
            frameHeight: 58,
        })
        scene.load.spritesheet('player', playerImg, {
            frameWidth: 34,
            frameHeight: 60,
        })
        scene.load.spritesheet('player_run', playerRunImg, {
            frameWidth: 33,
            frameHeight: 65,
        })
    }

    // 建置場景
    create = () => {
        const scene: Phaser.Scene = this.game.scene.scenes[0]

        this.street = new Street(this, scene)
        this.cover = new Cover(this, scene, () => {
            this.isGameStart = true
            this.street.Show()
        })
        this.rotate = new Rotate(this, scene)
        this.player = new Player(this, scene)

        // 偵測螢幕尺寸
        this.detectScreenSize()
        this.game.scale.on('resize', this.detectScreenSize)
    }

    // 運行遊戲
    update = () => {
        this.player.Show()
    }

    // 螢幕寬度
    screeWidth = () => this.game.scale.gameSize.width
    // 螢幕高度
    screeHeight = () => this.game.scale.gameSize.height

    // 是否需要轉機
    needRotate = () => (this.screeWidth() < this.screeHeight())

    // 偵測螢幕尺寸
    detectScreenSize = (
        gameSize?: Phaser.Structs.Size,
        baseSize?: Phaser.Structs.Size,
        displaySize?: Phaser.Structs.Size,
        resolution?: Phaser.Structs.Size,
    ) => {
        this.cover.Show()

        if (this.needRotate()) {
            this.rotate.Show()
        } else {
            this.rotate.Hide()
        }
    }

}
