import { Player } from "@/actors/Player";
import { Map } from "@/actors/map/Map";
import { Maps } from "@/data/Maps";
import { state } from "@/game/Game";
import { images, loader } from "@/game/Resources";
import { ExtendedScene } from "@/scenes/ExtendedScene";
import { Vector } from "excalibur";

export function DemoMap() {
  if (!state.instance) return;

  // After game engine is set up, load scene and actors:
  state.instance.start(loader).then(() => {
    const player = new Player(
      images.backgroundImage.width / 2,
      images.backgroundImage.height / 2
    );

    const demoScene = new ExtendedScene({
      player: player,
      cameraPos: new Vector(
        images.backgroundImage.width / 2,
        images.backgroundImage.height / 2
      ),
    });

    const map = new Map({ image: images.backgroundImage });
    demoScene.add(map);

    state.instance?.add(Maps.demo.key, demoScene);

    state.instance?.goToScene(Maps.demo.key);
  });
}