'use client';

import { Button } from '@/components/ui/button';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

interface ISidebarOnOffProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function SidebarOnOff({
  isOpen,
  onToggle,
  className,
}: ISidebarOnOffProps) {
  return (
    <div className={`bg-brand-bg-sideBar rounded-sm p-1 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="group hover:bg-transparent transition-colors text-brand-accent-hover hover:text-brand-primary"
      >
        {isOpen ? (
          <PanelRightOpen className="size-6" />
        ) : (
          <PanelRightClose className="size-6" />
        )}
      </Button>
    </div>
  );
}
