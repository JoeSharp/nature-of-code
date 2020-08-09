import p5 from "p5";

interface ArrowProps {
  sketch: p5;
  position: p5.Vector;
  angle: number;
  colour: any;
  radius: number;
}

export default ({ sketch: s, position, angle, colour, radius }: ArrowProps) => {
  let theta = angle + s.PI / 2;
  s.fill(colour);
  s.noStroke();
  s.push();
  s.translate(position.x, position.y);
  s.rotate(theta);
  s.beginShape();
  s.vertex(0, -radius * 2);
  s.vertex(-radius, radius * 2);
  s.vertex(radius, radius * 2);
  s.endShape();
  s.pop();
};
