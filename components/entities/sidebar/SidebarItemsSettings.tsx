'use client';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ISidebarItemsSettingsProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

export function SidebarItemsSettings({
  icon: Icon,
  label,
  href,
  isActive,
}: ISidebarItemsSettingsProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
        isActive
          ? 'bg-brand-border font-semibold text-brand-primary'
          : 'text-gray-700 hover:bg-brand-light'
      }`}
    >
      <Icon
        size={18}
        className={isActive ? 'text-gray-900' : 'text-gray-500'}
      />
      {label}
    </Link>
  );
}
