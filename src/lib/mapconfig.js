import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";

export const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

export const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

export const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

export const pointLight3 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [3.807751, -54.104682, 8000],
});

export const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
  pointLight3
});

export const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

export const INITIAL_VIEW_STATE = {
  longitude: 74.3587,
  latitude: 31.5204,
  zoom: 12,
  minZoom: 5,
  maxZoom: 15,
  pitch: 60,
  maxPitch : 80,
  bearing: -27
};

export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

export const partyColors = {
  'pti': [48, 80, 230],
  'pmln': [230, 80, 48],
  'ipp': [230, 80, 48]
}