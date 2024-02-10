import { Actor, Engine, ImageSource, Keys } from "excalibur";
import { Label } from "../Label";
import { Npc } from "../Npc";
import { deathBehaviour } from "../behaviour/DeathBehaviour";
import { followBehaviour } from "../behaviour/FollowBehaviour";
import { skillsBehaviour } from "../behaviour/SkillsBehaviour";
import { HealthBar } from "../ui/HealhBar";

export interface EnemyProps {
  x: number;
  y: number;
  imageSource: ImageSource;
  name: string;
  hp: number;
}

export class Enemy extends Npc {
  hp: number;
  target: Actor | null = null;
  healthbar: HealthBar | null = null;
  moving = false;
  speed = 80;

  constructor({ x, y, imageSource, name, hp }: EnemyProps) {
    super(
      x,
      y,
      imageSource,
    );

    this.hp = hp;

    this.behaviours.push(deathBehaviour());
    this.behaviours.push(followBehaviour());
    this.behaviours.push(skillsBehaviour());

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

    // TEST
    if (engine.input.keyboard.wasPressed(Keys.L)) {
      this.hp -= 1;
      if (this.healthbar) this.healthbar.onUpdate(this.hp);
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
}
