import { k } from "/kaboom.js"

export const addLayers = () => {
  k.layers([
    "bg",
    "floor",
    "game",
    "ceiling",
    "fx",
    "ui",
  ], "game");
  k.camIgnore(["bg", "ui"]);
};