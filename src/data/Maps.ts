import demoMap from "./demoMap.json";
interface Map {
  key: string;
  mapData: {
    tilesets: {
      name: string;
      image: string;
      imagewidth: number;
      imageheight: number;
      tilewidth: number;
      tileheight: number;
    }[];
    layers: { name: string; tileset: string; data: number[] }[];
  };
}
export const Maps: { [Key: string]: Map } = {
  demo: {
    key: "Demo",
    mapData: { tilesets: demoMap.tilesets, layers: demoMap.layers },
  },
};
