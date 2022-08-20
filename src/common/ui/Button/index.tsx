import React from 'react';
import styles from './button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
    mode?: 'text' | 'fill' | 'outlined';
}

const Button = ({
    variant = 'primary',
    mode = 'fill',
    children,
    className = '',
    ...rest
}: ButtonProps) => {
    return (
        <button
            {...rest}
            className={`${styles.button} ${styles[variant]} ${styles[mode]} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
