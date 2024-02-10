import { Actor, Engine, ImageSource, Keys, Vector } from "excalibur";
import { FPS } from "../../utils/Constants";
import { Direction } from "../../utils/InputManager";
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
  healthbar: HealthBar | null = null;
  moving = false;
  speed = 120;

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
    this.healthbar = healthbar;
  }

  onPreUpdate(engine: Engine, delta: number) {
    super.onPreUpdate(engine, delta);

    if (this.isDying) return;

    this.setAction(this.moving ? "walk" : "idle")

    if (this.target) {
      this.onPreUpdateFollowTarget(delta);
      this.faceTowardsPosition(this.target.pos);
    } else {
      this.onPreUpdateRoaming(delta);
    }

    // TEST
    if (engine.input.keyboard.wasPressed(Keys.L)) {
      this.hp -= 1;
      if (this.healthbar) this.healthbar.onUpdate(this.hp);
      if (this.hp === 0) { this.handleDying(); }
    }

    // Show correct appearance
    this.handleAnimation();
  }

  onPreUpdateFollowTarget(delta: number) {
    if (!this.target) return;
    // Move towards the point if far enough away
    const dest = this.target.pos;
    const distance = Math.round(this.target.pos.distance(this.pos));

    var vel = SPEED_IDLE.clone();
    if (distance > 40) {
      if (this.pos.x < dest.x) {
        vel.addEqual(SPEED_RIGHT);
      }
      if (this.pos.x > dest.x) {
        vel.addEqual(SPEED_LEFT);
      }
      if (this.pos.y < dest.y) {
        vel.addEqual(SPEED_DOWN);
      }
      if (this.pos.y > dest.y) {
        vel.addEqual(SPEED_UP);
      }
      this.moving = true;
    } else {
      this.moving = false;
    }

    // this.moving = Math.abs(this.vel.x) > 0.5 || Math.abs(this.vel.y) > 0.5;
    this.vel = this.moving ? vel.normalize().scale(SPEED * Math.floor(delta / FPS)) : vel;
  }

  onPreUpdateRoaming(delta: number) {
    this.vel = SPEED_IDLE.clone();
    this.moving = false;
  }

  faceTowardsPosition(pos: Vector) {
    const xDiff = Math.abs(this.pos.x - pos.x);
    const yDiff = Math.abs(this.pos.y - pos.y);

    var direction;
    if (xDiff > yDiff) {
      direction = this.pos.x > pos.x ? Direction.left : Direction.right;
    } else {
      direction = this.pos.y > pos.y ? Direction.up : Direction.down;
    }
    this.setDirection(direction);
  }
}
