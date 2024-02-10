import {
  Engine,
  Keys
} from "excalibur";
import { images } from "../game/Resources";
import { FPS, SPEED_DOWN, SPEED_IDLE, SPEED_LEFT, SPEED_RIGHT, SPEED_UP, TAG_PLAYER } from "../utils/Constants";
import { Direction, inputManager } from "../utils/InputManager";
import { characterAnimations } from "./Animations";
import { BaseCharacter } from "./BaseCharacter";
import { Label } from "./Label";
import { HealthBar } from "./ui/HealhBar";

const SPEED = 120;

export class Player extends BaseCharacter {
  moving = false;
  hp = 10;
  healthbar: HealthBar | null = null;

  constructor(x: number, y: number) {
    super(
      x,
      y,
      images.character_01,
    );

    this.addTag(TAG_PLAYER);

    this.z = 50;

    // @ts-ignore
    this.graphics.use(characterAnimations.idle.down);

    const label = new Label("Player");
    label.pos.y = -30;
    label.z = this.z + 1;
    this.addChild(label);

    const healthbar = new HealthBar(this.hp);
    healthbar.z = this.z + 1;
    this.addChild(healthbar);
    this.healthbar = healthbar;
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);

    this.handleInputs(engine, delta);

    if (!this.isDying) {
      this.setAction(this.moving ? "walk" : "idle");
      if (inputManager.lastDirection) {
        this.setDirection(inputManager.lastDirection as Direction);
      }
    }

    this.handleAnimation();
  }

  handleInputs(engine: Engine, delta: number) {
    if (this.isDying) return;

    var vel = SPEED_IDLE.clone();
    if (inputManager.inputs.directions[Direction.up]) {
      vel.addEqual(SPEED_UP);
    }
    if (inputManager.inputs.directions[Direction.left]) {
      vel.addEqual(SPEED_LEFT);
    }
    if (inputManager.inputs.directions[Direction.down]) {
      vel.addEqual(SPEED_DOWN);
    }
    if (inputManager.inputs.directions[Direction.right]) {
      vel.addEqual(SPEED_RIGHT);
    }
    const moving = vel.x !== 0 || vel.y !== 0;
    this.vel = moving ? vel.normalize().scale(SPEED * Math.floor(delta / FPS)) : vel;

    this.moving = moving;

    // TEST
    if (engine.input.keyboard.wasPressed(Keys.P)) {
      this.hp -= 1;
      if (this.healthbar) this.healthbar.onUpdate(this.hp);
      if (this.hp === 0) this.handleDying();
    }
  }
}
