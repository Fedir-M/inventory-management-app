'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ILogoutButton {
  className?: string;
}

export function LogoutButton({ className }: ILogoutButton) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`group w-full justify-start text-brand-accent-hover border border-transparent transition-all duration-200 hover:border-destructive hover:bg-transparent ${className}`}
      onClick={() => console.log('Выход...')}
    >
      <LogOut className="text-brand-accent-hover group-hover:text-destructive transition-colors" />
      <span className="text-brand-accent-hover">Log Out</span>
    </Button>
  );
}
