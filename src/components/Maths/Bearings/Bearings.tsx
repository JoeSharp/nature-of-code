import React from 'react';
import Button from 'src/components/Bootstrap/Buttons/Button';
import useListReducer from 'src/components/lib/useListReducer';
import useSketch from 'src/components/p5/useSketch';
import BearingSketch, { Bearing } from './BearingSketch';

const DEGREES = <span>&#176;</span>;

const Bearings: React.FunctionComponent = () => {
    const { addItem, items: bearings, removeItemAtIndex } = useListReducer<Bearing>();
    const [bearing, setBearing] = React.useState<number>(90);
    const [distance, setDistance] = React.useState<number>(50);

    const onBearingChange: React.ChangeEventHandler<HTMLInputElement> =
        React.useCallback(({ target: { value } }) => setBearing(parseInt(value)), [setBearing]);
    const onDistanceChange: React.ChangeEventHandler<HTMLInputElement> =
        React.useCallback(({ target: { value } }) => setDistance(parseInt(value)), [setDistance]);

    const onAddBearing = React.useCallback(() => addItem({ bearing, distance }), [bearing, distance, addItem]);

    const { updateConfig, refContainer } = useSketch(BearingSketch);

    React.useEffect(() => updateConfig({ bearings }), [bearings, updateConfig])



    const exportString = React.useMemo(() => btoa(JSON.stringify({ bearings })), [bearings]);

    return (<div>
        <div ref={refContainer} />

        <div className='form-group'>
            <input className='form-control' value={exportString} />
        </div>

        <div>
            <h3>New Line</h3>
            <div className='form-group'>
                <label htmlFor='txtBearing'>Bearing (x{DEGREES})</label>
                <input id='txtBearing' className='form-control' type='number' value={bearing} onChange={onBearingChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='txtDistance'>Distance (pixels)</label>
                <input id='txtDistance' className='form-control' type='number' value={distance} onChange={onDistanceChange} />
            </div>
            <Button styleType='primary' onClick={onAddBearing} text='Add' />
        </div>

        <table className='table table-striped table-compact'>
            <thead>
                <tr>
                    <th>Bearing{DEGREES}</th>
                    <th>Distance (pixels)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bearings.map(({ bearing, distance }, i) => (<tr key={i}>
                    <td>{distance}</td>
                    <td>{bearing}{DEGREES}</td>
                    <td><Button styleType='danger' onClick={() => removeItemAtIndex(i)} text='Remove' /></td>
                </tr>))}
            </tbody>
        </table>
    </div>)
}

export default Bearings;