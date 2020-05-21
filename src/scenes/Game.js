/* globals __DEV__ */
/* globals __DEV__ */
import Phaser from 'phaser'

import Character from '../sprites/Character'

var mouseInput 
var giraffeTween
var alienTween
var firstY = 0
var firstX = 0
var position = false
var text;
var textTime
var timedEvent
var finalText 
var bear
var monkey
var crocodile
var alien
var giraffe
var moose
var alienLife = 3
var button1
var downloadText
var titleText
var heart1
var heart2
var heart3
var alienTween
var hit
var byeCards
var hit
 class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {}

  create () {
  
  //el fondo
    let audio = this.sound.add('backAudio',{loop: true})
     hit= this.sound.add('hitSound',{loop: false})
    audio.volume = audio.volume- 0.9
    audio.play()
    mouseInput = this.input
    this.add.image(400,300,'background')
    text = this.add.text(250, 380, 'Drag the bear to the board', {
      font: '30px Bangers',
      fill: '#4A70DE'
    })
  
   var dog = this.dog
   dog = new Character({
      scene: this,
      x: 300,
      y: 690,
      asset: 'dog'
    })
    var frog = this.frog
    frog = new Character({
      scene: this,
      x: 500,
      y: 700,
      asset: 'frog'
    })
    var gorilla = this.gorilla
    gorilla = new Character({
      scene: this,
      x: 700,
      y: 700,
      asset: 'gorilla'
    })
    
    bear = this.add.image(80,700,'bear')
    alien = this.add.image(400,200,'alien')
    crocodile = this.add.image(180,500,'crocodile')
    monkey = this.add.image(640,500,'monkey')
    button1 = this.add.image(400,500,'button')
    giraffe = this.add.image(500,220,'giraffe')
    moose = this.add.image(300,220,'moose')
    heart1 = this.add.image(350,110,'heart')
    heart2 = this.add.image(400,110,'heart')
    heart3 = this.add.image(450,110,'heart')

    giraffe.setVisible(false)
    moose.setVisible(false)
    button1.visible = false
    /**
     * Aqui voy a hacer los tween de los animalillos
     * 
     */
    

    dog.setInteractive({ draggable: true})
    frog.setInteractive({ draggable: true})
    bear.setInteractive({ draggable:  true})
    
    bear.on('drag',function(pointer, gameObject, dragX, dragY){
      
    //Arrastro dependiendo de la posicion del raton
    bear.x = mouseInput.x
    bear.y = mouseInput.y  
   //controlo que no se salga sus dos posibles casillas
    if(bear.y<650 || bear.x > 150 ){
      bear.y = 500
      bear.x = 400
     
      console.log('estoy aqui')  
    }else{
      bear.y = 700
      bear.x = 80
    }
   
    
  })
  
  
 
  
 
//Aqui tenemos el temporizador de 5 segundos (Tengo que poner esto en un texto para que se vea el tiempo pasar en el juego)
  timedEvent = this.time.addEvent({
    delay: 5000,
    callback: startBattle,
    callbackScope: this
  })

     //Los diferentes textos que iran apareciendo 
  textTime = this.add.text(32,32,'', {
    font: '30px Bangers',
    fill: '#74A016'
    });
 textTime.setText('The battle starts in 5 seconds')

    finalText = this.add.text(1000,360,'', {
    font: '80px Bangers',
    fill: '#C85213'
  }).setOrigin(0,0);

  titleText = this.add.text(-1000,290,'', {
      font: '80px Bangers',
      fill: '#74A016'
  }).setOrigin(0,0);
   this.add.existing(button1)
   this.add.existing(bear)
   this.add.existing(alien)
   this.add.existing(dog)
   this.add.existing(frog)
   this.add.existing(gorilla)
   this.add.existing(crocodile)
   this.add.existing(monkey)
   this.add.existing(moose)
   this.add.existing(giraffe)
   this.add.existing(heart1)
   this.add.existing(heart2)
   this.add.existing(heart3)

  this.tweens.add({
    targets: [alien,heart1,heart2,heart3],
    duration: 800,
    x: '500',
    repeat: -1,
    yoyo: true,
    ease: 'Sine.easeInOut',
    delay : function (i, total, target){
      return i * 100
    }
  })
   this.tweens.add({
    targets: [dog,frog,gorilla,bear,crocodile,monkey],
    duration: 1000,
    repeat: -1,
    yoyo: true,
    rotation: 0.4,
    delay: 500,
    ease: 'Sine.easeInOut',
    delay : function (i, total, target){
      return i * 100
    },
   /* hold: 1000 Con este ponemos tiempo de espera al final de cada repeticion del tween
      repeatDelay: 1000 aqui tenemos una pausa antes de que la accion se vuelva a justo repetir
      completeDelay: lo mismo que antes pero justo antes de acabar
    onStart: () => console.log ('Start'),
    onYoyo: () => console.log ('Start'),
    onComplete: () => console.log ('Start'),
    onRepeat: () => console.log ('Start')*/
  })
  //Con esta maravilla podemos crear el tween y usarlo desde una funcion o cualquier lado sin que nos de fallitos del scope
 giraffeTween =  this.tweens.createTimeline();
 alienTween = this.tweens.createTimeline();
 alienTween.add({
   targets: alien,
   duration: 300,
   y: alien.y -40,
   yoyo: true,
   delay: 900,
   repeat: 2,
   //onComplete: hit.play(),
   ease: 'Power1'
 })
 giraffeTween.add({
   targets: alien,
   duration: 2000,
   rotation: 0.5,
   y: 2000,
   completeDelay: 500, 
  
 })

 giraffeTween.add({
  targets: [crocodile,bear,monkey],
  duration: 200,
  y: monkey.y-50,
  yoyo:true,
  repeat: 3,
  ease: 'Power0',
  onComplete : finalScreen
})
giraffeTween.add({
  targets: [titleText,finalText],
  x: 200,
  duration: 200,
  ease: 'Power3',
  
})

 giraffeTween.add({
    targets: [giraffe,moose],
    duration: 1000,
    y: '180',
    repeat: -1,
    yoyo: true,
    ease: 'Power1',
  })
  //esto es un comentario
   downloadText = this.add.text(320,477,'', {
    font: '30px Bangers',
    fill: '#DA6134'
  });
   //Hago esto para poder usarlos bien en las funciones de momento
   this.dog = dog
   this.bear = bear
   this.gorilla = gorilla
   this.frog = frog
   this.crocodile = crocodile
   this.monkey = monkey
   this.button1 = button1
   this.moose = moose
   this.giraffe = giraffe
   this.alienTween = alienTween
   this.heart1 = heart1
   this.heart2 = heart2
   this.heart3 = heart3
   
  }


  update(){
    
  }
 
}

