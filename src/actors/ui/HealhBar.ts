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
    heart.name = "heart";
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
  }
  onPreUpdate(_: Engine) {
    this.children.forEach((child) => {
      if (child.name === "heart") {
        // @ts-ignore
        child.z = (this.parent as Actor).z + 1;
      } else {
        // @ts-ignore
        child.z = (this.parent as Actor).z;
      }
      // @ts-ignore
      child.graphics.opacity = this.graphics.opacity;
    })
    for (let i = 0; i < 10; i++) {
      this.segments[i].onUpdate(this.hp, i);
    }
  }
  fadeIn() {
    this.actions.fade(1, 500);
  }
  fadeOut() {
    this.actions.fade(0, 500);
  }
}