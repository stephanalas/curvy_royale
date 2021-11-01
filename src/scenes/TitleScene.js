import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  preload() {}
  create() {
    this.add.text(400, 250, 'Curvy Royale!!!!');
  }
}
