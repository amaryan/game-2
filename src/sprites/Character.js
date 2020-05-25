import Phaser from 'phaser'

export default class Character extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y, asset }) {
    super(scene, x, y, asset)
    scene.add.existing(this);

  }
}
