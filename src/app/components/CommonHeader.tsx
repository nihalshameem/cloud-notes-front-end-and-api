"use client";

import { FC, useCallback } from "react";
import { createClient } from "../../../lib/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const CommonHeader: FC = () => {
    const router = useRouter();
    const session = useSession();
    const supabase = createClient();

    const handleLogout = useCallback(async () => {
        if (!session) return;
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
        } else {
            console.log("Logged out successfully");
            router.refresh();
        }
    }, [supabase, session] 
    )

    return (
        <header className="mb-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-blue-600">📝 Cloud Notes</h1>
                {session?.user &&
                    <form action={handleLogout}>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
                            title="Logout"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                            </svg>
                            Logout
                        </button>
                    </form>
                }
            </div>
        </header>
    )
}

export default CommonHeader;