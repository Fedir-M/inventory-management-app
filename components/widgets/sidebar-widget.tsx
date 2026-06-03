'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SidebarWidget() {
  const pathName = usePathname();

  const menuLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Add product', href: '/add-product' },
    { name: 'Settings', href: '/settings' },
  ];
  return (
    <aside className="w-64 h-screen border-r bg-brand-bg-sideBar p-4">
      {/* Logo */}
      <div className="mb-8 text-xl font-bold">Logo</div>

      {/* Title */}
      <p className="text-gray-500 uppercase text-xs mb-4">Inventory</p>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2">
        {menuLinks.map((link) => {
          const isActive = pathName === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`p-2 rounded-lg transition-colors ${
                isActive ? 'bg-brand-light' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
