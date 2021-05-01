import React from 'react';
import { PinNamedValueHistory } from './usePinValueHistory';

const PinDisplay: React.FunctionComponent<PinNamedValueHistory> = ({name, values}) => {

    return <div>
        {name} - {values.map(v => (<div>{v}</div>))}
    </div>
}

export default PinDisplay;