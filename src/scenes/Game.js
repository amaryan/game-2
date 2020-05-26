/* globals __DEV__ */
/* globals __DEV__ */
import Phaser from 'phaser'

import Character from '../sprites/Character'
import Texts from '../sprites/Texts'

var mouseInput 
var giraffeTween
var alienTween
var firstY = 0
var firstX = 0
var position = false
var text
var textTime
var timedEvent
var finalText 
var bear
var monkey
var crocodile
var alien
var giraffe
var moose
var button1
var downloadText
var titleText
var heart1
var heart2
var heart3
var alienTween
var alienLife=3
var byeCards
var spotlight
var dog,frog,gorilla
 class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {}

  create () {
  
  //El fondo y el audio
     let audio = this.sound.add('backAudio',{loop: true})
     //Bajamos el volumen del audio e iniciamos
     audio.volume = audio.volume- 0.9
     audio.play();
     //Recogemos las acciones de raton en la variable
     mouseInput = this.input;
     //Fondo
     this.add.image(400,300,'background');
     //Los diferentes textos que iran apareciendo
     createTexts(this)
     titleText = this.titleText;
     finalText = this.finalText;
     downloadText = this.downloadText;
     //Creamos los personajes
     createChars(this);
    //Funcion donde arrastramos el oso y cambiamos y controlamos posicion
    dragBear();
    //Aqui tenemos el temporizador de 7 segundos
    timedEvent = this.time.addEvent({
      delay: 7000,
      callback: startBattle,
      callbackScope: this
     });
    //Creamos este overlay para que se vea una capa transparente que usaremos para dar efecto tutorial al principio del juego
    let rt = this.add.renderTexture(0, 0, 800, 800);
    tutorialMask(this,rt);
    tweensOutBattle(this,rt); 
      //Aqui añadimos un timeline que son varios tweens encadenados y realizados en orden de instancia
    giraffeTween =  this.tweens.createTimeline();
    alienTween = this.tweens.createTimeline();
    //En este metodo estan definidos los timeline
    defineTweenLine(this);
  }
}
  function tutorialMask(scenes,rt){
    
    //Rellenamos este overlay con color y la transaparencia
      rt.fill(0x000000, 0.5);
    //Esto será el circulo que hara de foco al oso 
      spotlight = scenes.make.sprite({
        x: 80,
        y: 700,
        key: "circle",
        add: false,
      });
      //Creamos la mascara 
      let mask = rt.createBitmapMask(spotlight)
      mask.invertAlpha = true;
      rt.setMask(mask);
  }
  //Funcion que indica lo que sucede en la batalla
  function startBattle(){
    //Cambiamos el contenido del texto
    this.text.setText('Click to start!');
    this.textTime.destroy();
    //Si el usuario no movio la ficha se coloca sola
    bear.y = 500;
    bear.x = 400;
    //Cuando el usuario haga click se inicia la partida
    this.input.on('pointerdown', function (pointer) {
      //Quitamos el texto cuando el usuario da click en cualquier lado
      this.text.setText('');
      //Animaciones dentro de la batalla
      byeCards = this.tweens.add({
      targets:  [gorilla,dog,frog],//Animacion de salida de juego de los animales no utilizados
      duration: 1000,
      y: 1000,
      rotation: 0.4,
      onComplete: () => {
        gorilla.destroy()
        dog.destroy()
        frog.destroy()
        }
    });
      this.tweens.add({
        targets: bear, //Animacion del oso atacando hacia la posicion del alien
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
        targets: monkey, //Animacion del mono atacando hacia la posicion del alien
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
        targets: crocodile, //Animacion del cocodrilo atacando hacia la posicion del alien
        y: 300,
        x: crocodile.x + 150,
        duration: 400,
        onStart: ()=> heart3.destroy(),
        ease: function (t){
          return Math.pow(Math.sin( t*3),3);
        },
        onComplete: killAlien,
        delay: 2400,
        repeat : 0
      });
  }, this);


  }
  function tweensOutBattle(scene,rt){
    //Aqui pondremos los diferentes tweens
    scene.tweens.add({
      targets: [bear,spotlight],//Animacion del oso y circulo indicando la accion de arrastrar
      duration: 1000,
      repeat: 1,
      x: 400,
      y: 500,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onComplete: ()=> {
        scene.text.setColor('#641E16');
        scene.textTime.setText('The battle starts in 5 seconds');
        rt.destroy()
      }
    });
    scene.tweens.add({
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
    scene.tweens.add({
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
  }
  function dragBear(){
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
  }
  function killAlien (){
  console.log(alien.life)
    if(alienLife > 0){
      alienLife--
      alienTween.play();
      console.log('La vida del alien es de: '+alienLife)
    }
    if(alienLife == 0){
      giraffeTween.play()
    }

  }
  function finalScreen(scene){
    //Eliminamos los objetos que no van a ser usados mas
    bear.destroy()
    crocodile.destroy()
    monkey.destroy()
    alien.destroy()
  
    scene.titleText.setText('SAFARY ATTACK')
    scene.finalText.setText('VICTORY!!!').setVisible(true)
    scene.downloadText.setVisible(true)
  button1.visible = true
  giraffe.rotation = +0.5
  moose.rotation = -0.5
  giraffe.setVisible(true)
  moose.setVisible(true)
  console.log(this)
  
  }
  function defineTweenLine(scene){
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
    onComplete : ()=> finalScreen(scene)
  });
  giraffeTween.add({
    targets: finalText,//El texto de victoria se desliza hasta su poscion en el centro de la pantalla 
    x: 200,
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
  }
  function createChars(scene){
    dog = new Character({
      scene: scene,
      x: 300,
      y:690,
      asset:'dog',
    });
    frog = new Character({
      scene: scene,
      x: 500,
      y:700,
      asset:'frog',
    });
    gorilla = new Character({
      scene: scene,
      x: 700,
      y:700,
      asset:'gorilla',
    });
    bear = new Character({
      scene: scene,
      x: 80,
      y:700,
      asset:'bear',
    });
    crocodile = new Character({
      scene: scene,
      x: 180,
      y:500,
      asset:'crocodile',
    });
    button1 = new Character({
      scene: scene,
      x: 400,
      y:500,
      asset:'button',
    });
    giraffe = new Character({
      scene: scene,
      x: 530,
      y:220,
      asset:'giraffe',
    });
    moose = new Character({
      scene: scene,
      x: 330,
      y:220,
      asset:'moose',
    });
    heart1 = new Character({
      scene: scene,
      x: 350,
      y:110,
      asset:'heart',
    });
    heart2 = new Character({
      scene: scene,
      x: 400,
      y:110,
      asset:'heart',
    });
    heart3 = new Character({
      scene: scene,
      x: 450,
      y:110,
      asset:'heart',
    });
    alien = new Character({
      scene: scene,
      x: 400,
      y: 200,
      asset: 'alien'
    })
    monkey = new Character({
      scene:scene,
      x:640,
      y:500,
      asset: 'monkey'
    });
    giraffe.setVisible(false);
    moose.setVisible(false);
    button1.visible = false;
    button1.scaleX = 2.5;
  }
  function createTexts (scene){
    scene.text = new Texts({
      scene: scene,
       x: 250,
       y: 380,
       text: 'DRAG THE BEAR TO THE BOARD',
       style: {
         font: '30px Fredoka One',
         fill: '#74A016'
       }
     });
     scene.textTime = new Texts({
       scene: scene,
        x: 32,
        y: 32,
        text: '',
        style: {
          font: '30px Fredoka One',
          fill: '#74A016'
        }
      });
      scene.finalText = new Texts({
        scene: scene,
        x: 1000,
        y: 360,
        text: 'VICTORYYYY',
        style: {
          font: '60px Fredoka One',
          fill: '#C85213'
        }
      }).setOrigin(0,0).setAlign('center');
      
      scene.titleText = new Texts({
        scene: scene,
        x: -1000,
        y:290,
        text: '',
        style: {
          font: '60px Fredoka One',
          fill: '#74A016'
        }
      }).setOrigin(0,0);

      scene.downloadText = new Texts({
        scene: scene,
        x: 270,
        y: 477,
        text: 'DOWNLOAD HERE',
        style: {
          font: '30px Fredoka One',
          fill: '#DA6134'
        }
      }).setVisible(false).setDepth(3);
  }

export default GameScene;