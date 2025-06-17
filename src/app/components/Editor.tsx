'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import './editor.css'; // We'll create this next for styling

interface EditorProps {
    content?: string;
    onChange?: (content: string) => void;
}

export default function Editor({ content = '', onChange }: EditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    useEffect(() => {
        return () => {
            editor?.destroy(); // clean up
        };
    }, [editor]);

    return (
        <div className="border rounded-md p-4 min-h-[200px]">
            <EditorContent editor={editor} />
        </div>
    );
}
