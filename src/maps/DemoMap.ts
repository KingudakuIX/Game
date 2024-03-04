import { EnemyActor } from "@/actors/enemies/EnemyActor";
import { Map } from "@/actors/map/Map";
import { PlayerActor } from "@/actors/player/PlayerActor";
import { Maps } from "@/data/Maps";
import { state } from "@/game/Game";
import { images, loader } from "@/game/Resources";
import { ExtendedScene } from "@/scenes/ExtendedScene";
import { Vector } from "excalibur";

export function DemoMap() {
  if (!state.instance) return;

  // After game engine is set up, load scene and actors:
  state.instance.start(loader).then(() => {
    const player = new PlayerActor();
    player.pos.x = images.backgroundImage.width / 2;
    player.pos.y = images.backgroundImage.height / 2;

    const demoScene = new ExtendedScene({
      player: player,
      cameraPos: new Vector(
        images.backgroundImage.width / 2,
        images.backgroundImage.height / 2
      ),
    });

    const map = new Map({ image: images.backgroundImage });
    demoScene.add(map);

    const enemy = new EnemyActor();
    enemy.pos.x = images.backgroundImage.width / 2 + 400;
    enemy.pos.y = images.backgroundImage.height / 2 + 200;
    demoScene.add(enemy);

    state.instance?.add(Maps.demo.key, demoScene);

    state.instance?.goToScene(Maps.demo.key);

    // const clock = new StandardClock({ maxFps: 30, tick: () => {} });
    // demoScene.add(clock);

    setTimeout(() => {
      enemy.emit("setTarget", player);
    }, 3000);
  });
}
