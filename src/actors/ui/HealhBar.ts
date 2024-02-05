import { Actor, Engine } from "excalibur";
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
    const heart = new Heart();
    heart.z = (this.parent as Actor).z + 1;
    this.addChild(heart);

    for (let i = 0; i < 10; i++) {
      const hpSegment = new HpSegment(6 + i * 8);
      hpSegment.z = (this.parent as Actor).z;
      this.segments.push(hpSegment);
      this.addChild(hpSegment);
    }
  }
  onUpdate(hp: number) {
    this.hp = hp;
    console.log("hp", hp);
  }
  // Demo purpose:
  onPreUpdate(engine: Engine) {
    for (let i = 0; i < 10; i++) {
      this.segments[i].onUpdate(this.hp, i);
    }
  }
}