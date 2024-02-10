import {
  Engine,
  Keys
} from "excalibur";
import { images } from "../game/Resources";
import { FPS, SPEED_DOWN, SPEED_IDLE, SPEED_LEFT, SPEED_RIGHT, SPEED_UP, TAG_ENEMY, TAG_PLAYER } from "../utils/Constants";
import { Direction, inputManager } from "../utils/InputManager";
import { characterAnimations } from "./Animations";
import { BaseCharacter } from "./BaseCharacter";
import { Label } from "./Label";
import { deathBehaviour } from "./behaviour/DeathBehaviour";
import { playerSkillsBehaviour } from "./behaviour/PlayerSkillBehaviour";
import { ProjectileProps } from "./effects/Projectile";
import { getCastSkill } from "./skills/castAttackSkill";
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
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    this.addTag(TAG_PLAYER);

    this.z = 50;

    // @ts-ignore
    this.graphics.use(characterAnimations.idle.down);

    this.behaviours.push(deathBehaviour());
    this.behaviours.push(playerSkillsBehaviour());

    const fireBall: ProjectileProps = {
      imageSource: images.flame_01,
      initialPos: 8,
      range: [0, 6],
      frameDuration: 100,
      grid: {
        columns: 9,
        rows: 30,
        spriteWidth: 64,
        spriteHeight: 64,
      },
      x: 0,
      y: 0,
      width: 64,
      height: 64,
      damage: 2,
      speed: 200,
      hitTag: [TAG_ENEMY],
    }
    const skill = getCastSkill(this.imageSource, fireBall);
    skill.key = "Num1"

    this.skills.push(skill);

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

    if (this.healthbar) this.healthbar.onUpdate(this.hp);
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
    }
    // const skill = this.skills.find((skill) => skill.key === "Num1");
    // if (engine.input.keyboard.wasPressed(Keys.Num1)) {
    //   console.log("Button 1 - pressed");
    //   if (skill) skill.execute = true;
    // } else {
    //   if (skill) skill.execute = false;
    // }
  }

  async handleTakeDamage(damage: number) {
    this.hp -= damage;

    this.isPain = true;
    await this.actions.delay(150).toPromise();
    this.isPain = false;

    // const {characterAnimations} =getCharacterAnimation(this.imageSource);
    // this.animations = characterAnimations;
    // this.graphics.ù
    // this.actions.blink(150, 75, 1);
  }
}
