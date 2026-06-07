'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SideBarLink } from '../entities/sidebar/sidebar-link';
import {
  LayoutDashboard,
  ShelvingUnit,
  CirclePlus,
  Settings,
  PackageCheck,
} from 'lucide-react';
import { SidebarProfile } from '../entities/sidebar/sidebar-profile';
import { auth } from '@/app/lib/auth';
import { Logo } from '../entities/logo/logo';
import Link from 'next/link';
import { LogoutButton } from '../features/log-out/logout-button';
import { SidebarOnOff } from '../features/sidebar/SidebarOnOff';

export type TSession = typeof auth.$Infer.Session;

export function SidebarWidget({ session }: { session: TSession | null }) {
  const pathName = usePathname();
  // ----- Local states -----
  const [isOpen, setIsOpen] = useState(true);

  const iconLogo = <PackageCheck />;
  const sideBarLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard size={24} />,
    },
    { name: 'Inventory', href: '/inventory', icon: <ShelvingUnit size={24} /> },
    {
      name: 'Add product',
      href: '/add-product',
      icon: <CirclePlus size={24} />,
    },
    { name: 'Settings', href: '/settings', icon: <Settings size={24} /> },
  ];
  return (
    <aside
      className={`relative flex shrink-0 flex-col h-full justify-between  ${isOpen ? 'w-64' : 'w-20'} border-r bg-brand-bg-sideBar px-4 py-8`}
    >
      <SidebarOnOff
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-28 z-10  "
      />

      <div>
        {/* ----- Logo ----- */}
        <Link href="/dashboard" className="w-full flex justify-center">
          <Logo iconLogo={iconLogo} title="IMS" isOpen={isOpen} />
        </Link>

        {/* ----- Title pages ----- */}
        <p
          className={`text-gray-500 uppercase text-xs mt-20 ${!isOpen && 'text-center'}`}
        >
          {isOpen ? 'Pages' : 'Pages'}
        </p>

        {/* ----- Navigation Menu ----- */}
        <nav className="flex flex-col gap-2 mt-4">
          {sideBarLinks.map((link) => (
            <SideBarLink
              key={link.name}
              name={link.name}
              href={link.href}
              isActive={pathName === link.href}
              icon={link.icon}
              isOpen={isOpen}
              iconPosition="left"
            />
          ))}
        </nav>
      </div>

      <div>
        {/* Title Profile Info */}
        <p
          className={`text-gray-500 uppercase text-xs mt-6 ${!isOpen && 'text-center'}`}
        >
          {isOpen ? 'Profile Info' : 'Info'}
        </p>
        <SidebarProfile isOpen={isOpen} session={session} className="mt-2" />

        {/* Title LogOut */}
        <p
          className={`text-gray-500 uppercase text-xs mt-6 ${!isOpen && 'text-center'}`}
        >
          LogOut
        </p>

        <LogoutButton
          isOpen={isOpen}
          className="w-full flex justify-center mt-2
          text-brand-accent-hover
          border-brand-accent-hover
          hover:bg-transparent 
    hover:border-destructive 
    hover:text-destructive 
    transition-colors duration-200"
        />
      </div>
    </aside>
  );
}
