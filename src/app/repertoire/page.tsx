export const metadata = {
  title: 'Repertoire',
  description: 'Selected performance repertoire of Dr. Rob Murray, DMA.',
};

export default function Repertoire() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Selected Repertoire</h1>
      <p className="opacity-80 mb-8">
        A representative list of works performed as soloist, ensemble member, and featured artist.
        Dr. Murray’s repertoire spans classical, commercial, and contemporary works, and continues to grow.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Solo with Orchestra / Wind Ensemble</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Haydn — Trumpet Concerto in E♭ Major</li>
          <li>Hummel — Trumpet Concerto in E Major</li>
          <li>Arutunian — Trumpet Concerto</li>
          <li>Kennan — Sonata for Trumpet and Piano</li>
          <li>Neruda — Trumpet Concerto in E♭ Major</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Chamber / Recital Works</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Bozza — Rustiques</li>
          <li>Enesco — Légende</li>
          <li>Hindemith — Sonata for Trumpet and Piano</li>
          <li>Clarke — Carnival of Venice</li>
          <li>Peaslee — Nightsongs</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Jazz / Commercial</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Gillespie — A Night in Tunisia</li>
          <li>Jobim — Wave</li>
          <li>Porter — Love for Sale</li>
          <li>Shaw — Concerto for Clarinet (adapted for trumpet)</li>
          <li>Assorted New Orleans brass band repertoire</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Contemporary & New Music</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>Ewazen — Concerto for Trumpet and Strings</li>
          <li>McKee — This Morning’s Ride</li>
          <li>Plog — Postcards</li>
          <li>Original compositions and arrangements for solo trumpet and mixed ensembles</li>
        </ul>
      </section>
    </main>
  );
}
