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
    s.strokeWeight(2);
    s.stroke(this.colour);
    s.fill("gold");

    s.push();
    s.translate(this.position.x, this.position.y);
    s.triangle(0, -this.size, -(this.size / 2), 0, this.size / 2, 0);
    s.triangle(-this.size / 2, 0, -this.size, this.size, 0, this.size);
    s.triangle(this.size / 2, 0, this.size, this.size, 0, this.size);
    s.pop();

    s.push();
    s.translate(this.position.x, this.position.y);
    for (let i = 0; i < this.tailLength; i++) {
      s.translate(0, -this.size * 2);
      s.scale(0.9);
      s.triangle(0, -this.size, -(this.size / 2), 0, this.size / 2, 0);
    }
    s.pop();
  }
}

export default Tetronimo;
