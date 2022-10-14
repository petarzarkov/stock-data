import { useEffect, useRef, useState } from "react";

export function useInterval(
    callback: () => Promise<void> | void,
    delay = 2000,
) {
    const [isStarted, toggleInterval] = useState(false);
    const savedCallback = useRef<typeof callback | undefined>();
    let id: NodeJS.Timer | undefined;
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            void savedCallback?.current?.();
        }

        if (!isStarted && id) {
            clearInterval(id);
        }

        if (delay !== null && isStarted) {
            id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay, isStarted]);

    return {
        toggleInterval
    };
}
