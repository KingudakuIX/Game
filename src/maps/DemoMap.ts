import { EnemyActor } from "@/actors/enemies/EnemyActor";
import { PlayerActor } from "@/actors/player/PlayerActor";
import { Maps } from "@/data/Maps";
import { state } from "@/game/Game";
import { demoMapTiled, loader } from "@/game/Resources";
import { ExtendedScene } from "@/scenes/ExtendedScene";
import { Vector } from "excalibur";

export function DemoMap() {
  if (!state.instance) return;

  // After game engine is set up, load scene and actors:
  state.instance.start(loader).then(() => {
    const player = new PlayerActor();
    player.pos.x = 10 * 16;
    player.pos.y = 10 * 16;
    //player.scale = new Vector(0.5, 0.5);

    const demoScene = new ExtendedScene({
      player: player,
      cameraPos: new Vector(
        0,
        0
        // images.backgroundImage.width / 2,
        // images.backgroundImage.height / 2
      ),
    });

    let layer = demoMapTiled.getObjectLayers("Collision")[0];
    console.log("layer", layer);
    // const walls = layer.getObjectsByName("wall");
    // console.log("walls", walls);

    const who = demoMapTiled.getTilesetForTileGid(4);

    console.log("who", who);
    console.log("demoMapTiled", demoMapTiled);
    // walls.forEach((wall) => {
    //   console.log("wall", wall);
    //   //wall.addComponent()
    // });

    // const points = buildPolysFromGridMap();

    demoMapTiled.addToScene(demoScene);

    // const map = new Map({ image: images.backgroundImage });
    // demoScene.add(map);

    const enemy = new EnemyActor();
    enemy.pos.x = 20 * 16;
    enemy.pos.y = 15 * 16;
    //enemy.scale = new Vector(0.5, 0.5);
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
