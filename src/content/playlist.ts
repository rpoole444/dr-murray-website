export type Track = { id: string; title: string; artist?: string; src: string };

export const playlist: Track[] = [
  {
    id: 't1',
    title: 'Concerto Feature — Haydn, Mvt. I',
    artist: 'Rob Murray',
    src: '/media/audio/haydn-concerto-mvt1.mp3',
  },
  {
    id: 't2',
    title: 'Jazz Feature — A Night in Tunisia (Live)',
    artist: 'Rob Murray Quartet',
    src: '/media/audio/night-in-tunisia-live.mp3',
  },
  {
    id: 't3',
    title: 'Recital Selection — Enesco Légende',
    artist: 'Rob Murray',
    src: '/media/audio/enesco-legende.mp3',
  },
  {
    id: 't4',
    title: 'Commercial / Big Band Feature',
    artist: 'Rob Murray with Colorado Jazz Orchestra',
    src: '/media/audio/big-band-feature.mp3',
  },
  {
    id: 't5',
    title: 'New Music — This Morning’s Ride (McKee)',
    artist: 'Rob Murray',
    src: '/media/audio/this-mornings-ride.mp3',
  },
];
