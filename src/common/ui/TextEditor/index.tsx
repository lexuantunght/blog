import React from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import ToolBar from './toolbar';
import styles from './text-editor.module.scss';

type TextEditorProps = {
    id?: string;
    placeholder?: string;
};

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];

const TextEditor = (props: TextEditorProps) => {
    const { id, placeholder } = props;
    const editor = React.useMemo(() => withHistory(withReact(createEditor())), []);
    return (
        <Slate editor={editor} value={initialValue}>
            <ToolBar />
            <div className={styles.container}>
                <Editable placeholder={placeholder} spellCheck autoFocus id={id} />
            </div>
        </Slate>
    );
};

export default TextEditor;
