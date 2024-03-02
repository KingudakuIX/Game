import { ImageSource, Loader } from "excalibur";

const images = {
  backgroundImage: new ImageSource("/demomap.webp"),

  mannequin_idle: new ImageSource("/assets/characters/demo/idle.png"),
  mannequin_run: new ImageSource("/assets/characters/demo/run.png"),
  mannequin_cast2h: new ImageSource("/assets/characters/demo/cast2h.png"),

  character_01: new ImageSource("/democharacter.png"),
  character_02: new ImageSource("/enemy.png"),

  impact_01: new ImageSource("/impact.png"),
  flame_01: new ImageSource("/flame.png"),

  heart: new ImageSource("/heart.png"),
  health: new ImageSource("/health_segments.png"),
};

const loader = new Loader();
loader.suppressPlayButton = true;
const allResources = { ...images };
loader.addResources(Object.values(allResources));

export { images, loader };
