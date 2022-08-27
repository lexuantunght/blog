import React from 'react';

export type ListenerFunction = (
    this: ObjectListener,
    event: Event
) => any | EventListenerOrEventListenerObject;

export type ListenerOptions = boolean | AddEventListenerOptions;

export type ListenerParams = {
    type: any;
    callback: ListenerFunction | ((...args: any[]) => void);
    options?: ListenerOptions;
};

export type ObjectListener = {
    addEventListener: (type: any, listener: ListenerFunction, options?: ListenerOptions) => void;
    removeEventListener: (type: any, listener: ListenerFunction, options?: ListenerOptions) => void;
};

const useEventListener = (objectListener: ObjectListener = window, args?: ListenerParams) => {
    let listener = args;

    const addListener = (
        type: any,
        callback: ListenerFunction | ((...args: any[]) => void),
        options?: ListenerOptions
    ) => {
        listener = { type, callback, options };
        objectListener.addEventListener(type, callback, options);
    };

    if (args) {
        const { type, callback, options } = args;
        addListener(type, callback, options);
    }

    React.useEffect(() => {
        return () => {
            if (listener) {
                const { type, callback, options } = listener;
                objectListener.removeEventListener(type, callback, options);
            }
        };
    }, []);

    return addListener;
};

export default useEventListener;
