import React from 'react';
import combineClasses from '../combine-classes';
import styles from './text-input.module.scss';

export interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    invalid?: boolean;
}

class TextInput extends React.Component<TextInputProps> {
    render() {
        const { disabled, invalid, className, ...rest } = this.props;
        const combinedClassName = combineClasses(
            [true, className],
            [true, styles.textinput],
            [disabled, styles.disabled],
            [invalid, styles.invalid]
        );
        return <input {...rest} type="text" className={combinedClassName} />;
    }
}

export default TextInput;
