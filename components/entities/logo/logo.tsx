'use client';

import { ReactNode } from 'react';

interface ILogoProps {
  title: string;
  className?: string;
  iconLogo?: ReactNode;
  isOpen: boolean;
}

export function Logo({ title, className, iconLogo, isOpen }: ILogoProps) {
  return (
    <div
      className={`
        flex items-center gap-3 p-3 w-fit rounded-xl $${isOpen ? 'border border-brand-primary' : 'border-none'} text-brand-primary
        transition-all duration-300 ease-in-out
        hover:border-brand-light hover:text-brand-light
        ${className}
      `}
    >
      {isOpen && iconLogo && (
        <span className="[&>svg]:w-8 [&>svg]:h-8">{iconLogo}</span>
      )}
      <span className="text-2xl font-bold tracking-tight">{title}</span>
    </div>
  );
}
