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

 class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {}

  create () {
  
  //El fondo y el audio
    let audio = this.sound.add('backAudio',{loop: true})
    hit= this.sound.add('hitSound',{loop: false})
    //Bajamos el volumen del audio e iniciamos
    audio.volume = audio.volume- 0.9
    audio.play()
    //Recogemos las acciones de raton en la variable
    mouseInput = this.input
    this.add.image(400,300,'background')
   
    
    //Los diferentes textos que iran apareciendo 
    text = this.add.text(250, 380, 'Drag the bear to the board', {
      font: '30px Fredoka One',
      fill: '#C0392B '
    });
    textTime = this.add.text(32,32,'', {
    font: '30px Fredoka One',
    fill: '#74A016'
    });
    finalText = this.add.text(1000,360,'', {
    font: '60px Fredoka One',
    fill: '#C85213'
  }).setOrigin(0,0);
    titleText = this.add.text(-1000,290,'', {
      font: '60px Fredoka One',
      fill: '#74A016'
  }).setOrigin(0,0);
  

    var dog = this.add.image(300,690,'dog');
    var frog = this.add.image(500,700,'frog');
    var gorilla = this.add.image(700,700,'gorilla');
    bear = this.add.image(80,700,'bear');
    alien = this.add.image(400,200,'alien');
    crocodile = this.add.image(180,500,'crocodile');
    monkey = this.add.image(640,500,'monkey');
    button1 = this.add.image(400,500,'button');
    giraffe = this.add.image(530,220,'giraffe');
    moose = this.add.image(330,220,'moose');
    heart1 = this.add.image(350,110,'heart');
    heart2 = this.add.image(400,110,'heart');
    heart3 = this.add.image(450,110,'heart');
    //Cambiamos el tamaño del boton
    button1.scaleX = 2.5;
    //Asignamos este valor a los animales para poder usarlos bien 
    this.dog = dog;
    this.bear = bear;
    this.gorilla = gorilla;
    this.frog = frog;
    this.crocodile = crocodile;
    this.monkey = monkey;
    this.button1 = button1;
    this.moose = moose;
    this.giraffe = giraffe;
    this.alienTween = alienTween;
    this.heart1 = heart1;
    this.heart2 = heart2;
    this.heart3 = heart3;
  //Cambiamos la visibilidad de los objetos que seran revelados solo en la pantalla final
    giraffe.setVisible(false);
    moose.setVisible(false);
    button1.visible = false;
  //Damos al oso la posibilidad de que el usuario lo arrastre
   bear.setInteractive({ draggable:  true});
  //Funcion que indica lo que pasara cuando se arrastre al oso  
  bear.on('drag',function(pointer, gameObject, dragX, dragY){
    //Arrastro dependiendo de la posicion del raton
    bear.x = mouseInput.x;
    bear.y = mouseInput.y;
   //controlo que no se salga sus dos posibles casillas
    if(bear.y<650 || bear.x > 150 ){
      bear.y = 500;
      bear.x = 400;
    }else{
      bear.y = 700;
      bear.x = 80;
    }
  });
//Aqui tenemos el temporizador de 7 segundos
  timedEvent = this.time.addEvent({
    delay: 7000,
    callback: startBattle,
    callbackScope: this
  });
  //Creamos este overlay para que se vea una capa transparente que usaremos para dar efecto tutorial al principio del juego
   let rt = this.add.renderTexture(0, 0, 800, 800);
   //Rellenamos este overlay con color y la transaparencia
    rt.fill(0x000000, 0.5);
   //Esto será el circulo que hara de foco al oso 
    let spotlight = this.make.sprite({
      x: 80,
      y: 700,
      key: "circle",
      add: false,
    });
    //Creamos la mascara 
    let mask = rt.createBitmapMask(spotlight)
    mask.invertAlpha = true;
    rt.setMask(mask);
    //Aqui pondremos los diferentes tweens
    this.tweens.add({
    targets: [bear,spotlight],//Animacion del oso y circulo indicando la accion de arrastrar
    duration: 1000,
    repeat: 1,
    x: 400,
    y: 500,
    yoyo: true,
    ease: 'Sine.easeInOut',
    onComplete: ()=> {
      text.setColor('#641E16')
      textTime.setText('The battle starts in 5 seconds')
      rt.destroy()
    }
  });
  this.tweens.add({
    targets: [alien,heart1,heart2,heart3],//Movimiento de izquierda a derecha del alien con los corazones
    duration: 800,
    x: '500',
    repeat: -1,
    yoyo: true,
    ease: 'Sine.easeInOut',
    delay : function (i, total, target){
      return i * 100
    }
  });
   this.tweens.add({
    targets: [dog,frog,gorilla,bear,crocodile,monkey,spotlight],//Movimiento de los animales haciendo una pequeña rotacion
    duration: 1000,
    repeat: -1,
    yoyo: true,
    rotation: 0.4,
    delay: 500,
    ease: 'Sine.easeInOut',
    delay : function (i, total, target){
      return i * 100
    },
  });
  //Aqui añadimos un timeline que son varios tweens encadenados y realizados en orden de instancia
 giraffeTween =  this.tweens.createTimeline();
 alienTween = this.tweens.createTimeline();
//Empezamos a definir estas animaciones aunque hasta que no se les indique no van a funcionar
 alienTween.add({
   targets: alien,//Retroceso del alien al ser "golpeado"
   duration: 300,
   y: alien.y -40,
   yoyo: true,
   delay: 900,
   repeat: 2,
   ease: 'Power1'
 });
 giraffeTween.add({
   targets: alien, //Animacion de "caida" del alien al morir
   duration: 1000,
   angle: 360,
   y: 2000,
   completeDelay: 500, 
 });
 giraffeTween.add({
  targets: [crocodile,bear,monkey], //Animacion de celebracion al haber ganado al alien
  duration: 200,
  y: monkey.y-50,
  yoyo:true,
  repeat: 3,
  ease: 'Power0',
  onComplete : finalScreen
});
giraffeTween.add({
  targets: finalText,//El texto de victoria se desliza hasta su poscion en el centro de la pantalla 
  x: 250,
  duration: 200,
  ease: 'Power3',
});
giraffeTween.add({
  targets: titleText, //El titulo del juego se desliza desde su posicion al centro de la pantalla
  delay:500,
  x: 190,
  duration: 400,
  ease: 'Power3',
});
 giraffeTween.add({
    targets: [giraffe,moose],// Animacion de los animales de la pantalla final dando botes
    duration: 1000,
    y: '180',
    repeat: -1,
    yoyo: true,
    ease: 'Power1',
  });
  downloadText = this.add.text(320,477,'DOWNLOAD HERE', {
    font: '30px Fredoka One',
    fill: '#DA6134'
  }).setVisible(false);
}
}
//Funcion que indica lo que sucede en la batalla
function startBattle(){
  //Cambiamos el contenido del texto
  text.setText('Click to start!');
  textTime.destroy();
  //Si el usuario no movio la ficha se coloca sola
  bear.y = 500;
  bear.x = 400;
  //Cuando el usuario haga click se inicia la partida
  this.input.on('pointerdown', function (pointer) {
    //Quitamos el texto cuando el usuario da click en cualquier lado
    text.setText('');
    //Animaciones dentro de la batalla
    byeCards = this.tweens.add({
    targets:  [this.gorilla,this.dog,this.frog],//Animacion de salida de juego de los animales no utilizados
    duration: 1000,
    y: 1000,
    rotation: 0.4,
    onComplete: () => {
      this.gorilla.destroy()
      this.dog.destroy()
      this.frog.destroy()
      }
   });
    this.tweens.add({
      targets: this.bear, //Animacion del oso atacando hacia la posicion del alien
      y: 300,
      duration: 500,
      onUpdateCallback: killAlien,
      callbackScope: this.scene,
      onComplete: () => {
        alien.setAlpha(0.8)
        heart1.destroy()
        //hit.play()
      },
      ease: function (t){
        return Math.pow(Math.sin( t*3),3);
      },
      delay: 1000,
      repeat : 0
    });
    this.tweens.add({
      targets: this.monkey, //Animacion del mono atacando hacia la posicion del alien
      y: 300,
      x: monkey.x - 150,
      duration: 500,
      onStart: killAlien,
      onComplete: () => {
        alien.setAlpha(0.5)
        heart2.destroy()
        //hit.play()
      },
      ease: function (t){
        return Math.pow(Math.sin( t*3),3);
      },
      delay: 1600,
      repeat : 0
    });
    this.tweens.add({
      targets: this.crocodile, //Animacion del cocodrilo atacando hacia la posicion del alien
      y: 300,
      x: crocodile.x + 150,
      duration: 400,
      onStart: ()=>  heart3.destroy(),
      ease: function (t){
        return Math.pow(Math.sin( t*3),3);
      },
      delay: 2400,
      repeat : 0
    });
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
  //Eliminamos los objetos que no van a ser usados mas
  bear.destroy()
  crocodile.destroy()
  monkey.destroy()
  alien.destroy()
 
  titleText.setText('SAFARY ATTACK')
  finalText.x = finalText.x -50
  finalText.setText('VICTORY!!!')
  downloadText.x = downloadText.x -50
  downloadText.setVisible(true)
 button1.visible = true
 giraffe.rotation = +0.5
 moose.rotation = -0.5
 giraffe.setVisible(true)
 moose.setVisible(true)
 console.log(this)
 
}



export default GameScene;