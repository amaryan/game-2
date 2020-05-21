import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.add.text(100, 100, 'loading fonts...')

   // this.load.image('loaderBg', './assets/images/loader-bg.png')
    //this.load.image('loaderBar', './assets/images/loader-bar.png')
   // this.load.json('fontJSON','../../assets/font.json');

  
      //Con esto importamos la fuente que esta ya creada
     // const fontJSON = this.cache.json.get('fontJSON');
     // this.cache.bitmapFont.add('pixel',Phaser.GameObjects.RetroFont.Parse(this,fontJSON));

     // this.scene.start('Menu');
  

    WebFont.load({
      google: {
        families: ['Bangers','Fredoka One']
      },
      active: this.fontsLoaded
    })
  }

  update () {
    if (this.fontsReady) {
      this.scene.start('SplashScene')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
