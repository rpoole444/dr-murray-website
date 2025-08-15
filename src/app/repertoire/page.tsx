import Link from 'next/link';

export const metadata = {
  title: 'Repertoire',
  description: 'Selected performance repertoire of Dr. Rob Murray, DMA.',
};

export default function Repertoire() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-3">Selected Repertoire</h1>
      <p className="opacity-80 mb-6">
        Representative works performed as soloist, ensemble member, and featured artist across classical,
        commercial, and contemporary literature. A full list is available on request.
      </p>

      {/* TOC */}
      <nav className="mb-8 text-sm opacity-90">
        <span className="mr-2">Jump to:</span>
        <Link className="underline mr-3" href="#solo">Solo & Concerto</Link>
        <Link className="underline mr-3" href="#chamber">Chamber / Recital</Link>
        <Link className="underline mr-3" href="#jazz">Jazz / Commercial</Link>
        <Link className="underline" href="#contemporary">Contemporary</Link>
      </nav>

      <section id="solo" className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Solo with Orchestra / Wind Ensemble</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Haydn — Trumpet Concerto in E♭</li>
          <li>Hummel — Trumpet Concerto in E</li>
          <li>Arutunian — Trumpet Concerto</li>
          <li>Neruda — Trumpet Concerto in E♭</li>
          <li>Ewazen — Concerto for Trumpet and Strings (arr. wind ensemble)</li>
        </ul>
      </section>

      <section id="chamber" className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Chamber / Recital Works</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Hindemith — Sonata for Trumpet and Piano</li>
          <li>Kennan — Sonata for Trumpet and Piano</li>
          <li>Enesco — Légende</li>
          <li>Bozza — Rustiques; Badinage</li>
          <li>Peaslee — Nightsongs</li>
          <li>Clarke — Carnival of Venice (variant cadenzas)</li>
          <li>Telemann / Tartini — Baroque selections (piccolo trumpet)</li>
        </ul>
      </section>

      <section id="jazz" className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Jazz / Commercial</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>New Orleans brass band repertoire (trad & modern book)</li>
          <li>Lead/section books: big band features and commercial shows</li>
          <li>Gillespie — A Night in Tunisia (feature)</li>
          <li>Jobim — Wave; Corcovado (flugelhorn features)</li>
          <li>Porter — Love for Sale (feature)</li>
        </ul>
      </section>

      <section id="contemporary">
        <h2 className="text-xl font-semibold mb-3">Contemporary & New Music</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Ewazen — Song and Story; Trio works (mixed ensembles)</li>
          <li>McKee — This Morning’s Ride</li>
          <li>Plog — Postcards</li>
          <li>Original works, arrangements, and commissioned pieces</li>
        </ul>
      </section>

      <div className="mt-8">
        <Link href="/contact" className="underline">Request full repertoire PDF →</Link>
      </div>
    </main>
  );
}
