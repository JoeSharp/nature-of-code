import p5 from "p5";

export interface Drawable {
  note: number;
  accumulating: boolean;
  position: p5.Vector;
  draw: (s: p5) => void;
  update: () => void;
}
