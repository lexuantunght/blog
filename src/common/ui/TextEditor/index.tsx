import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import combineClasses from 'common/ui/combine-classes';
import styles from './text-editor.module.scss';

const ReactQuill = dynamic(
    () => {
        return import('react-quill');
    },
    { ssr: false }
);

type TextEditorProps = {
    id?: string;
    placeholder?: string;
    className?: string;
};

const TextEditor = (props: TextEditorProps) => {
    const { id, placeholder, className } = props;

    return (
        <ReactQuill
            theme="snow"
            id={id}
            className={combineClasses([true, styles.editor], [true, className])}
            placeholder={placeholder}
        />
    );
};

export default TextEditor;
