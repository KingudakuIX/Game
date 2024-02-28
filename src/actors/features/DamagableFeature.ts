import { ExActor } from "@/actors/characters/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { Damage } from "@/actors/misc/Damage";
import { Features } from "@/data/Features";
import { Color } from "excalibur";

export class DamageableFeature extends Feature {
  isInPain = false;
  // Keep tracks of skills that damaged the actor of attached to this feature and
  // check if the actor can receive damage from one source by checking first that
  // the source isn't listed in this array.
  damageSources: string[] = [];

  constructor(actor: ExActor) {
    super({
      key: Features.damageable,
      actor,
    });
  }

  onRenderLoop() {
    // Update graphics color to highlight the damage taken.
    this.actor.graphics.onPreDraw = async (ctx) => {
      ctx.tint = this.actor.isInPain ? Color.Red : Color.White;
    };
  }

  canTakeDamage(source: string) {
    const damageSource = this.damageSources.findIndex((f) => f === source);
    return damageSource === -1;
  }

  async handleDamageSource(source: string, cooldown: number) {
    await this.actor.actions.delay(cooldown).toPromise();
    this.damageSources = this.damageSources.filter((f) => f !== source);
  }

  async handleTakeDamage(damage: Damage, source: string, cooldown: number) {
    if (this.canTakeDamage(source)) {
      this.damageSources.push(source);

      this.actor.emit("receiveDamage", damage);

      // Async to avoid blocking the cycle of the function.
      this.handleDamageSource(source, cooldown);

      this.isInPain = true;
      await this.actor.actions.delay(150).toPromise();
      this.isInPain = false;
    }
  }
}
