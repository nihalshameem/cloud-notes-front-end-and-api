'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';

import React, { FC, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useSession } from '@supabase/auth-helpers-react';
import { createClient } from '../../../lib/supabase/client';
import { useRouter } from 'next/navigation';
import TitleEditor from './TitleEditor';
import ToolBar from './ToolBar';

type Props = {
    noteId: string;
    title?: string;
    initialContent?: string;
};

const NoteEditor: FC<Props> = ({ noteId = '', title = '', initialContent = '' }) => {
    const router = useRouter();

    const session = useSession();
    const supabase = createClient();
    const [newId, setNewId] = React.useState<string | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            Placeholder.configure({
                placeholder: 'Start writing your note...',
            }),
        ],
        content: initialContent,
    });

    const saveNote = useCallback(
        debounce(async (htmlContent: string) => {
            const user = session?.user;
            if (!user) return;

            if (!noteId && !newId) {
                const { error, data } = await supabase
                    .from('notes')
                    .insert({
                        title: title || 'Untitled Note',
                        content: htmlContent,
                        updated_at: new Date().toISOString(),
                        user_id: user.id,
                    }).select();

                if (error) {
                    console.error('Insert error:', error.message);
                } else if (data && data.length > 0) {
                    setNewId(data[0].id)
                    console.log('Inserted note ID:', data[0].id);
                }

            } else {
                const { error } = await supabase
                    .from('notes')
                    .update({
                        content: htmlContent,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', newId || noteId)
                    .eq('user_id', user.id);

                if (error) console.error('Update error:', error.message);
            }
        }, 1000),
        [noteId, title, session?.user?.id]
    );

    useEffect(() => {
        if (!editor) return;

        const updateHandler = () => {
            const content = editor.getHTML();
            saveNote(content);
        };

        editor.on('update', updateHandler);
        return () => {
            editor.off('update', updateHandler);
            saveNote.cancel();
        };
    }, [editor, saveNote]);

    const updateTitleHandler = useCallback(async (newTitle: string) => {
        const user = session?.user;
        if (!user) return;
        if (!noteId && !newId) {
            const { error, data } = await supabase
                .from('notes')
                .insert({
                    title: newTitle,
                    updated_at: new Date().toISOString(),
                    user_id: user.id,
                }).select();

            if (error) {
                console.error('Insert error:', error.message);
            } else if (data && data.length > 0) {
                console.log('Inserted note ID:', data[0].id);
                router.replace(`/notes/${data[0].id}`);
            }

        } else {
            const { error, data } = await supabase
                .from('notes')
                .update({
                    title: newTitle,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', newId || noteId)
                .eq('user_id', user.id).select();

            if (error) {
                console.error('Update error:', error.message);
            } else if (data && data.length > 0) {
                console.log('Updated note ID:', data[0].id);
                router.refresh();
            }
        }
    }, [title, session?.user?.id])

    if (!editor) return null;

    return (
        <>
            <TitleEditor title={title} update={updateTitleHandler} />
            <div className="border rounded-xl shadow p-4 min-h-[200px]">
                {/* Toolbar */}
                <ToolBar editor={editor} />

                <EditorContent editor={editor} />
            </div>
        </>
    );
};

export default NoteEditor;
