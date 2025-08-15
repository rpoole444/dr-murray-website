'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Rob Murray</Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-5 text-sm">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`transition-opacity hover:opacity-100 ${active ? 'opacity-100 underline' : 'opacity-80'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 border border-white/20"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open menu</span>
          {/* simple hamburger */}
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-white/10">
          <ul className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block py-1 ${active ? 'underline' : 'opacity-90'}`}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
