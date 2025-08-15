import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui';

export const metadata = {
  title: 'Press Kit',
  description: 'Downloadable press materials: one-sheet, headshots, and short bio.',
};

export default function PressPage() {
  const items = [
    { label: 'One-sheet (PDF)', href: '/press/rob-murray-one-sheet.pdf' },
    // Add when ready or remove this line:
    { label: 'Full bio (PDF)', href: '/press/rob-murray-full-bio.pdf' },
    // Remove if not used:
    { label: 'Stage plot (PDF)', href: '/press/rob-murray-stage-plot.pdf' },
  ];

  // Short bio: ~160–180 words; reflects 2025 retirement and core credits
  const shortBio = `Dr. Robert Murray, DMA, is a trumpet artist, pedagogue, and archivist whose work spans classical, commercial, and contemporary music. He retired in 2025 following a distinguished tenure as Professor of Trumpet in the Schwob School of Music at Columbus State University, where his studio earned national recognition and students advanced at the National Trumpet Competition, International Trumpet Guild (ITG), and major festivals. As a performer, Murray has appeared as principal and section trumpet with ensembles including the Owensboro Symphony, Orquesta Sinfónica de Minería (Mexico City), Portland Opera Orchestra, Opera Colorado, and North Charleston POPS!, and has collaborated with icons across orchestral, pops, and commercial stages. A committed chamber musician, he co-leads Harmonie del Sur with oboist Lauren Murray, premiering new works and presenting recitals and masterclasses nationwide. He also serves the field as Director of the ITG Archives at CSU. Murray holds the DMA in trumpet performance from the University of North Texas, with earlier studies at Portland State University and the University of Washington. Booking and media inquiries are welcome.`;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Press Kit</h1>

      {/* Short bio (150–200 words) */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Short bio</h2>
        <p className="opacity-90 text-[15px] leading-7">{shortBio}</p>
        <div className="mt-4 flex gap-3">
          <ButtonLink href="/contact" variant="secondary">Booking &amp; media requests</ButtonLink>
          <Link
            href="/press/rob-murray-full-bio.pdf"
            className="underline text-sm self-center"
            prefetch={false}
            download
          >
            Download full bio (PDF)
          </Link>
        </div>
      </section>

      {/* Downloads */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Downloads</h2>
        <ul className="list-disc pl-5 space-y-2">
          {items.map((it) => (
            <li key={it.label}>
              <a className="underline" href={it.href} download>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Headshots */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Headshots</h2>
        <p className="opacity-80 text-sm mb-3">
          Photo credit: Photographer Name (replace as needed)
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <figure className="rounded-2xl border border-white/10 p-3">
            <Image
              src="/images/press/headshot-1.jpg"
              alt="Dr. Robert Murray — vertical headshot"
              width={1200}
              height={1600}
              className="w-full h-auto rounded"
              priority
            />
            <figcaption className="text-xs opacity-70 mt-2">
              © Photographer Name — vertical
            </figcaption>
          </figure>
          <figure className="rounded-2xl border border-white/10 p-3">
            <Image
              src="/images/press/headshot-2.jpg"
              alt="Dr. Robert Murray — horizontal headshot"
              width={1600}
              height={1200}
              className="w-full h-auto rounded"
            />
            <figcaption className="text-xs opacity-70 mt-2">
              © Photographer Name — horizontal
            </figcaption>
          </figure>
        </div>
      </section>

      {/* JSON-LD (Person) */}
      <script
        type="application/ld+json"
        // Tip: Keep this minimal and correct; expand sameAs when you have links.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Dr. Robert Murray',
            jobTitle: 'Trumpet Artist & Educator',
            description: shortBio,
            url: 'https://robert-murray-site.vercel.app/press',
            affiliation: [
              {
                '@type': 'CollegeOrUniversity',
                name: 'Columbus State University — Schwob School of Music',
                url: 'https://www.columbusstate.edu',
              },
              {
                '@type': 'Organization',
                name: 'International Trumpet Guild Archives',
                url: 'https://www.trumpetguild.org',
              },
              {
                '@type': 'MusicGroup',
                name: 'Harmonie del Sur',
              },
            ],
            image: [
              'https://robert-murray-site.vercel.app/images/press/headshot-1.jpg',
              'https://robert-murray-site.vercel.app/images/press/headshot-2.jpg',
            ],
          }),
        }}
      />
    </main>
  );
}
