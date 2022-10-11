import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import combineClasses from 'common/ui/combine-classes';
import styles from './textarea.module.scss';

type TextareaProps = {
    id?: string;
    className?: string;
    name?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    value?: string | number | readonly string[] | undefined;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    minRows?: number;
    maxRows?: number;
};

const Textarea = (props: TextareaProps) => {
    const {
        id,
        className,
        name,
        placeholder,
        value,
        onChange,
        onBlur,
        minRows = 1,
        maxRows = 5,
    } = props;
    return (
        <TextareaAutosize
            id={id}
            name={name}
            className={combineClasses([true, styles.textarea], [true, className])}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            minRows={minRows}
            maxRows={maxRows}
        />
    );
};

export default Textarea;
