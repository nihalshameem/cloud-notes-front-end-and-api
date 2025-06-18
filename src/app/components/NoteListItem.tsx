"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { createClient } from "../../../lib/supabase/client";

interface Props {
    notes: {
        id: string;
        title: string;
    }[];
}

const NoteListItem: FC<Props> = ({ notes }) => {
    const router = useRouter();
    const supabase = createClient()

    const handleDeleteNote = useCallback(async (noteId: string) => {
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', noteId);
        if (error) {
            console.error('Error deleting note:', error.message);
        } else {
            console.log(`Note with ID ${noteId} deleted successfully.`);
            router.refresh(); // Refresh the page to reflect the deletion
        }
    }, [notes, router, supabase]);

    return (
        <ul className="space-y-2">
            {notes.map((note) => (
                <li key={note.id} className="group flex items-center justify-between p-0 text-gray-300 hover:bg-gray-300 hover:text-black rounded transition-colors">
                    <Link
                        href={`/notes/${note.id}`}
                        className="flex-1 block p-4 "
                    >
                        {note.title || 'Untitled Note'}
                    </Link>
                    <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-red-500 hover:text-red-700 p-2 cursor-pointer"
                        aria-label="Delete note"
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                    >
                        🗑️
                    </button>
                </li>
            ))}
        </ul>
    );
}
export default NoteListItem;