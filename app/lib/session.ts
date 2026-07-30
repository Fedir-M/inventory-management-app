import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

// Note! A helper function for checking the session on the server.
// Wrapped in cache() from React so that when this function is called
// multiple times during a single page render, the database query is only executed once.

export const requireSession = cache(async () => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  // для отладки:
  console.log('--- REQUIRE SESSION DEBUG ---');
  console.log('Cookies received:', headerList.get('cookie'));
  console.log('Session result:', session);

  if (!session) {
    redirect('/sign-in');
  }

  return session;
});
