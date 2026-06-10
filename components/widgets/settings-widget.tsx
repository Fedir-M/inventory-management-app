'use client';

import { Mail, Bell, Monitor, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarItemsSettings } from '../entities/sidebar/SidebarItemsSettings';

export default function SettingsSidebarWidget() {
  const pathname = usePathname();
  const menuItems = [
    { name: 'My Profile', href: '/settings', icon: User },
    { name: 'E-mails & Auth', href: '/settings/auth', icon: Mail },
    { name: 'Notifications', href: '/settings/notifications', icon: Bell },
    { name: 'Active Sessions', href: '/settings/sessions', icon: Monitor },
  ];

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => (
        <SidebarItemsSettings
          key={item.name}
          label={item.name}
          href={item.href}
          icon={item.icon}
          isActive={pathname === item.href}
        />
      ))}
    </nav>
  );
}
