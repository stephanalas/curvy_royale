import { Game, Types } from 'phaser';

const game = new Phaser.Game({
  title: 'Curvy Royale',
  type: Phaser.AUTO,
  parent: 'game',
  width: 640,
  height: 512,
  backgroundColor: '#28e087',
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
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
  scene: {
    key: 'main',
    preload: preload,
    create: create,
    update: update,
  },
});

let graphics, path;

function preload() {
  // load the game assets – enemy and turret atlas
  // this.load.atlas('tiles');
  // this.load.image('bullet', 'assets/bullet.png');
}

function create() {
  const graphics = this.add.graphics();

  path = this.add.path(96, -32);
  path.lineTo(96, 164);
  path.lineTo(480, 164);
  path.lineTo(480, 544);

  graphics.lineStyle(3, 0xffffff, 1);
  // visualize the path
  path.draw(graphics);
}

function update() {}
