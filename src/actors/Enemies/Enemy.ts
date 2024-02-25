import { Actor, Engine, Keys } from "excalibur";
import { CharacterKeys } from "../../data/characters/Characters";
import { TAG_ENEMY } from "../../utils/Constants";
import { Npc } from "../Npc";
import { deathBehaviour } from "../behaviour/DeathBehaviour";
import { followBehaviour } from "../behaviour/FollowBehaviour";
import { skillsBehaviour } from "../behaviour/SkillsBehaviour";
import { HealthBar } from "../ui/HealhBar";

export interface EnemyProps {
  x: number;
  y: number;
  characterKey: CharacterKeys;
  name: string;
  hp: number;
}

export class Enemy extends Npc {
  hp: number;
  target: Actor | null = null;
  healthbar: HealthBar | null = null;
  healthbarDuration = 0;
  moving = false;
  speed = 80;
  damageSources: string[] = [];

  constructor({ x, y, characterKey, name, hp }: EnemyProps) {
    super(x, y, characterKey);

    this.hp = hp;

    this.characterName = name;
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    this.addTag(TAG_ENEMY);

    this.behaviours.push(deathBehaviour());
    this.behaviours.push(followBehaviour());
    this.behaviours.push(skillsBehaviour());

    const healthbar = new HealthBar(this.hp);
    this.addChild(healthbar);
    this.healthbar = healthbar;
    this.healthbar.graphics.opacity = 0;
  }

  onPreUpdate(engine: Engine, delta: number) {
    super.onPreUpdate(engine, delta);

    if (this.healthbar) {
      // this.healthbar.z = this.z + 1;
      this.healthbar.onUpdate(this.hp);

      if (this.healthbarDuration > 0) {
        this.healthbarDuration -= 1;
        if (this.healthbarDuration <= 0) {
          this.healthbar.fadeOut();
          console.log("hidden");
        }
      }
    }

    // TEST
    if (engine.input.keyboard.wasPressed(Keys.K)) {
      this.hp -= 1;
      console.log("enemy healthbar.z", this.healthbar!.z);
      console.log("enemy.z", this.z);
      console.log("target.z", this.target!.z);
    }

    if (this.isDying) return;

    this.setAction(this.moving ? "walk" : "idle");

    // TEST
    if (engine.input.keyboard.wasPressed(Keys.L)) {
      this.hp -= 1;
    }

    // Show correct appearance
    this.handleAnimation();
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

      this.showHealthBar();

      this.isPain = true;
      await this.actions.delay(150).toPromise();
      this.isPain = false;
    }
  }

  showHealthBar() {
    if (this.healthbar) {
      console.log("visible");
      this.healthbar.fadeIn();
    }

    this.healthbarDuration = 500;
  }
}
