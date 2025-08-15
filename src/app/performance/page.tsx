import Link from 'next/link';
import { ButtonLink } from '@/components/ui';
import testimonials from '@/content/testimonials.json';
import Testimonials from '@/components/Testimonials';
export const metadata = {
  title: 'Performance',
  description: 'Solo, orchestral, commercial performance and contracting.',
};

export default function PerformancePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Performance</h1>

      {/* Services */}
      <section className="grid md:grid-cols-3 gap-4 mb-10">
        <Card title="Solo & Concerto" text="Recitals, concerto features, sacred music." />
        <Card title="Orchestral / Commercial" text="Principal/section work, pops, studio sessions." />
        <Card title="Contracting" text="Assemble pro ensembles for events & recordings." />
      </section>

      {/* Selected collaborations */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Selected collaborations</h2>
        <ul className="list-disc pl-5 opacity-90 space-y-1 text-sm">
          <li>Orchestra/Ensemble A — principal trumpet</li>
          <li>Commercial Project B — lead/section recording</li>
          <li>Festival C — featured soloist</li>
        </ul>
      </section>

      {/* Repertoire highlights */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Repertoire highlights</h2>
        <p className="opacity-80 text-sm">
          Hummel, Haydn, Arutunian, Tomasi; Baroque piccolo works; contemporary trumpet literature; commercial/lead book.
        </p>
      </section>

      <section className="mb-10">
        <Testimonials items={testimonials} />
      </section>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
       <Link className="underline" href="/calendar">See upcoming dates</Link>  {/* keep as text link */}
       <ButtonLink href="/contact">Book a performance</ButtonLink>
      </div>

      {/* JSON-LD to describe service (optional but helpful) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Trumpet performance and contracting',
            provider: { '@type': 'Person', name: 'Rob Murray, DMA' },
            areaServed: 'Colorado Front Range / Touring',
            url: 'https://robert-murray-site.vercel.app/performance',
          }),
        }}
      />
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm opacity-80 mt-1">{text}</p>
    </div>
  );
}
