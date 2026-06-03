import Link from 'next/link';
import { ReactNode } from 'react';

interface ISideBarLinkProps {
  name: string;
  href: string;
  isActive: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function SideBarLink({
  name,
  href,
  isActive,
  icon,
  iconPosition = 'left',
}: ISideBarLinkProps) {
  return (
    <div>
      <Link
        key={name}
        href={href}
        className={`flex gap-2 items-center p-2 rounded-lg  transition-colors ${
          isActive
            ? 'text-brand-bg-sideBar bg-brand-light'
            : 'text-white hover:bg-brand-accent-hover hover:text-brand-bg-sideBar'
        }`}
      >
        {icon && iconPosition === 'left' && <span>{icon}</span>}

        <span className="flex-1">{name}</span>

        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </Link>
    </div>
  );
}
