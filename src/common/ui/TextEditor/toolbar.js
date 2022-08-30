import { Editor, Element as SlateElement, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import {
    MdFormatBold,
    MdFormatUnderlined,
    MdFormatItalic,
    MdCode,
    MdFormatQuote,
    MdFormatListNumbered,
    MdFormatListBulleted,
    MdFormatAlignCenter,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatAlignJustify,
    MdLooksOne,
    MdLooksTwo,
} from 'react-icons/md';
import styles from './text-editor.module.scss';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    });
    let newProperties;
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        };
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        };
    }
    Transforms.setNodes < SlateElement > (editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format, blockType = 'type') => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
        })
    );

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <button
            className={styles.button}
            type="button"
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            ).toString()}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}>
            {icon}
        </button>
    );
};

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <button
            className={styles.button}
            type="button"
            active={isMarkActive(editor, format).toString()}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}>
            {icon}
        </button>
    );
};

const ToolIcons = {
    FORMAT_BOLD: <MdFormatBold size={20} />,
    FORMAT_ITALIC: <MdFormatItalic size={20} />,
    FORMAT_UNDERLINED: <MdFormatUnderlined size={20} />,
    CODE: <MdCode size={20} />,
    FORMAT_QUOTE: <MdFormatQuote size={20} />,
    FORMAT_LIST_NUMBERED: <MdFormatListNumbered size={20} />,
    FORMAT_LIST_BULLETED: <MdFormatListBulleted size={20} />,
    FORMAT_ALIGN_LEFT: <MdFormatAlignLeft size={20} />,
    FORMAT_ALIGN_CENTER: <MdFormatAlignCenter size={20} />,
    FORMAT_ALIGN_RIGHT: <MdFormatAlignRight size={20} />,
    FORMAT_ALIGN_JUSTIFY: <MdFormatAlignJustify size={20} />,
    HEADING_1: <MdLooksOne size={20} />,
    HEADING_2: <MdLooksTwo size={20} />,
};

const ToolBar = () => {
    return (
        <div className={styles.toolbar}>
            <MarkButton format="bold" icon={ToolIcons.FORMAT_BOLD} />
            <MarkButton format="italic" icon={ToolIcons.FORMAT_ITALIC} />
            <MarkButton format="underline" icon={ToolIcons.FORMAT_UNDERLINED} />
            <MarkButton format="code" icon={ToolIcons.CODE} />
            <BlockButton format="heading-one" icon={ToolIcons.HEADING_1} />
            <BlockButton format="heading-two" icon={ToolIcons.HEADING_2} />
            <BlockButton format="block-quote" icon={ToolIcons.FORMAT_QUOTE} />
            <BlockButton format="numbered-list" icon={ToolIcons.FORMAT_LIST_NUMBERED} />
            <BlockButton format="bulleted-list" icon={ToolIcons.FORMAT_LIST_BULLETED} />
            <BlockButton format="left" icon={ToolIcons.FORMAT_ALIGN_LEFT} />
            <BlockButton format="center" icon={ToolIcons.FORMAT_ALIGN_CENTER} />
            <BlockButton format="right" icon={ToolIcons.FORMAT_ALIGN_RIGHT} />
            <BlockButton format="justify" icon={ToolIcons.FORMAT_ALIGN_JUSTIFY} />
        </div>
    );
};

export default ToolBar;
