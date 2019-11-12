import p5, { Image } from "p5";

import ships from "./images/ships";

interface ConstructShip {
  s: p5;
  position: p5.Vector;
  radius: number;
}

interface Update {
  steer: number;
  thrust: number;
}

class Ship {
  s: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  heading: number;
  radius: number;
  imageIndex: number;
  images: Image[];

  constructor({ s, position, radius }: ConstructShip) {
    this.s = s;
    this.position = position;
    this.velocity = s.createVector();
    this.acceleration = s.createVector();
    this.heading = 0;
    this.radius = radius;
    this.imageIndex = 0;
    this.images = ships.map(ship => s.loadImage(ship.image));
  }

  nextImage() {
    this.imageIndex += 1;
    this.imageIndex %= this.images.length;
  }

  update({ steer, thrust }: Update) {
    this.heading += steer * 0.1;

    let thrustForce = this.s.createVector(0, thrust * 0.4);
    thrustForce.rotate(this.heading);
    this.acceleration.add(thrustForce);
    this.velocity.add(this.acceleration);
    this.velocity.limit(4);
    this.velocity.mult(0.95);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // Cycle around the edges
    this.position.x += this.s.width;
    this.position.x %= this.s.width;
    this.position.y += this.s.height;
    this.position.y %= this.s.height;
  }

  draw() {
    this.s.push();
    this.s.noFill();
    this.s.stroke("green");
    this.s.translate(this.position.x, this.position.y);
    this.s.rotate(this.heading);
    this.s.image(
      this.images[this.imageIndex],
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    // this.s.triangle(
    //   -this.radius,
    //   -this.radius,
    //   this.radius,
    //   -this.radius,
    //   0,
    //   this.radius
    // );
    this.s.pop();
  }
}

export default Ship;
