import { Behavior } from "@/actors/behaviors/Behavior";
import { ExActor } from "@/actors/core/ExtendedActor";
import { StateFeature } from "@/actors/features/StateFeature";
import { StatsFeature } from "@/actors/features/StatsFeature";
import { Features } from "@/data/Features";
import { Action, Direction, Round } from "@/utils/Common";

export class FollowBehavior extends Behavior {
  target: ExActor | null = null;
  constructor(actor: ExActor) {
    super({
      actor,
      condition: () => {
        if (this.target === null) return false;
        // Actor state
        const state = this.actor.getFeature<StateFeature>(Features.state);
        if (!state || state.isDead || state.isBusy) return false;

        // Target state:
        const targetState = this.target.getFeature<StateFeature>(
          Features.state
        );
        if (!targetState || targetState.isDead) return false;

        return true;
      },
      callback: () => {
        this.followTarget();
        this.faceTarget();
      },
      exitCallback: () => {
        this.target = null;
      },
    });

    console.log("Follow behavior initialized....");

    actor.on("setTarget", (target) => {
      console.log("setTarget", target);
      this.target = target as ExActor | null;
    });
  }

  followTarget = () => {
    if (!this.target) return;
    const state = this.actor.getFeature<StateFeature>(Features.state);
    const stats = this.actor.getFeature<StatsFeature>(Features.stats);
    if (!state || !stats) return;
    // Move towards the target point if far enough away
    const dest = this.target.pos;
    const distance = Math.round(dest.distance(this.actor.pos));
    if (distance > 60) {
      const direction = this.target.pos.sub(this.actor.pos).normalize();
      this.actor.pos = this.actor.pos.add(direction.scale(stats.speed / 75));
      state.setAction(Action.running);
    } else {
      state.setAction(Action.idle);
    }
  };

  faceTarget = () => {
    if (!this.target) return;
    const taregtPos = this.target.pos;
    const pos = this.actor.pos;

    // Calculate angle between our current actor and the target actor
    const angle = Round(
      Math.atan2(taregtPos.y - pos.y, taregtPos.x - pos.x) + Math.PI
    );

    // Divide a full circle (in radians) by the 8 directions
    const segment = Round((Math.PI * 2) / 8);

    // Each direction have it's own index here's a little schema:
    // 1° segment = Left,
    // 2° segment = Up Left,
    // 3° segment = Up,
    // ...
    // We can get the right direction by dividing the current angle between the segment angle
    var index = Math.round(angle / segment);
    if (index > directions.length - 1) index = 0;
    const direction = directions[index];
    const state = this.actor.getFeature<StateFeature>(Features.state);
    if (state) {
      state.setDirection(direction);
    }
  };
}

const directions = [
  Direction.left,
  Direction.up_left,
  Direction.up,
  Direction.up_right,
  Direction.right,
  Direction.down_right,
  Direction.down,
  Direction.down_left,
];
