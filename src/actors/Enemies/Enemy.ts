import { Actor, Engine, ImageSource, Vector } from "excalibur";
import { Label } from "../Label";
import { Npc } from "../Npc";
import { HealthBar } from "../ui/HealhBar";

const SPEED = 60;
const SPEED_IDLE = new Vector(0, 0);
const SPEED_RIGHT = new Vector(1, 0);
const SPEED_LEFT = new Vector(-1, 0);
const SPEED_UP = new Vector(0, -1);
const SPEED_DOWN = new Vector(0, 1);

interface EnemyProps {
  x: number;
  y: number;
  imageSource: ImageSource;
  name: string;
  hp: number;
}

export class Enemy extends Npc {
  hp: number;
  areaGuid = "";
  target: Actor | null = null;
  constructor({ x, y, imageSource, name, hp }: EnemyProps) {
    super(
      x,
      y,
      imageSource,
    );

    this.hp = hp;

    const label = new Label(name);
    label.pos.y = -30;
    this.addChild(label);

    const healthbar = new HealthBar(hp);
    this.addChild(healthbar);
  }
  onPreUpdate(engine: Engine, delta: number) {
    if (this.target) {
      this.onPreUpdateMoveTowardsTarget();
    } else {
      // this.onPreUpdateMoveTowardsRoamingPoint();
    }

    // Show correct appearance
    this.handleAnimation();
  }
  onPreUpdateMoveTowardsTarget() {
    if (!this.target) return;
    // Move towards the point if far enough away
    const dest = this.target.pos;
    console.log("dest", dest.x);
    console.log("pos", this.pos.x);
    const distance = this.target.pos.distance(this.pos);
    if (distance > 40) {
      if (this.pos.x < dest.x) {
        this.vel.x = SPEED;
      }
      if (this.pos.x > dest.x) {
        this.vel.x = -SPEED;
      }
      if (this.pos.y < dest.y) {
        this.vel.y = SPEED;
      }
      if (this.pos.y > dest.y) {
        this.vel.y = -SPEED;
      }
    } else {
      this.vel.x = 0;
      this.vel.y = 0;
    }
  }
}
