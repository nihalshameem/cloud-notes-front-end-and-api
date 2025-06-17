'use client';

import { FC } from 'react';
import { Bold, Heading2, Highlighter, Italic, List, UnderlineIcon } from 'lucide-react';

type Props = {
    editor: any;
};

const ToolBar: FC<Props> = ({ editor }) => {

    const buttonClass = (active: boolean) =>
        `px-3 py-1 rounded-md border text-sm font-medium ${active
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`;

    return (
        <div className="flex gap-2 mb-4">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={buttonClass(editor.isActive('bold'))}
                aria-label="Bold"
            >
                <Bold size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={buttonClass(editor.isActive('italic'))}
                aria-label="Italic"
            >
                <Italic size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={buttonClass(editor.isActive('underline'))}
                aria-label="Underline"
            >
                <UnderlineIcon size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={buttonClass(editor.isActive('highlight'))}
                aria-label="Highlight"
            >
                <Highlighter size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive('bulletList'))}
                aria-label="Bullet List"
            >
                <List size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={buttonClass(editor.isActive('heading', { level: 2 }))}
                aria-label="Heading 2"
            >
                <Heading2 size={16} />
            </button>
        </div>
    );
};

export default ToolBar;
