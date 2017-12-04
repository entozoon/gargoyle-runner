import Pixi from './PixiCreate';

export default class Building {
  constructor(options) {
    // Texture is just the image data, sprite is the object but TilingSprite is ronseal
    // let sprite = new Pixi.engine.Sprite(this.texture);
    this.sprite = new Pixi.engine.extras.TilingSprite(options.texture);
    this.sprite.width = 600;
    this.sprite.height = 600;
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 0;
    this.sprite.position = {
      x: Pixi.app.renderer.screen.width,
      y: 200
    };
    this.sprite.scale = { x: 1, y: 1 };
    // HIT, probably won't use this.. just.. do it manual styles.
    // this.sprite.hitArea = new Pixi.engine.Rectangle(0, 0, 100, 100);
    Pixi.app.stage.addChild(this.sprite);
  }

  get speed() {
    return this._speed;
  }

  set speed(speed) {
    this._speed = speed;
  }

  update(dt) {
    this.sprite.x -= this.speed * dt;
  }
}