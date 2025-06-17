import { cookies } from 'next/headers';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/server';

export default async function LandingPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <main className="text-center py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
        Welcome to Cloud Notes ☁️📝
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        A simple and secure notes app with rich-text editing, powered by Supabase.
      </p>
      <div className="flex justify-center gap-4">
        {
          !user ?
            <Link
              href="/login"
              className="border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded hover:bg-blue-50"
            >
              Login / Sign Up
            </Link>
            :
            <Link
              href="/notes"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
            >
              View My Notes
            </Link>
        }
      </div>
    </main>
  );
}
