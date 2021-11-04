import Phaser from 'phaser';
import Button from '../classes/button';
export default class TitleScene extends Phaser.Scene {
  preload() {}
  create() {
    const gameTitle = this.add.text(400, 250, 'Curvy Royale!!!!');
    gameTitle.setOrigin(0.5, 0.5);

    const startButton = new Button(50, 50, 'Start game', this, () =>
      console.log('game is started')
    );
  }
}
