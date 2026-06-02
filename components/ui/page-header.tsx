'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type HeaderVariant = 'h1' | 'h2' | 'h3';

interface IPageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  variant?: HeaderVariant;
}

const variants: Record<HeaderVariant, string> = {
  h1: 'text-3xl font-bold tracking-tight',
  h2: 'text-2xl font-semibold tracking-tight',
  h3: 'text-xl font-medium',
};

export function PageHeader({
  title,
  description,
  className,
  variant = 'h1',
}: IPageHeaderProps) {
  const HeadingTag = variant;

  return (
    <div className={cn('mb-6', className)}>
      <HeadingTag className={variants[variant]}>{title}</HeadingTag>
      {description && (
        <p
          className={cn(
            'text-muted-foreground mt-1',
            variant === 'h1' ? 'text-lg' : 'text-base',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
