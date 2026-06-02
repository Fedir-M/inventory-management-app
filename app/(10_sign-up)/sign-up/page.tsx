'use client';

import React, { useState } from 'react';
import { signUp } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await signUp.email({
      email,
      password,
      name,
      callbackURL: '/dashboard',
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || 'Registration Error');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100 p-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-black"
              placeholder="Olexii Chumak"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-black"
              placeholder="shaky@mail.net"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-purple-600 py-2 text-white font-semibold hover:bg-purple-700 transition-colors focus:outline-none disabled:bg-gray-400"
          >
            {loading ? 'Registration...' : 'Sign-Up'}
          </button>
        </form>

        <div className="text-center mt-4 flex flex-col gap-2">
          <Link
            href="/sign-in"
            className="text-sm text-purple-600 hover:text-purple-500 transition-colors"
          >
            Already have? Sign-In
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
