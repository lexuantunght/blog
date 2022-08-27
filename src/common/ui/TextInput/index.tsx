import React from 'react';
import combineClasses from '@common/ui/combine-classes';
import styles from './text-input.module.scss';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
}

class TextInput extends React.Component<TextInputProps> {
    render() {
        const { disabled, invalid, className, type = 'text', errorText, ...rest } = this.props;
        const combinedClassName = combineClasses(
            [true, className],
            [true, styles.textinput],
            [disabled, styles.disabled],
            [invalid, styles.invalid]
        );
        return (
            <>
                <input type={type} {...rest} className={combinedClassName} />
                {invalid && errorText && <small className={styles.error}>{errorText}</small>}
            </>
        );
    }
}

export default TextInput;
