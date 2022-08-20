import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import styles from './drawer.module.scss';
import Button from '../Button';
import { GrClose } from 'react-icons/gr';

type DrawerProps = {
    show?: boolean;
    timeout?: number;
    showClose?: boolean;
    onClose?: () => void;
};

const DrawerContent = ({ show, showClose = true, onClose }: DrawerProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (show) {
                containerRef.current?.classList.add(styles.show);
                contentRef.current?.classList.add(styles.appear);
            } else {
                contentRef.current?.classList.remove(styles.appear);
                containerRef.current?.classList.remove(styles.show);
            }
        }, 50);
        return () => {
            clearTimeout(timeout);
        };
    }, [show]);

    const content = (
        <div ref={containerRef} className={styles.container}>
            <div ref={contentRef} className={styles.content}>
                {showClose && (
                    <Button mode="text" onClick={onClose} className={styles.close}>
                        <GrClose />
                    </Button>
                )}
                <div className={styles.body}>hahah</div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(content, document.body);
};

const Drawer = ({ show, timeout = 300, ...rest }: DrawerProps) => {
    return (
        <CSSTransition in={show} timeout={timeout} unmountOnExit>
            <DrawerContent {...rest} show={show} />
        </CSSTransition>
    );
};

export default Drawer;
