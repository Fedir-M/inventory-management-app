'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/app/lib/auth-client';

interface ILogoutButton {
  className?: string;
  isOpen: boolean;
}

export function LogoutButton({ isOpen, className }: ILogoutButton) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    // LogOut via Better Auth
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/';
        },
      },
    });

    setLoading(false);
  };
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`group w-full transition-all duration-200 border border-transparent 
        hover:border-destructive hover:bg-transparent 
        ${isOpen ? 'justify-start gap-2' : 'justify-center'} 
        ${className}`}
      onClick={handleLogout}
      disabled={loading}
    >
      <LogOut className="text-brand-accent-hover group-hover:text-destructive transition-colors" />

      {isOpen && <span className="text-brand-accent-hover">Log Out</span>}
    </Button>
  );
}
