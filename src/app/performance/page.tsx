import Link from 'next/link';

export const metadata = {
  title: 'Performance',
  description: 'Solo, orchestral, commercial performance and contracting.',
};

export default function PerformancePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Performance</h1>

      <section className="grid md:grid-cols-3 gap-4 mb-10">
        <Card title="Solo & Concerto" text="Recitals, concerto features, sacred music." />
        <Card title="Orchestral / Commercial" text="Principal/section work, pops, studio dates." />
        <Card title="Contracting" text="Assemble pro ensembles for events & sessions." />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Selected collaborations</h2>
        <ul className="list-disc pl-5 opacity-90 space-y-1">
          <li>Orchestra/ensemble A — principal trumpet</li>
          <li>Commercial project B — lead/section recording</li>
          <li>Festival C — featured soloist</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Repertoire highlights</h2>
        <p className="opacity-80 text-sm">Hummel, Haydn, Arutunian, Tomasi; Baroque piccolo works; commercial/lead book.</p>
      </section>

      <div className="flex gap-3">
        <Link href="/calendar" className="underline">See upcoming dates</Link>
        <Link href="/contact" className="inline-flex items-center rounded-full px-5 py-2.5 bg-white text-black font-medium hover:opacity-90">
          Book a performance
        </Link>
      </div>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-1 opacity-80">{text}</p>
    </div>
  );
}
