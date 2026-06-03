'use client';

import { usePathname } from 'next/navigation';
import { SideBarLink } from '../entities/sidebar.tsx/sidebar-link';
import {
  LayoutDashboard,
  ShelvingUnit,
  CirclePlus,
  Settings,
} from 'lucide-react';
import { SidebarProfile } from '../entities/sidebar.tsx/sidebar-profile';
import { auth } from '@/app/lib/auth';

export type TSession = typeof auth.$Infer.Session;

export function SidebarWidget({ session }: { session: TSession | null }) {
  const pathName = usePathname();

  const sideBarLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    { name: 'Inventory', href: '/inventory', icon: <ShelvingUnit size={20} /> },
    {
      name: 'Add product',
      href: '/add-product',
      icon: <CirclePlus size={20} />,
    },
    { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
  ];
  return (
    <aside className="flex flex-col h-screen justify-between  w-64 border-r bg-brand-bg-sideBar px-4 py-8">
      <div>
        {/* Logo */}
        <div className="mb-8 text-xl font-bold">Logo</div>

        {/* Title */}
        <p className="text-gray-500 uppercase text-xs mb-4">Inventory</p>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2">
          {sideBarLinks.map((link) => (
            <SideBarLink
              key={link.name}
              name={link.name}
              href={link.href}
              isActive={pathName === link.href}
              icon={link.icon}
              iconPosition="left"
            />
          ))}
        </nav>
      </div>

      <SidebarProfile session={session} />
    </aside>
  );
}

{
  /* <PanelRightClose />;
<PanelRightOpen /> */
}
