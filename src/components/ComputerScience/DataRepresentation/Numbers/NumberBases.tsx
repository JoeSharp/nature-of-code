import React from 'react';
import { generateRandomInteger, choose } from 'src/components/lib/utilities';
import { binary, hexadecimal, denary, NumberBase } from 'comp-sci-maths-lib'
import useStreakCounter from 'src/components/lib/useStreakCounter';
import ProgressBar from 'src/components/Bootstrap/ProgressBar';

const MAX_VALUE = 255;
const TARGET_STREAK = 10;

interface Question {
    to: NumberBase,
    from: NumberBase,
    value: number,
}

const generateQuestion = (): Question => {
    let value = generateRandomInteger(0, MAX_VALUE);
    const from = choose([binary, denary, hexadecimal]);
    const to = choose([binary, denary, hexadecimal].filter(x => x !== from));
    return {
        value, from, to
    }
}

const NumberBases: React.FunctionComponent = () => {
    const [feedback, setFeedback] = React.useState<string>('awaiting first answer');
    const [{ from, to, value }, regenerateQuestion] = React.useReducer(generateQuestion, generateQuestion());
    const { streak, onHit, onMiss } = useStreakCounter();

    const [answer, setAnswer] = React.useState<string>('');
    const onAnswerChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(({ target: { value } }) =>
        setAnswer(value)
        , [setAnswer]);

    const onSubmit: React.MouseEventHandler = React.useCallback(() => {
        const expected = to.toString(value);
        if (expected === answer) {
            setFeedback('Correct!');
            onHit();
        } else {
            setFeedback(`Incorrect :( ${from.toString(value)} in ${to.name} is actually ${expected}`);
            onMiss();
        }
        regenerateQuestion();
    }, [regenerateQuestion, setFeedback, onHit, onMiss, value, to, from, answer])

    return (<div>
        <div>Try and get to a streak of {TARGET_STREAK} correct answers</div>
        <h4>Convert {from.toString(value)}<sub>{from.symbols.length}</sub> into {to.name}</h4>
        <form>
            <div className='form-group'>
                <label>Your Answer</label>
                <input className='form-control' value={answer} onChange={onAnswerChange} />
            </div>
            <button onClick={onSubmit}>Submit</button>
        </form>
        <div>{feedback}</div>
        <ProgressBar value={streak} max={TARGET_STREAK} />
    </div>)
}

export default NumberBases;