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
    { label: 'Stage plot (PDF)', href: '/press/rob-murray-stage-plot.pdf' }, // remove if not used
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Press Kit</h1>

      {/* Short bio (150–200 words) */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Short bio</h2>
        <p className="opacity-90 text-[15px] leading-7">
          Rob Murray, DMA, is a trumpet artist, educator, and conductor whose work spans classical,
          commercial, and contemporary repertoire. He has performed as soloist and ensemble member
          with organizations across the Colorado Front Range and beyond, and is known for a versatile
          approach that blends orchestral precision, commercial lead sensibilities, and a clear,
          practical pedagogy. Dr. Murray maintains an active schedule of performances, clinics,
          and private lessons, and currently leads Harmonie del Sur, LLC. Full bio and media are
          available on this site; booking inquiries are welcome.
        </p>
        <div className="mt-4">
          <ButtonLink href="/contact" variant="secondary">Booking & media requests</ButtonLink>
        </div>
      </section>

      {/* Downloads */}a
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
        <p className="opacity-80 text-sm mb-3">Photo credit: Photographer Name (replace as needed)</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <figure className="rounded-2xl border border-white/10 p-3">
            <Image
              src="/images/press/headshot-1.jpg"
              alt="Rob Murray headshot 1"
              width={1200}
              height={1600}
              className="w-full h-auto rounded"
            />
            <figcaption className="text-xs opacity-70 mt-2">© Photographer Name — vertical</figcaption>
          </figure>
          <figure className="rounded-2xl border border-white/10 p-3">
            <Image
              src="/images/press/headshot-2.jpg"
              alt="Rob Murray headshot 2"
              width={1600}
              height={1200}
              className="w-full h-auto rounded"
            />
            <figcaption className="text-xs opacity-70 mt-2">© Photographer Name — horizontal</figcaption>
          </figure>
        </div>
      </section>

      {/* JSON-LD for an about-style page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Rob Murray Press Kit',
            url: 'https://robert-murray-site.vercel.app/press',
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: 'https://robert-murray-site.vercel.app/images/press/headshot-1.jpg'
            }
          }),
        }}
      />
    </main>
  );
}
