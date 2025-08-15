import Link from 'next/link';
import { ButtonLink } from '@/components/ui';
export const metadata = {
  title: 'Teaching',
  description: 'Private lessons, clinics, and masterclasses with Dr. Rob Murray.',
};

export default function TeachingPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Teaching & Lessons</h1>

      <p className="opacity-80 mb-6">
        Dr. Murray offers private trumpet lessons (in-person/remote), studio coachings,
        and clinics/masterclasses for schools and festivals. His approach blends classical fundamentals,
        commercial versatility, and practical audition prep.
      </p>

      <section className="space-y-3 mb-10">
        <h2 className="text-xl font-semibold">Lesson formats</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Private lessons — 30/60 minutes (in-person or Zoom)</li>
          <li>Studio coachings — brass section fundamentals</li>
          <li>Clinics & masterclasses — trumpet technique, audition prep, doubling</li>
        </ul>
      </section>

      <section className="space-y-3 mb-10">
        <h2 className="text-xl font-semibold">Topics</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Sound, articulation, range, endurance</li>
          <li>Style — classical, commercial, lead, jazz phrasing</li>
          <li>Practice design & performance psychology</li>
        </ul>
      </section>

      <div className="mt-6">
        <ButtonLink href="/contact">Request lessons / clinic</ButtonLink>
      </div>

      {/* Simple Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Trumpet lessons and clinics',
            provider: { '@type': 'Person', name: 'Rob Murray, DMA' },
            areaServed: 'Colorado Front Range / Online',
            url: 'https://robert-murray-site.vercel.app/teaching',
          }),
        }}
      />
    </main>
  );
}
