import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'SplashScene' })
  }

  preload () {
    //
    // load your assets
    //
    this.load.image('background','src/assets/build_assets/images/bg/backgroundColorFall.png')
    this.load.image('alien', 'src/assets/build_assets/images/characters/shipBlue_manned.png')
    this.load.image('bear','src/assets/build_assets/images/characters/bear.png')
    this.load.image('crocodile','src/assets/build_assets/images/characters/crocodile.png')
    this.load.image('dog','src/assets/build_assets/images/characters/dog.png')
    this.load.image('frog','src/assets/build_assets/images/characters/frog.png')
    this.load.image('gorilla','src/assets/build_assets/images/characters/gorilla.png')
    this.load.image('monkey','src/assets/build_assets/images/characters/monkey.png')
    this.load.image('button','src/assets/build_assets/images/shapes/button.png')
    this.load.image('moose','src/assets/build_assets/images/characters/moose.png')
    this.load.image('giraffe','src/assets/build_assets/images/characters/giraffe.png')
    this.load.image('heart','src/assets/build_assets/images/shapes/heart.png')
    this.load.image('circle','src/assets/build_assets/images/shapes/circle.png')
    this.load.audio('backAudio','src/assets/build_assets/sounds/bckMusic.mp3')
    
  }

  create () {
    this.scene.start('GameScene')
  }

  update () {}
}
