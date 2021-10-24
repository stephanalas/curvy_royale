import { Game, Types } from 'phaser';

const game = new Phaser.Game({
  title: 'Curvy Royale',
  type: Phaser.AUTO,
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

let graphics, path, enemies;

function preload() {
  // load the game assets – enemy and turret atlas
  // this.load.atlas('tiles');
  // this.load.image('bullet', 'assets/bullet.png');
}
const ENEMY_SPEED = 1 / 10000;
const Enemy = new Phaser.Class({
  follower: { t: 0, vec: new Phaser.Math.Vector2() },
  Extends: Phaser.GameObjects.Image,

  initialize: function Enemy(scene) {
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
function create() {
  const graphics = this.add.graphics();

  path = this.add.path(96, -32);
  path.lineTo(96, 164);
  path.lineTo(480, 164);
  path.lineTo(480, 544);

  graphics.lineStyle(3, 0xffffff, 1);
  // visualize the path
  path.draw(graphics);
  enemies = this.add.group({ classType: Enemy, runChildUpdate: true });
  this.nextEnemy = 0;
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
