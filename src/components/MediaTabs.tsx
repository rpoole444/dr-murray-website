'use client';
import { useState } from 'react';
import type { Video, Track, Photo } from '@/types/media';

export default function MediaTabs({ videos, audio, photos }:{
  videos: Video[]; audio: Track[]; photos: Photo[];
}) {
  const [tab, setTab] = useState<'video'|'audio'|'photos'>('video');

  return (
    <section className="max-w-5xl mx-auto px-4">
      <div className="flex gap-2 mb-6">
        {(['video','audio','photos'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 rounded-full border ${tab===t ? 'bg-white text-black' : 'text-white'}`}
            aria-pressed={tab===t}
          >
            {t[0].toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {tab==='video' && (
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((v) => (
            <div key={v.id} className="aspect-video">
              <iframe
                title={v.title}
                src={v.url.includes('embed') ? v.url : v.url.replace('watch?v=', 'embed/')}
                loading="lazy"
                className="w-full h-full"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <p className="mt-2 text-sm">{v.title}{v.credits ? ` — ${v.credits}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {tab==='audio' && (
        <ul className="space-y-4">
          {audio.map((a) => (
            <li key={a.id}>
              <p className="font-medium">{a.title}{a.credits ? ` — ${a.credits}` : ''}</p>
              <audio controls preload="none" className="w-full">
                <source src={a.src} />
              </audio>
            </li>
          ))}
        </ul>
      )}

      {tab==='photos' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((p) => (
            <figure key={p.id}>
              <img src={p.src} alt={p.alt} className="w-full h-auto rounded" />
              {p.credit && <figcaption className="text-xs mt-1">© {p.credit}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
