/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@/app/lib/auth';
import { Button } from '@/components/ui/button';
import { Mail, ShieldCheck, KeyRound, MoreHorizontal } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function EmailsAndAuthPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const { user } = session;
  const hasPassword = !!(user as any).password;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">E-mails & Auth</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your e-mail addresses and authentication methods.
        </p>
      </div>

      <div className="space-y-6">
        {/* ----- E-mail block ----- */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-50 rounded-md border border-gray-100">
              <Mail className="size-5 text-gray-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{user.email}</span>
                {user.emailVerified && (
                  <span className="text-[10px] font-bold uppercase bg-gray-900 text-white px-1.5 py-0.5 rounded">
                    Primary
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">Used for sign-in</div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>

        {/* ----- Password block ----- */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-50 rounded-md border border-gray-100">
              <KeyRound className="size-5 text-gray-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Password</div>
              <div className="text-sm text-gray-500">
                {hasPassword
                  ? 'Update your account password'
                  : 'Set a password for your account'}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            {hasPassword ? 'Change password' : 'Set password'}
          </Button>
        </div>

        {/* ----- MFA block ----- */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-50 rounded-md border border-gray-100">
              <ShieldCheck className="size-5 text-gray-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">
                Multi-factor authentication
              </div>
              <div className="text-sm text-gray-500">
                {(user as any).twoFactorEnabled
                  ? 'MFA is currently enabled for your account.'
                  : 'Multi-factor authentication is currently disabled.'}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            {(user as any).twoFactorEnabled ? 'Manage MFA' : 'Enable MFA'}
          </Button>
        </div>
      </div>
    </div>
  );
}
