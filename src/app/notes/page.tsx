
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/server';
import { cookies } from 'next/headers';

export default async function NotesListPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: notes, error } = await supabase
    .from('notes')
    .select('id, title')
    .order('created_at', { ascending: false });

  console.log("🚀 ~ NotesListPage ~ notes:", notes)
  if (error) {
    throw new Error('Failed to fetch notes');
  }

  const mockNotes = notes || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Notes</h2>
        <Link
          href="/notes/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Note
        </Link>
      </div>
      <ul className="space-y-2">
        {mockNotes.map((note) => (
          <li key={note.id}>
            <Link
              href={`/notes/${note.id}`}
              className="block p-4 text-grey-200 hover:bg-white"
            >
              {note.title || 'Untitled Note'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
