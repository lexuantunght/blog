import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import styles from './drawer.module.scss';
import Button from '../Button';
import { GrClose } from 'react-icons/gr';
import combineClasses from 'common/ui/combine-classes';

type DrawerProps = {
    show?: boolean;
    timeout?: number;
    showClose?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    className?: string;
    bodyClassName?: string;
};

const DrawerContent = ({
    show,
    showClose = true,
    onClose,
    children,
    className,
    bodyClassName,
}: DrawerProps) => {
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
            <div
                ref={contentRef}
                className={combineClasses([true, styles.content], [true, className])}>
                {showClose && (
                    <Button mode="text" onClick={onClose} className={styles.close}>
                        <GrClose />
                    </Button>
                )}
                <div className={combineClasses([true, styles.body], [true, bodyClassName])}>
                    {children}
                </div>
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
