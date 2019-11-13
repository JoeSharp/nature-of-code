import p5 from "p5";
import { AbstractSketch } from "../P5Sketch/useSketch";
import Ship from "./Ship";
import Asteroid from "./Asteroid";

interface Config {}

const defaultConfig: Config = {};

class Sketch extends AbstractSketch<Config> {
  constructor() {
    super(defaultConfig);
  }

  sketch = (s: p5) => {
    const that = this;
    let ship: Ship;
    let asteroids: Asteroid[] = [];

    s.setup = function() {
      const {} = that.config;
      s.createCanvas(600, 600);

      let position = s.createVector(s.width / 2, s.height / 2);
      let radius = s.width / 20;
      ship = new Ship({ s, position, radius });

      for (let i = 0; i < 5; i++) {
        asteroids.push(new Asteroid(s));
      }
    };

    s.keyPressed = function() {
      if (s.keyCode == (s as any).ENTER) {
        ship.nextImage();
      }
    };

    s.draw = function() {
      s.background(0);

      let steer = 0;
      let thrust = 0;
      if (s.keyIsDown((s as any).LEFT_ARROW)) {
        steer = -1;
      } else if (s.keyIsDown((s as any).RIGHT_ARROW)) {
        steer = 1;
      } else if (s.keyIsDown((s as any).UP_ARROW)) {
        thrust = 1;
      }
      ship.update({
        steer,
        thrust
      });
      ship.draw();

      asteroids.forEach(a => {
        a.update();
        a.draw();
      });
    };
  };
}

export default Sketch;
