import * as p5 from "p5";

interface Tetronimo {
  x: number;
  y: number;
  size: number;
}

const COLOURS = ["red", "green", "blue", "yellow", "orange"];

const getRandomColour = () =>
  COLOURS[Math.floor(Math.random() * COLOURS.length)];

const drawTetronimo = (s: p5, { x, y, size }: Tetronimo) => {
  s.fill(getRandomColour());
  s.rect(x, y, size, size);
};

export default drawTetronimo;
