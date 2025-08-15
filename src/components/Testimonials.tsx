export default function Testimonials({ items }:{ items:{quote:string;name:string}[] }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4">What people say</h2>
      <ul className="grid md:grid-cols-3 gap-4">
        {items.map((t, i) => (
          <li key={i} className="rounded-2xl border border-white/10 p-4 text-sm opacity-90">
            “{t.quote}”
            <div className="mt-2 opacity-70">— {t.name}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
