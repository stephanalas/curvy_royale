import { Game, Types } from 'phaser';

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
  width: 640,
  height: 512,
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
  scene: {
    key: 'main',
    preload: preload,
    create: create,
    update: update,
  },
});

let graphics, path, enemies, defenders;

function preload() {
  // before game even loads I would assume I load my assets that make up the game map
  // load the game assets – enemy and turret atlas
  // this.load.atlas('tiles');
  // this.load.image('bullet', 'assets/bullet.png');
}

const ENEMY_SPEED = 1 / 10000;

const Enemy = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Enemy(scene) {
    // summons the enemy?
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
  },
  update: function (time, delta) {
    // move the t point along the path, 0 is the start and 0 is the end
    this.follower.t += ENEMY_SPEED * delta;

    // get the new x and y coordinates in vce
    path.getPoint(this.follower.t, this.follower.vec);

    //update the enemy x and y to the  newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y);

    // if we have reached the end of the path, remove the enemy
    if (this.follower.t >= 1) {
      this.setActive(false);
      this.setVisible(false);
    }
  },
  startOnPath: function () {
    // set the t parameter at the start of the path
    this.follower.t = 0;

    // get x and y of the given t point

    path.getPoint(this.follower.t, this.follower.vec);

    // set the x and y of our enemy to the received from the previous step
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  },
});

const Defender = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Defender(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'defender');
    this.nextTic = 0;
  },
  // we will place the turret according to the grid
  place: function (i, j) {
    this.y = i * 64 + 64 / 2;
    this.x = j * 64 + 64 / 2;
    map[i][j] = 1;
  },
  update: function (time, delta) {
    //time to shoot
    if (time > this.nextTic) {
      this.nextTic = time + 1000;
    }
  },
});
function placeDefender(pointer) {
  let i = Math.floor(pointer.y / 64);
  let j = Math.floor(pointer.x / 64);
  if (canPlaceDefender(i, j)) {
    const defender = defenders.get();
    console.log(defender);
    if (defender) {
      defender.setActive(true);
      defender.setVisible(true);
      defender.place(i, j);
    }
  }
}
function canPlaceDefender(i, j) {
  return map[i][j] === 0;
}
function create() {
  const graphics = this.add.graphics();
  drawGrid(graphics);
  path = this.add.path(96, -32);
  path.lineTo(96, 164);
  path.lineTo(480, 164);
  path.lineTo(480, 544);

  graphics.lineStyle(3, 0xffffff, 1);
  // visualize the path
  path.draw(graphics);
  enemies = this.add.group({ classType: Enemy, runChildUpdate: true });
  defenders = this.add.group({ classType: Defender, runChildUpdate: true });
  this.nextEnemy = 0;
  this.input.on('pointerdown', placeDefender);
}

function update(time, delta) {
  if (time > this.nextEnemy) {
    const enemy = enemies.get();
    if (enemy) {
      enemy.setActive(true);
      enemy.setVisible(true);

      // place the enemy at the start of the path
      enemy.startOnPath();
      this.nextEnemy = time + 2000;
    }
  }
}

function drawGrid(graphics) {
  graphics.lineStyle(1, 0x000ff, 0.8);
  for (let i = 0; i < 8; i++) {
    graphics.moveTo(0, i * 64);
    graphics.lineTo(640, i * 64);
  }
  for (let j = 0; j < 10; j++) {
    graphics.moveTo(j * 64, 0);
    graphics.lineTo(j * 64, 512);
  }
  graphics.strokePath();
}
