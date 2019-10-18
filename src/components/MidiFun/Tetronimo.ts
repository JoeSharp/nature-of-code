import p5 from "p5";

class Tetronimo {
  note: number;
  velocity: number;
  position: p5.Vector;
  size: number;
  colour: p5.Color;
  accumulating: boolean;
  tailLength: number = 0;

  constructor(
    note: number,
    velocity: number,
    position: p5.Vector,
    size: number,
    colour: p5.Color,
    accumulating: boolean
  ) {
    this.note = note;
    this.velocity = velocity;
    this.position = position;
    this.size = size;
    this.colour = colour;
    this.accumulating = accumulating;
  }

  update() {
    this.position.y += this.size;
    if (this.accumulating) {
      this.tailLength += 1;
    }
  }

  draw(s: p5) {
    s.fill(this.colour);
    s.square(this.position.x, this.position.y, this.size);

    for (let i = 0; i < this.tailLength; i++) {
      s.square(this.position.x, this.position.y - i * this.size, this.size);
    }
  }
}

export default Tetronimo;
