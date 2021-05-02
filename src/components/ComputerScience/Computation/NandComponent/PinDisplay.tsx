import React from 'react';
import { PinNamedValueHistory } from './usePinValueHistory';

const PinDisplay: React.FunctionComponent<PinNamedValueHistory> = ({name, values }) => {
    return <div>
        <span>{name}</span>
        <svg>
        </svg>
         - {values.map((v, i) => (<div key={i}>{v}</div>))}
    </div>
}

export default PinDisplay;