'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)] focus:ring-[var(--brand)] shadow-[0_10px_30px_-18px_rgba(15,76,92,0.8)]',
    secondary: 'bg-[var(--accent)] text-[var(--brand-dark)] hover:bg-[var(--accent-strong)] focus:ring-[var(--accent)]',
    outline: 'border-2 border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white focus:ring-[var(--brand)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
