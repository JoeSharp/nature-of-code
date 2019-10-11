import * as React from "react";
import * as p5 from "p5";

interface IProps {
  sketch: (...args: any[]) => any;
}

const P5Sketch = ({ sketch }: IProps) => {
  const refContainer = React.useRef(null);

  React.useEffect(() => {
    let sketchInUse: p5;

    if (!!refContainer) {
      sketchInUse = new p5(
        sketch,
        (refContainer.current as unknown) as HTMLElement
      );
    }

    return () => {
      if (!!sketchInUse) {
        sketchInUse.remove();
      }
    };
  }, [sketch]);

  return <div ref={refContainer} />;
};

export default P5Sketch;
