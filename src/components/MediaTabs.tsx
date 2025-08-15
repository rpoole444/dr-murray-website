'use client';

import { useState } from 'react';
import Image from 'next/image';

type Video = { id: string; title: string; url: string; credits?: string };
type Track = { id: string; title: string; src: string; credits?: string };
type Photo = { id: string; src: string; alt: string; credit?: string };

export default function MediaTabs({
  videos,
  audio,
  photos,
}: {
  videos: Video[];
  audio: Track[];
  photos: Photo[];
}) {
  const [tab, setTab] = useState<'video' | 'audio' | 'photos'>('video');

  // Helper to ensure privacy-friendly embeds
  const toEmbedSrc = (url: string) => {
    const embed = url.includes('embed') ? url : url.replace('watch?v=', 'embed/');
    return embed.replace('youtube.com', 'youtube-nocookie.com');
  };

  return (
    <section className="max-w-5xl mx-auto px-4">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['video', 'audio', 'photos'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              tab === t ? 'bg-white text-black' : 'border-white/20 text-white/90 hover:bg-white/5'
            }`}
            aria-pressed={tab === t}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Videos */}
      {tab === 'video' && (
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((v) => (
            <div key={v.id} className="aspect-video rounded-xl border border-white/10 overflow-hidden">
              <iframe
                className="w-full h-full"
                src={toEmbedSrc(v.url)}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={v.title}
              />
              <p className="mt-2 text-sm">
                {v.title}
                {v.credits ? ` — ${v.credits}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Audio */}
      {tab === 'audio' && (
        <ul className="space-y-4">
          {audio.map((a) => (
            <li key={a.id}>
              <p className="font-medium">
                {a.title}
                {a.credits ? ` — ${a.credits}` : ''}
              </p>
              <audio controls preload="none" className="w-full">
                <source src={a.src} />
              </audio>
            </li>
          ))}
        </ul>
      )}

      {/* Photos */}
      {tab === 'photos' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((p) => (
            <figure key={p.id}>
              <Image
                src={p.src}
                alt={p.alt}
                width={640}
                height={480}
                className="w-full h-auto rounded-lg ring-1 ring-white/10"
              />
              {p.credit && <figcaption className="text-xs mt-1 opacity-80">© {p.credit}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}