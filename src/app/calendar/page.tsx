import events from '@/content/events.json';
import Link from 'next/link';

export const metadata = {
  title: 'Calendar',
  description: 'Upcoming performances and events.',
};

export default function CalendarPage() {
  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // JSON-LD for Event list
  const eventLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: sorted.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: e.title,
        startDate: e.date,
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: e.venue,
          address: e.city || ''
        },
        url: e.link || 'https://robert-murray-site.vercel.app/calendar'
      }
    }))
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Performance Calendar</h1>

      {/* Optional Google Calendar embed — replace the src once Rob shares a public calendar */}
      <div className="aspect-video mb-8">
        <iframe
          title="Calendar"
          src="https://calendar.google.com/calendar/embed?src=PUBLIC_CALENDAR_URL"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

      <ul className="space-y-4">
        {sorted.map((e) => (
          <li key={`${e.title}-${e.date}`} className="p-4 rounded-lg border border-white/10">
            <p className="font-medium">{e.title}</p>
            <p className="text-sm opacity-80">
              {new Date(e.date).toLocaleDateString()} — {e.venue}
              {e.city ? `, ${e.city}` : ''}
            </p>
            {e.link && (
              <Link className="text-sm underline mt-1 inline-block" href={e.link}>
                Details
              </Link>
            )}
          </li>
        ))}
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
      />
    </main>
  );
}