function startBattle(){
  text.setText('Click to start!')
  textTime.destroy()
  //Si el usuario no movio la ficha se coloca sola
  bear.y = 500
  bear.x = 400
  this.input.on('pointerdown', function (pointer) {
    text.setText('')
    console.log('down');
    //textTime.setText('')
    //No se porque se sigue pudiendo arrastrar si lo he puesto en false
   // this.bear.setInteractive({ draggable:  false})
   byeCards = this.tweens.add({
    targets:  [this.gorilla,this.dog,this.frog],
    duration: 1000,
    y: 1000,
    rotation: 0.4,
    onComplete: () => {
      this.gorilla.destroy()
      this.dog.destroy()
      this.frog.destroy()
    }
   })
   
    /*this.dog.visible = false
    this.frog.visible = false
    this.gorilla.visible = false*/
    //El ataque del oso
   // console.log(alienLife)
   //Animacion del oso atacando hacia la posicion del alien
    this.tweens.add({
      targets: this.bear,
      y: 300,
      duration: 500,
      //Cada vez que realiza la accion llama al metodo que resta vida al alien
      onUpdateCallback: killAlien,
      callbackScope: this.scene,
      onComplete: () => {
        alien.setAlpha(0.8)
        heart1.setVisible(false)
        //hit.play()
      },
      ease: function (t){
        return Math.pow(Math.sin( t*3),3);
      },
      delay: 800,
      repeat : 0
    })
    this.tweens.add({
      targets: this.monkey,
      y: 300,
      x: monkey.x - 150,
      duration: 500,
      //Cada vez que realiza la accion llama al metodo que resta vida al alien
      onStart: killAlien,
      onComplete: () => {
        alien.setAlpha(0.5)
        heart2.setVisible(false)
        //hit.play()
      },
      ease: function (t){
        return Math.pow(Math.sin( t*3),3);
      },
      delay: 1600,
      repeat : 0
    })
    this.tweens.add({
      targets: this.crocodile,
      y: 300,
      x: crocodile.x + 150,
      duration: 400,
      //Cada vez que realiza la accion llama al metodo que resta vida al alien
      onComplete: killAlien,
      onStart: ()=>  heart3.setVisible(false),
      ease: function (t){
        return Math.pow(Math.sin( t*3),3);
      },
      delay: 2400,
      repeat : 0
    })
    //text.setText('')
}, this);


}


function killAlien (){
  console.log(this)
  //console.log(alienLife)
  //text.setText('')
  //hit.play()
  if(alienLife > 0){
    alienLife--
    alienTween.play()
    //hit.play()
    console.log('La vida del alien es de: '+alienLife)
  }
  if(alienLife == 0){
    giraffeTween.play()
    console.log('ded')
    
    //finalScreen()
  }

}
function finalScreen(){
  
  bear.visible = false
  crocodile.visible = false
  monkey.visible = false
  alien.visible = false
  titleText.setText('SAFARY ATTACK')
  finalText.setText('VICTORY!!!')
  downloadText.setText('DOWNLOAD HERE')
 button1.visible = true
 giraffe.rotation = +0.5
 moose.rotation = -0.5
 giraffe.setVisible(true)
 moose.setVisible(true)
 console.log(this)
 
}



export default GameScene;