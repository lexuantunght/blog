import React from 'react';
import 'react-quill/dist/quill.snow.css';
import combineClasses from 'common/ui/combine-classes';
import styles from './text-editor.module.scss';
import ImageResize from 'common/ui/TextEditor/image-resize-module';
import ReactQuill, { Quill } from 'react-quill';

Quill.register('modules/imageResize', ImageResize);

type TextEditorProps = {
    id?: string;
    placeholder?: string;
    className?: string;
    onChange?: (value: string) => void;
};

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ align: [] }],

    ['formula', 'image', 'video'],

    ['clean'],
];

const TextEditor = (props: TextEditorProps) => {
    const { id, placeholder, className, onChange } = props;

    return (
        <ReactQuill
            theme="snow"
            id={id}
            className={combineClasses([true, styles.editor], [true, className])}
            placeholder={placeholder}
            modules={{
                toolbar: toolbarOptions,
                imageResize: {
                    parchment: Quill.import('parchment'),
                    modules: ['Resize', 'DisplaySize'],
                },
            }}
            onChange={(value) => onChange?.(value)}
        />
    );
};

export default TextEditor;
