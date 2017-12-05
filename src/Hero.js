import Pixi from './PixiCreate';

export class Hero {
  constructor() {
    this.gravity = 0.2;
    this.jumpVelocity = 10;
    this.velocity = { y: 0, x: 0.5 };
    this.temporaryTicker = 0;
    this.onFloor = false;
    this._dead = false;

    this.texture = new Pixi.engine.Texture.fromImage('./assets/hero.png').baseTexture;

    // this.ergh = new Pixi.engine.Texture(this.texture, {
    //   x: 0,
    //   y: 0,
    //   width: this.spriteSize,
    //   height: this.spriteSize
    // });
    // this.sprite = new Pixi.engine.Sprite(this.ergh);
    //
    this.spriteSize = 50;

    this.spriteTextures = {};
    // this.sprites = {};
    ['run', 'jump', 'dead'].forEach((pose, i) => {
      this.spriteTextures[pose] = new Pixi.engine.Texture(this.texture, {
        x: i * this.spriteSize,
        y: 0,
        width: this.spriteSize,
        height: this.spriteSize
      });
      // this.sprites[pose] = new Pixi.engine.Sprite(this.spriteTextures[pose]);
    });

    // Default, for a split second
    this.sprite = new Pixi.engine.Sprite(this.spriteTextures['jump']);

    // Pixi.engine.utils.TextureCache[0] = sprite;

    // this.sprite = this.sprite1; // new Pixi.engine.Sprite.fromImage('./assets/hero.png');

    // this.width = this.sprite.width = 50;
    // this.height = this.sprite.height = 50;
    // this.sprite.anchor.x = 0;
    // this.sprite.anchor.y = 0;
    // this.sprite.scale = { x: 1, y: 1 };
    // this.sprite.position = {
    //   x: 300,
    //   y: 300
    // };

    Pixi.app.stage.addChild(this.sprite);

    this.position = { x: 0, y: 0 };
    this.sprite.position = this.position;

    document.addEventListener('keydown', e => {
      this.jamp();
    });
  }

  set y(y) {
    this.sprite.position.y = y;
  }
  get y() {
    return this.sprite.position.y;
  }
  get x() {
    return this.sprite.position.x;
  }
  get width() {
    return this.sprite.width;
  }
  get height() {
    return this.sprite.height;
  }

  get dead() {
    return this._dead;
  }
  set dead(dead) {
    this._dead = dead;
    if (dead) {
      this.velocity.x = 0;
      console.log('Game over.');
    }
  }

  // set position(position) {
  //   this._position = position;
  //   this.sprite.position = position;
  // }
  // get position() {
  //   return this._position;
  // }

  pose() {
    if (this.dead) {
      this._pose = 'dead';
    } else if (this.velocity.y < 0) {
      this._pose = 'jump';
    } else {
      this._pose = 'run';
    }

    this.sprite.texture = this.spriteTextures[this._pose];
  }

  jamp() {
    this.velocity.y = -this.jumpVelocity;
  }

  forces() {
    // Platform
    if (this.onFloor) {
      this.velocity.y = 0;
      return;
    }

    this.velocity.y += this.gravity;
    this.y += this.velocity.y;
  }

  collisions(buildings) {
    this.onFloor = false;

    buildings.forEach(building => {
      if (
        // Smashing into the side of a building, ya ded
        (this.y + this.height > building.y && this.x > building.x - this.width) ||
        // Fallen all the way down, y'also ded
        this.y > Pixi.height
      ) {
        this.dead = true;
        return;
      } else if (
        // Floor - vaguely bounding-boxy
        this.y + this.height > building.y &&
        this.x + this.width > building.x &&
        this.x < building.x + building.width
      ) {
        this.onFloor = true;
        return;
      }
    });
  }

  update(dt) {
    // Isn't necessary much, as the engine handles all rendering updates

    // this.velocity.x = Math.sin(++this.temporaryTicker / 100) + 1;
    this.pose();
    this.forces();
  }
}
