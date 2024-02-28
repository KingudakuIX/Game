import { createFireAura01 } from "@/actors/spells/fire/FireAura01";
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
import { BaseCharacter } from "./BaseCharacter";
import { Label } from "./Label";
import { deathBehaviour } from "./behaviors/DeathBehaviour";
import { playerSkillsBehaviour } from "./behaviors/PlayerSkillBehaviour";
import { createFireBall01 } from "./spells/fire/FireBall01";
import { HealthBar } from "./ui/HealhBar";

const SPEED = 120;

export class Player extends BaseCharacter {
  moving = false;
  hp = 10;
  healthbar: HealthBar | null = null;
  label: Label | null = null;
  forceDirection = false;
  damageSources: string[] = [];

  constructor(x: number, y: number) {
    super(x, y, CharacterKeys.wizard_01);
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    this.addTag(TAG_PLAYER);

    this.z = 50;

    // @ts-ignore
    // this.graphics.use(characterAnimations.idle.down);

    this.behaviours.push(deathBehaviour());
    this.behaviours.push(playerSkillsBehaviour());

    const fireBall = createFireBall01({ tags: [TAG_ENEMY] });
    fireBall.key = "Num1";

    const fireAura = createFireAura01({ tags: [TAG_ENEMY] });
    fireAura.key = "Num2";

    this.skills.push(fireBall);
    this.skills.push(fireAura);

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
      if (!this.forceDirection && inputManager.lastDirection) {
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
  }

  canTakeDamage(source: string) {
    const damageSource = this.damageSources.findIndex((f) => f === source);
    return damageSource === -1;
  }

  async handleDamageSource(source: string, cooldown: number) {
    await this.actions.delay(cooldown).toPromise();
    this.damageSources = this.damageSources.filter((f) => f !== source);
  }

  async handleTakeDamage(damage: number, source: string, cooldown: number) {
    if (this.canTakeDamage(source)) {
      this.damageSources.push(source);
      this.hp -= damage;

      this.handleDamageSource(source, cooldown);

      console.log("Is in pain");
      this.isPain = true;
      await this.actions.delay(150).toPromise();
      this.isPain = false;
      console.log("Is in pain no more");
    }
  }
}
