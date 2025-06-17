"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const supabase = createClient();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        } else {
            router.push('/notes'); // redirect to your notes page
        }
    };
    return (
        <div className="max-w-md mx-auto py-10">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <input
                type="email"
                className="border p-2 w-full mb-4"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="border p-2 w-full mb-4"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
};
export default LoginForm;