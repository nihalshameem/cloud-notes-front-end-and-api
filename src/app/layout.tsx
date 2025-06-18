import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "../../lib/supabase/SupabaseProvider";
import CommonHeader from "./components/CommonHeader";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: 'Cloud Notes',
  description: 'Your rich text note app with Supabase and Tailwind',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
      <body className=" font-sans">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <SupabaseProvider>
            <CommonHeader />
            {children}
          </SupabaseProvider>
        </div>
      </body>
    </html>
  );
}
