import { Actor, Engine, Scene, Vector } from "excalibur";

interface SceneProps {
  player: Actor;
  cameraPos: Vector;
}

export class ExtendedScene extends Scene {
  player: Actor;
  cameraPos: Vector;

  constructor({ player, cameraPos }: SceneProps) {
    super();

    this.player = player;
    this.add(player);
    this.cameraPos = cameraPos;
  }

  onInitialize(engine: Engine): void {
    // Set initial camera position and set it to follow the player:
    engine.currentScene.camera.pos = this.cameraPos;
    engine.currentScene.camera.strategy.elasticToActor(this.player, 0.05, 0.4);
  }
}
