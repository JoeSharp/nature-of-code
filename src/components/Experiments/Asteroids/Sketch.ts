import p5 from "p5";
import { AbstractSketch } from "../P5Sketch/useSketch";
import Ship from "./Ship";
import Asteroid from "./Asteroid";
import Monster from "./Monster";
import Bullet from "./Bullet";

interface Config {}

const defaultConfig: Config = {};

const BULLET_SPEED = 10;

class Sketch extends AbstractSketch<Config> {
  constructor() {
    super(defaultConfig);
  }

  sketch = (s: p5) => {
    const that = this;
    let ship: Ship;
    let asteroids: Asteroid[] = [];
    let monsters: Monster[] = [];
    let bullets: Bullet[] = [];

    s.setup = function() {
      const {} = that.config;
      s.createCanvas(600, 600);

      let position = s.createVector(s.width / 2, s.height / 2);
      let radius = s.width / 20;
      ship = new Ship({ s, position, radius });

      for (let i = 0; i < 5; i++) {
        asteroids.push(new Asteroid(s));
      }

      for (let i = 0; i < 5; i++) {
        monsters.push(new Monster(s));
      }
    };

    s.keyPressed = function() {
      if (s.keyCode == (s as any).ENTER) {
        ship.nextImage();
      } else if (s.keyCode == 32) {
        // space
        let bulletVelocity = s.createVector(0, 1);
        bulletVelocity.setMag(BULLET_SPEED);
        bulletVelocity.rotate(ship.heading);
        let bullet = new Bullet(s, ship.position.copy(), bulletVelocity);
        bullets.push(bullet);
      }
    };

    s.draw = function() {
      s.background(0);

      [ship, ...asteroids, ...monsters, ...bullets].forEach(a => {
        a.update();
        a.draw();
      });

      bullets = bullets.filter(
        b =>
          b.position.x > 0 &&
          b.position.x < s.width &&
          b.position.y > 0 &&
          b.position.y < s.height
      );

      // Debug info
      s.noStroke();
      s.fill(255);
      s.text(`Bullets ${bullets.length}`, 50, 50);
    };
  };
}

export default Sketch;
