import Link, { type LinkProps } from 'next/link';
import * as React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base = 'btn';

const styles: Record<Variant, string> = {
  primary: 'bg-white text-black hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white',
  secondary: 'border border-white/30 text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white',
  ghost: 'text-white/90 hover:bg-white/5',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  className?: string;
};
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}

export type ButtonLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & LinkProps & {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};
export function ButtonLink({ href, children, variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export type CardProps = React.HTMLAttributes<HTMLDivElement> & { as?: React.ElementType; className?: string; };
export function Card({ as: Cmp = 'div', className = '', ...props }: CardProps) {
  return <Cmp className={`surface p-5 ${className}`} {...props} />;
}
