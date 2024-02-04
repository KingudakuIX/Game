import { Actor, Engine, Input } from "excalibur";
import { Heart } from "./Heart";
import { HpSegment } from "./HpSegment";

export class HealthBar extends Actor {
  hp: number;
  segments: HpSegment[] = [];
  constructor(hp: number) {
    super({
      x: -40,
      y: -28
    })
    this.hp = hp;
  }
  onInitialize(engine: Engine): void {
    const heart = new Heart()
    this.addChild(heart);

    for (let i = 0; i < 10; i++) {
      const hpSegment = new HpSegment(6 + i * 8);
      this.segments.push(hpSegment);
      this.addChild(hpSegment);
      // if (this.hp < 3 && i < this.hp) {

      // } else if (this.hp < 6 && i < this.hp) {

      // } else if (i < this.hp) {

      // } else {

      // }
    }
  }
  onUpdate(hp: number) {
    this.hp = hp;
  }
  // Demo purpose:
  onPreUpdate(engine: Engine) {
    if (engine.input.keyboard.wasPressed(Input.Keys.P)) {
      this.hp -= 1;
    }
    for (let i = 0; i < 10; i++) {
      this.segments[i].onUpdate(this.hp, i);
    }
  }
}