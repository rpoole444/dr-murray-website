export const metadata = { title: 'Equipment', description: 'Primary instruments and setup.' };
export default function Equipment() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Equipment</h1>
      <ul className="list-disc pl-5 space-y-1 opacity-90">
        <li>Bb/C/Piccolo Trumpets — (models/mouthpieces)</li>
        <li>Flugelhorn — (brand/model)</li>
        <li>Mouthpieces — (sizes), mutes (straight/cup/harmon/etc.)</li>
        <li>Mic & interface for remote sessions/lessons</li>
      </ul>
    </main>
  );
}
