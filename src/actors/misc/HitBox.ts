import { state } from "@/game/Game";
import {
  Actor,
  Collider,
  CollisionContact,
  Color,
  Engine,
  Side,
  Vector,
} from "excalibur";
import { ExtendedActor } from "../behaviors/Behavior";
import { createCollision } from "./Collision";

interface Timing {
  oneTime: boolean;
  cooldown?: number;
}

export interface HitBoxProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  hitTag: string[];
  damage: number;
  timing: Timing;
  onCollision?: (actor: ExtendedActor) => void;
}

export class HitBox extends Actor {
  damage: number;
  hitTag: string[] = [];
  radius?: number;
  collisions: Actor[] = [];
  timing: Timing;
  onCollision: ((actor: ExtendedActor) => void) | undefined;
  constructor({
    x,
    y,
    width,
    height,
    radius,
    hitTag,
    damage,
    timing,
    onCollision,
  }: HitBoxProps) {
    super({
      x: x,
      y: y,
      color: Color.Red,
      width: width,
      height: height,
      radius: radius,
    });
    this.hitTag = hitTag;
    this.damage = damage;
    this.radius = radius;
    this.timing = timing;
    this.onCollision = onCollision;
  }
  onInitialize(_: Engine): void {
    if (state.debug.skill_collision) {
      const collision = createCollision({
        offset: new Vector(0, 0),
        width: this.width,
        height: this.height,
        radius: this.radius,
      });
      this.addChild(collision);
    }
  }
  onPreUpdate(engine: Engine, delta: number): void {
    if (this.timing.oneTime) {
      return;
    }
    if (this.collisions && this.collisions.length > 0) {
      this.collisions.forEach((actor) => {
        // @ts-ignore
        if (!actor.isDying) {
          // @ts-ignore
          actor.handleTakeDamage &&
            actor.handleTakeDamage(
              this.damage,
              this.id.toString(),
              this.timing.cooldown ?? 0
            );
        }
      });
    }
  }
  onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    if (other.owner.tags.some((tag) => this.hitTag?.includes(tag))) {
      // @ts-ignore
      other.owner.handleTakeDamage &&
        other.owner.handleTakeDamage(
          this.damage,
          this.id.toString(),
          this.timing.cooldown ?? 0
        );
      // @ts-ignore
      this.onCollision && this.onCollision(other.owner);
      this.collisions.push(other.owner as Actor);
    }
  }
  onCollisionEnd(self: Collider, other: Collider): void {
    console.log("onCollisionEnd - other", other);
    this.collisions = this.collisions.filter(
      (actor) => actor.id !== other.owner?.id
    );
  }
}
