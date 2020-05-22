import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 800,
  transparent: true,
  localStorageName: 'phaseres6webpack',
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 150 }
    }
}
}
