import * as React from "react";
import * as p5 from "p5";

import vectorsSketch from "./vectorsSketch";
import useVectors from "./useVectors";

const VectorsDemo: React.FunctionComponent = () => {
  const refContainer = React.useRef(null);
  const {} = useVectors();

  React.useEffect(() => {
    let sketchInUse: p5;

    if (!!refContainer) {
      sketchInUse = new p5(
        vectorsSketch,
        (refContainer.current as unknown) as HTMLElement
      );
    }

    return () => {
      if (!!sketchInUse) {
        sketchInUse.remove();
      }
    };
  }, []);

  return (
    <div>
      VECTORS DEMO
      <div ref={refContainer} />
    </div>
  );
};

export default VectorsDemo;
