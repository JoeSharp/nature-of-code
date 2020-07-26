import p5 from "p5";

interface ArrowProps {
  sketch: p5;
  location: p5.Vector;
  angle: number;
  colour: any;
  radius: number;
}

export default ({ sketch: s, location, angle, colour, radius }: ArrowProps) => {
  let theta = angle + s.PI / 2;
  s.fill(colour);
  s.noStroke();
  s.push();
  s.translate(location.x, location.y);
  s.rotate(theta);
  s.beginShape();
  s.vertex(0, -radius * 2);
  s.vertex(-radius, radius * 2);
  s.vertex(radius, radius * 2);
  s.endShape();
  s.pop();
};
