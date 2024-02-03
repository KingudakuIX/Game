import { ImageSource, Loader } from "excalibur";

const images = {
  backgroundImage: new ImageSource("/demomap.webp"),
  character_01: new ImageSource("/democharacter.png"),
};

const loader = new Loader();
loader.suppressPlayButton = true;
const allResources = { ...images };
loader.addResources(Object.values(allResources));

export { images, loader };
