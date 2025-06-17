
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/server';
import { cookies } from 'next/headers';
import NoteListItem from '../components/NoteListItem';

export default async function NotesListPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: notes, error } = await supabase
    .from('notes')
    .select('id, title')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Failed to fetch notes');
  }

  const mockNotes = notes || [];

  return (
    <div>
      <div className="hover:bg-red-500 bg-green-200 w-40 h-40">
        Hover test
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Notes</h2>
        <Link
          href="/notes/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Note
        </Link>
      </div>
      <NoteListItem notes={mockNotes} />
    </div>
  );
}
