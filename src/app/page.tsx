import Image from 'next/image';
import Link from 'next/link';
import events from '@/content/events.json';

export const metadata = {
  title: 'Home',
  description: 'Trumpet artist, educator, and conductor.',
};

export default function Home() {
  // Take next 3 events (sorted soonest-first; keep simple for now)
  const upcoming = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Person JSON-LD
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rob Murray, DMA',
    jobTitle: 'Trumpet Artist & Educator',
    email: 'mailto:AJNA100@gmail.com',
    url: 'https://robert-murray-site.vercel.app',
  };

  return (
    <main className="min-h-screen px-6 py-12">
      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center">
        <Image
          src="/images/rob-murray-p-mauriat-artist-0.webp"
          alt="Portrait of Dr. Rob Murray holding a trumpet"
          width={220}
          height={220}
          className="rounded-full shadow-lg mx-auto"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold mt-5">Dr. Rob&nbsp;Murray</h1>
        <p className="text-lg md:text-xl mt-2 text-neutral-300">
          Trumpet artist, educator, and conductor
        </p>

        {/* Primary CTA */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-white text-black font-medium hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          >
            Book / Contact
          </Link>
          <Link
            href="/media"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 border border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          >
            View Media
          </Link>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section aria-labelledby="features" className="max-w-5xl mx-auto mt-12">
        <h2 id="features" className="sr-only">Site sections</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <FeatureCard
            title="Performance"
            desc="Solo, orchestral, commercial & contracting."
            href="/performance"
          />
          <FeatureCard
            title="Teaching"
            desc="Private lessons, clinics, and masterclasses."
            href="/teaching"
          />
          <FeatureCard
            title="Media"
            desc="Selected videos, audio, and photos."
            href="/media"
          />
        </div>
      </section>

      {/* UPCOMING EVENTS (teaser) */}
      <section aria-labelledby="upcoming" className="max-w-5xl mx-auto mt-14">
        <div className="flex items-baseline justify-between">
          <h2 id="upcoming" className="text-2xl font-semibold">Upcoming events</h2>
          <Link href="/calendar" className="underline opacity-80 hover:opacity-100">
            See full calendar
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <p className="mt-4 text-neutral-400">New dates coming soon.</p>
        ) : (
          <ul className="mt-5 space-y-3">
            {upcoming.map((e) => (
              <li key={`${e.title}-${e.date}`} className="p-4 rounded-lg border border-white/10">
                <p className="font-medium">{e.title}</p>
                <p className="text-sm opacity-80">
                  {new Date(e.date).toLocaleDateString()} — {e.venue}
                  {e.city ? `, ${e.city}` : ''}
                </p>
                {e.link && (
                  <a className="text-sm underline mt-1 inline-block" href={e.link}>
                    Details
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </main>
  );
}

function FeatureCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-white/10 p-5 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-1 opacity-80">{desc}</p>
      <span className="inline-block mt-3 underline">Explore</span>
    </Link>
  );
}
