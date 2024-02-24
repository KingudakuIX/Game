import { Engine, Keys } from "excalibur";
import { CharacterKeys } from "../data/characters/Characters";
import {
  SPEED_DOWN,
  SPEED_IDLE,
  SPEED_LEFT,
  SPEED_RIGHT,
  SPEED_UP,
  TAG_ENEMY,
  TAG_PLAYER,
} from "../utils/Constants";
import { Direction, inputManager } from "../utils/InputManager";
import { characterAnimations } from "./Animations";
import { BaseCharacter } from "./BaseCharacter";
import { Label } from "./Label";
import { deathBehaviour } from "./behaviour/DeathBehaviour";
import { playerSkillsBehaviour } from "./behaviour/PlayerSkillBehaviour";
import { createFireBall01 } from "./spells/fire/FireBall01";
import { HealthBar } from "./ui/HealhBar";

const SPEED = 120;

export class Player extends BaseCharacter {
  moving = false;
  hp = 10;
  healthbar: HealthBar | null = null;
  label: Label | null = null;

  constructor(x: number, y: number) {
    super(x, y, CharacterKeys.wizard_01);
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    this.addTag(TAG_PLAYER);

    this.z = 50;

    // @ts-ignore
    this.graphics.use(characterAnimations.idle.down);

    this.behaviours.push(deathBehaviour());
    this.behaviours.push(playerSkillsBehaviour());

    const skill = createFireBall01({ tags: [TAG_ENEMY] });
    skill.key = "Num1";

    this.skills.push(skill);

    const label = new Label("Player");
    label.pos.y = -30;
    label.z = this.z + 1;
    this.addChild(label);
    this.label = label;

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

    if (this.healthbar) this.healthbar.onUpdate(this.hp);
  }

  handleInputs(engine: Engine, delta: number) {
    if (this.isDying || this.actionAnimation) return;

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
    this.vel = moving ? vel.normalize().scale(SPEED) : vel;

    this.moving = moving;

    // TEST
    if (engine.input.keyboard.wasPressed(Keys.P)) {
      this.hp -= 1;
    }

    const lastPos = engine.input.pointers.primary.lastWorldPos;

    const mousePos = document.querySelector("#mouse_pos");
    mousePos &&
      (mousePos.innerHTML = `x: ${Math.round(lastPos.x)} - y: x: ${Math.round(
        lastPos.y
      )}`);

    const pos = document.querySelector("#character_pos");
    pos &&
      (pos.innerHTML = `Player: x: ${Math.round(this.pos.x)} - y: ${Math.round(
        this.pos.y
      )}`);

    const angle = document.querySelector("#angle");
    angle &&
      (angle.innerHTML = `${
        Math.round(
          (Math.atan2(lastPos.y - this.pos.y, lastPos.x - this.pos.x) +
            Math.PI) *
            100
        ) / 100
      }`);
  }

  async handleTakeDamage(damage: number) {
    this.hp -= damage;

    this.isPain = true;
    await this.actions.delay(150).toPromise();
    this.isPain = false;
  }
}
