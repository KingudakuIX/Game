import { Actor, Animation, SpriteSheet } from "excalibur";
import { images } from "../../game/Resources";

const heartSprite = SpriteSheet.fromImageSource({
  image: images.health,
  grid: {
    columns: 4,
    rows: 1,
    spriteWidth: 8,
    spriteHeight: 6,
  },
});

export class HpSegment extends Actor {
  constructor(x: number) {
    super({ x: x });

    this.graphics.use(Animation.fromSpriteSheet(heartSprite, [0], 100));
  }
  onUpdate(hp: number, i: number) {
    if (hp < 3 && i < hp) {
      this.graphics.use(Animation.fromSpriteSheet(heartSprite, [2], 100));
    } else if (hp < 6 && i < hp) {
      this.graphics.use(Animation.fromSpriteSheet(heartSprite, [1], 100));
    } else if (i < hp) {
      this.graphics.use(Animation.fromSpriteSheet(heartSprite, [0], 100));
    } else {
      this.graphics.use(Animation.fromSpriteSheet(heartSprite, [3], 100));
    }
  }
}