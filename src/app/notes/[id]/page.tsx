import NoteEditor from '@/app/components/NoteEditor';
import { cookies } from 'next/headers';
import { createClient } from '../../../../lib/supabase/server';
import { PageParamsType } from '../../../../utils/commonUtils';

export default async function Page(props: {params: PageParamsType}) {
  const { id } = await props.params
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let noteId: string = "";
  let title: string = "";
  let content: string = "";

  if (id !== 'new') {
    const { data: notes, error } = await supabase
      .from('notes')
      .select('id, title, content')
      .eq('id', id)
      .single();
    noteId = notes?.id || "";
    title = notes?.title || "";
    content = notes?.content || "";
    if (error) {
      throw new Error('Failed to fetch note');
    }
  }


  return <NoteEditor noteId={noteId} initialContent={content} title={title} />;
}
