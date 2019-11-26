import p5 from "p5";

const COLOURS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet"
];

class Bullet {
  s: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  color: string;

  constructor(s: p5, position: p5.Vector, velocity: p5.Vector) {
    this.s = s;
    this.position = position;
    this.velocity = velocity;
    this.color = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }

  update() {
    this.position.add(this.velocity);
  }

  draw() {
    this.s.push();
    this.s.translate(this.position.x, this.position.y);
    this.s.noStroke();
    this.s.fill(this.color);
    this.s.circle(0, 0, 5);
    this.s.pop();
  }
}

export default Bullet;
