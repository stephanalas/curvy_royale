import { Game, Types } from 'phaser';
import TitleScene from './scenes/TitleScene';
// these comments are for my understanding of game logic
var map = [
  [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
];

const game = new Phaser.Game({
  title: 'Curvy Royale',
  type: Phaser.AUTO,
  // parent key is dom element where game will be in
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  backgroundColor: '#28e087',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  render: {
    antialiasGL: false,
  },

  callbacks: {},
  canvasStyle: `display: block; width: 100%; height: 100%`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
});

window.addEventListener('resize', (ev) => {
  console.log('resizing game');
  game.scale.setGameSize(window.innerWidth, window.innerHeight);
});

game.scene.add('titlescene', TitleScene);
game.scene.start('titlescene');
