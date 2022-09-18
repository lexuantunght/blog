import React from 'react';
import dynamic from 'next/dynamic';
import ModuleContainer from 'common/shared/module-container';
import Emitter from 'utils/event-manager/emitter';
import useEventListener from 'utils/event-manager/use-event-listener';
import AppEventType from 'common/event-type/app-event-type';

const Toast = dynamic(
    () => {
        return import('common/ui/Toast');
    },
    { ssr: false }
);

const emitter = ModuleContainer.resolve(Emitter);

const ToastView = () => {
    const [show, setShow] = React.useState(false);
    const [content, setContent] = React.useState('');

    useEventListener(emitter, {
        type: AppEventType.SHOW_TOAST,
        callback: (message: string) => {
            setContent(message);
        },
    });

    useEventListener(emitter, {
        type: AppEventType.HIDE_TOAST,
        callback: () => {
            setShow(false);
        },
    });

    React.useEffect(() => {
        let timeId: NodeJS.Timeout | undefined;
        if (content) {
            setShow(true);
            timeId = setTimeout(() => {
                setShow(false);
            }, 1000);
        }

        return () => {
            clearTimeout(timeId);
        };
    }, [content]);

    return <Toast show={show}>{content}</Toast>;
};

export default ToastView;
