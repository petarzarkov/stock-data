import React, { useEffect } from "react";

export const useIteration = (initial = 0, increment = 0.1) => {
    const [i, setI] = React.useState(initial);
    const [isStarted, toggleIteration] = React.useState(false);
    const [inc, toggleIncrement] = React.useState(increment);

    // at mount start raf
    useEffect(() => {
        let raf: number;
        if (isStarted) {

            const loop = () => {
                raf = requestAnimationFrame(loop);
                setI(i => i + inc);
            };

            raf = requestAnimationFrame(loop);

        }

        return () => {
            cancelAnimationFrame(raf);
        };

    }, [isStarted, inc, setI, requestAnimationFrame, toggleIncrement]);

    return {
        iteration: i,
        setIteration: setI,
        toggleIteration,
        toggleIncrement
    };
};