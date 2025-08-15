import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import AudioPlayer from '@/components/AudioPlayer';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://robert-murray-site.vercel.app'),
  title: { default: 'Rob Murray — Trumpet', template: '%s | Rob Murray' },
  description: 'Trumpet artist, educator, and conductor.',
  openGraph: {
    type: 'website',
    title: 'Rob Murray — Trumpet',
    description: 'Trumpet artist, educator, and conductor.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rob Murray — Trumpet',
    description: 'Trumpet artist, educator, and conductor.',
    images: ['/og.png'],
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* a11y: skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only absolute left-3 top-3 z-[60] bg-white text-black px-3 py-1 rounded"
        >
          Skip to content
        </a>

        <Navbar />

        {/* pad bottom on mobile so floating mini-player never covers content */}
        <main id="main" className="pb-20 md:pb-0">
          {children}
        </main>

        {/* desktop spacer so fixed desktop player doesn't overlap content bottoms */}
        <div className="hidden md:block h-16" />

        <AudioPlayer />

        <footer className="mt-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="opacity-70 text-sm">© {new Date().getFullYear()} Rob Murray</p>
            <div className="flex gap-3 text-sm">
              <a className="underline" href="mailto:AJNA100@gmail.com">AJNA100@gmail.com</a>
              <a className="underline" href="/media">Media</a>
              <a className="underline" href="/calendar">Calendar</a>
              <a className="underline" href="/contact">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
