import { Behavior } from "@/actors/behaviors/Behavior";
import { ExActor } from "@/actors/core/ExtendedActor";
import { state } from "@/game/Game";
import { Timer, Vector } from "excalibur";

export class TrailBehavior extends Behavior {
  timer: Timer | null = null;
  points: Vector[] = [];
  constructor(actor: ExActor) {
    super({
      actor,
      condition: () => true,
      enterCallback: () => {
        console.log("Trail behavior");
        this.timer = new Timer({
          fcn: () => {
            const point = this.points.find(
              (point) =>
                point.x === this.actor.pos.x && point.y === this.actor.pos.y
            );
            if (!point) {
              this.points.push(new Vector(this.actor.pos.x, this.actor.pos.y));
            }
            if (this.points.length > 100) {
              this.points = this.points.slice(1);
            }
          },
          repeats: true,
          interval: 150,
        });
        state.instance!.currentScene.addTimer(this.timer);
      },
      callback: (_) => {
        if (this.timer && !this.timer.isRunning) this.timer.start();
      },
    });
  }
}
