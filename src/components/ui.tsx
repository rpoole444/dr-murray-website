import Link, { LinkProps } from 'next/link';
import * as React from 'react';

type Variant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
const styles: Record<Variant, string> = {
  primary: 'bg-white text-black hover:opacity-90 focus-visible:ring-white',
  secondary: 'border border-white/30 hover:bg-white/10 focus-visible:ring-white',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  className?: string;
};
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}

export type ButtonLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  LinkProps & {
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
