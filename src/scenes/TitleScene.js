import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  preload() {}
  create() {
    const gameTitle = this.add.text(400, 250, 'Curvy Royale!!!!');
    gameTitle.setOrigin(1, 1);
  }
}
