'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        } else {
            alert('Check your email for verification link.');
            router.push('/login');
        }
    };

    return (
        <div className="max-w-md mx-auto py-10">
            <h1 className="text-xl font-bold mb-4">Sign Up</h1>
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
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSignup}
            >
                Sign Up
            </button>
        </div>
    );
}
