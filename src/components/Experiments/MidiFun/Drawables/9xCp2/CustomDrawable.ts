import p5 from "p5";
import AbstractDrawable from "../AbstractDrawable";

class CustomDrawable extends AbstractDrawable {
    draw(s: p5) {
      s.strokeWeight(2);
      s.stroke(this.colour);
      s.fill("gold");
  
      s.push();
      s.translate(this.position.x, this.position.y);
      s.circle(0, 0, this.size);
      s.pop();
    }
  }
  
export default CustomDrawable;  