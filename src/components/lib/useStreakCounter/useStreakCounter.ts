import React from 'react';

interface StreakCounter {
    streak: number,
    onHit: () => void,
    onMiss: () => void
}


type StreakAction = 'Y' | 'N';

const streakReducer = (state: number, action: StreakAction) => action === 'Y' ? state + 1 : 0;

export default (): StreakCounter => {

    const [streak, dispatch] = React.useReducer(streakReducer, 0);

    return {
        streak,
        onHit: React.useCallback(() => dispatch('Y'), []),
        onMiss: React.useCallback(() => dispatch('N'), []),
    }
}