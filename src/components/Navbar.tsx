'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/performance', label: 'Performance' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/media', label: 'Media' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/press', label: 'Press' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Rob Murray</Link>
        <ul className="hidden md:flex gap-5 text-sm">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`transition-opacity hover:opacity-100 ${
                    active ? 'opacity-100 underline' : 'opacity-80'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Mobile: simple overflow menu later if you want */}
      </nav>
    </header>
  );
}
