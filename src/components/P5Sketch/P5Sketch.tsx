import * as React from 'react';
import {useEffect, useRef} from'react';
import * as p5 from "p5";

interface IProps {
   sketch: (
        ...args: any[]
      ) => any
}

const P5Sketch = ({sketch}: IProps) => {

    const refContainer = useRef(null);

    useEffect(() => {
        if(!!refContainer) {
            new p5(sketch, refContainer.current as unknown as HTMLElement);
        }
    })

    return <div ref={refContainer} />
}

export default P5Sketch;