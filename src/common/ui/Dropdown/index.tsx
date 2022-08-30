import React from 'react';
import { IoChevronDown } from 'react-icons/io5';
import combineClasses from '@common/ui/combine-classes';
import styles from './dropdown.module.scss';

type ItemDropdown = {
    value: React.ReactNode;
    label: string;
};

type DropdownProps = {
    options?: ItemDropdown[];
    value?: ItemDropdown;
    onChange?: (item: ItemDropdown) => void;
    className?: string;
    id?: string;
};

const Dropdown = ({ options = [], onChange, value, className, id }: DropdownProps) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, false);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, false);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (contentRef && !contentRef.current?.contains(event.target as Node)) {
            handleClose;
            return;
        }
    };

    return (
        <div
            className={combineClasses([true, styles.container], [true, className])}
            ref={contentRef}
            id={id}>
            <button type="button" className={styles.button} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.value}>{value?.value || options[0]?.value}</div>
                <IoChevronDown size={20} />
            </button>
            <div className={combineClasses([true, styles.content], [isOpen, styles.open])}>
                {options.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            onChange?.(item);
                            handleClose();
                        }}>
                        {item.value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
