import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import styles from './modal.module.scss';
import Button from '../Button';
import { GrClose } from 'react-icons/gr';

type ModalProps = {
    show?: boolean;
    title?: string;
    timeout?: number;
    children: React.ReactNode;
    onClose?: () => void;
};

const ModalContent = ({ show, title = 'Modal', onClose, children }: ModalProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (show) {
            containerRef.current?.classList.add(styles.show);
            contentRef.current?.classList.add(styles.appear);
        } else {
            contentRef.current?.classList.remove(styles.appear);
            containerRef.current?.classList.remove(styles.show);
        }
    }, [show]);

    const content = (
        <div ref={containerRef} className={styles.container}>
            <div ref={contentRef} className={styles.content}>
                <div className={styles.header}>
                    <span>{title}</span>
                    <Button mode="text" onClick={onClose}>
                        <GrClose />
                    </Button>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(content, document.body);
};

const Modal = ({ show, timeout = 500, ...rest }: ModalProps) => {
    return (
        <CSSTransition in={show} timeout={timeout} unmountOnExit>
            <ModalContent {...rest} show={show} />
        </CSSTransition>
    );
};

export default Modal;
