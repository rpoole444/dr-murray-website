// src/components/ui.tsx
import Link from 'next/link';

export function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`max-w-5xl mx-auto px-4 ${className}`}>{children}</section>;
}

export function Button({
  as = 'button', href, children, variant = 'primary', className = '', ...props
}: any) {
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const styles =
    variant === 'primary'
      ? 'bg-white text-black hover:opacity-90 focus-visible:ring-white'
      : 'border border-white/30 hover:bg-white/10 focus-visible:ring-white';
  const Tag: any = href ? Link : as;
  return (
    <Tag href={href} className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
