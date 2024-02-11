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
  moving = false;
  speed = 80;

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
  }

  onPreUpdate(engine: Engine, delta: number) {
    super.onPreUpdate(engine, delta);

    if (this.healthbar) this.healthbar.onUpdate(this.hp);

    if (this.isDying) return;

    this.setAction(this.moving ? "walk" : "idle");

    // TEST
    if (engine.input.keyboard.wasPressed(Keys.L)) {
      this.hp -= 1;
    }

    // Show correct appearance
    this.handleAnimation();
  }

  onPreUpdateAttack(delta: number) {
    if (!this.target) return;
    // Check if the target is the player, if it is, proceed with the attack phase by checking the distance
    const dest = this.target.pos;
    const distance = Math.round(dest.distance(this.pos));
    if (distance <= 40) {
    }
  }

  async handleTakeDamage(damage: number) {
    console.log("enemy take damage");
    this.hp -= damage;

    this.isPain = true;
    await this.actions.delay(150).toPromise();
    this.isPain = false;
  }
}
