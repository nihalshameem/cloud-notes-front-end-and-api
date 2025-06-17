# 📝 Cloud Notes

A **minimalist full-stack notes app** with real-time auto-save, rich-text editing, and cross-platform capabilities. Built with **Next.js**, **Tailwind CSS**, **Supabase**, and **Tiptap**. Future-ready for iOS/Android support.

---

## 🚀 Features

- 🔐 User authentication (Sign up / Login / Logout) via Supabase
- 📝 Rich-text editor with bold, italic, underline, highlight, lists, and headings (via Tiptap)
- 💾 Auto-save notes using debounce (1s) to Supabase
- 🧠 Notes linked to authenticated users
- 📱 Responsive UI built with Tailwind CSS
- 🔍 Clean architecture ready for expansion into mobile (React Native or Expo)

---

## 🧱 Tech Stack

| Frontend | Backend/DB | Auth | Editor | Styling |
|----------|------------|------|--------|---------|
| Next.js 14 (App Router) | Supabase | Supabase Auth | Tiptap Editor | Tailwind CSS |
| React 19 | Supabase Edge Functions (optional) | JWT | @tiptap/starter-kit | Lucide Icons |

---

## 📂 Project Structure

```
.
├── app/
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   ├── notes/                # Protected routes for notes
│   └── layout.tsx           # Root layout with Tailwind + font
├── components/
│   └── NoteEditor.tsx       # Rich text editor (Tiptap)
├── lib/
│   └── supabase/            # Supabase clients (server + client)
├── middleware.ts            # Protects routes with Supabase Auth
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cloud-notes.git
cd cloud-notes
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Optional for server-side operations:

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🗃️ Supabase Setup

1. Create a new [Supabase project](https://app.supabase.com)
2. Create a `notes` table with the following columns:

| Column     | Type      | Notes                          |
|------------|-----------|--------------------------------|
| id         | uuid      | Primary key                    |
| user_id    | uuid      | Foreign key (auth.users.id)    |
| title      | text      |                                |
| content    | text      | HTML from Tiptap               |
| updated_at | timestamp |                                |

3. Enable **Row Level Security (RLS)** and add this policy:

```sql
-- Allow users to read/write their own notes
create policy "Users can manage their notes"
on notes for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

---

## 📦 Dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder
npm install tailwindcss postcss autoprefixer
npm install lodash
```

---

## ✨ Future Enhancements

- ✅ Markdown export
- 🔍 Full-text search
- 📱 Mobile app (via Expo or React Native)
- 🌙 Dark mode
- 🗂️ Folders & tags for notes

---

## 📄 License

MIT License © 2025 [Your Name]

---

## 🙌 Acknowledgements

- [Supabase](https://supabase.com/)
- [Tiptap](https://tiptap.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)