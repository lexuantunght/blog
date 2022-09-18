import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import combineClasses from 'common/ui/combine-classes';
import styles from './toast.module.scss';

type ToastProps = {
    timeout?: number;
    children: React.ReactNode;
    className?: string;
    show?: boolean;
};

const ToastContent = (props: ToastProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { show, children, className } = props;

    React.useEffect(() => {
        if (show) {
            containerRef.current?.classList.add(styles.show);
        } else {
            containerRef.current?.classList.remove(styles.show);
        }
    }, [show]);

    const content = (
        <div
            ref={containerRef}
            className={combineClasses([true, styles.container], [true, className])}>
            {children}
        </div>
    );

    return ReactDOM.createPortal(content, document.body);
};

const Toast = ({ timeout = 500, show, ...rest }: ToastProps) => {
    return (
        <CSSTransition in={show} timeout={timeout} unmountOnExit={false}>
            <ToastContent {...rest} show={show} />
        </CSSTransition>
    );
};

export default Toast;
