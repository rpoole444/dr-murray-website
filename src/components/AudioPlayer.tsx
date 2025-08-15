'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { playlist as defaultPlaylist, type Track } from '@/content/playlist';

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

export default function AudioPlayer({ tracks = defaultPlaylist }: { tracks?: Track[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showPrompt, setShowPrompt] = useState(true);    // polite autoplay gate
  const [expanded, setExpanded] = useState(false);        // mobile mini-player toggle

  const track = useMemo(() => tracks[idx], [tracks, idx]);

  function play() {
    const el = audioRef.current;
    if (!el) return;
    el.play()
      .then(() => {
        setPlaying(true);
        setShowPrompt(false);
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist ?? 'Rob Murray',
          });
        }
      })
      .catch(() => {
        setShowPrompt(true); // keep prompt visible if blocked
      });
  }
  
  function pause() {
    audioRef.current?.pause();
    setPlaying(false);
  }
  
  function toggle() {
    playing ? pause() : play();
  }
  
  function seek(pct: number) {
    const el = audioRef.current;
    if (!el || !duration) return;
    el.currentTime = pct * duration;
  }
  
  const next = useCallback(() => {
  setIdx((i) => (i + 1) % tracks.length);
  // resume playback if we were playing
  setTimeout(() => { if (playing) play(); }, 0);
  }, [tracks.length, playing]); // play() is stable by reference here; if not, add it.
  
  const prev = useCallback(() => {
  setIdx((i) => (i - 1 + tracks.length) % tracks.length);
  setTimeout(() => { if (playing) play(); }, 0);
  }, [tracks.length, playing]);
  // Wire audio events
useEffect(() => {
  const el = audioRef.current;
  if (!el) return;

  const onTime = () => setCurrentTime(el.currentTime || 0);
  const onLoaded = () => setDuration(el.duration || 0);
  const onEnded = () => next(); // ✅ safe

  el.addEventListener('timeupdate', onTime);
  el.addEventListener('loadedmetadata', onLoaded);
  el.addEventListener('ended', onEnded);
  el.volume = volume;

  return () => {
    el.removeEventListener('timeupdate', onTime);
    el.removeEventListener('loadedmetadata', onLoaded);
    el.removeEventListener('ended', onEnded);
  };
}, [idx, volume, next]);



  // Keep element volume synced
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Shared controls (used in both UIs)
  const Controls = ({ compact = false }: { compact?: boolean }) => (
    <div className="flex items-center gap-2 md:gap-3">
      <button
        onClick={prev}
        aria-label="Previous"
        className="rounded px-2 py-1 border border-white/10 hover:bg-white/10 text-xs md:text-sm"
      >
        ⏮
      </button>
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause' : 'Play'}
        className="rounded px-3 py-1 border border-white/10 hover:bg-white/10 text-xs md:text-sm"
      >
        {playing ? '⏸' : '▶'}
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="rounded px-2 py-1 border border-white/10 hover:bg-white/10 text-xs md:text-sm"
      >
        ⏭
      </button>

      {/* Title (truncate) */}
      <div className={`min-w-0 ${compact ? 'max-w-[150px]' : 'max-w-[260px]'} hidden sm:block`}>
        <div className="truncate text-xs md:text-sm">
          {track.title}{track.artist ? ` — ${track.artist}` : ''}
        </div>
      </div>
    </div>
  );

  // Seek + time (compact on mobile)
  const SeekBar = ({ compact = false }: { compact?: boolean }) => (
    <div className={`flex items-center gap-2 ${compact ? 'text-[10px]' : 'text-xs'} opacity-80`}>
      <span className={`${compact ? 'w-8' : 'w-10'} text-right tabular-nums`}>{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={1000}
        value={duration ? Math.floor((currentTime / duration) * 1000) : 0}
        onChange={(e) => seek(Number(e.target.value) / 1000)}
        className={`${compact ? 'w-40' : 'w-full'} accent-white`}
        aria-label="Seek"
      />
      <span className={`${compact ? 'w-8' : 'w-10'} tabular-nums`}>{formatTime(duration)}</span>
    </div>
  );

  const Volume = ({ compact = false }: { compact?: boolean }) => (
    <div className="flex items-center gap-2">
      <span className={`${compact ? 'text-[10px]' : 'text-xs'} opacity-80`}>Vol</span>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(volume * 100)}
        onChange={(e) => setVolume(Number(e.target.value) / 100)}
        className={`${compact ? 'w-20' : 'w-28'} accent-white`}
        aria-label="Volume"
      />
    </div>
  );

  return (
    <>
      {/* ===== Desktop: fixed bottom bar ===== */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-4">
          {showPrompt && (
            <button
              onClick={play}
              className="rounded-full px-3 py-1 text-sm border border-white/20 hover:bg-white/10"
            >
              ▶ Play site audio
            </button>
          )}

          <Controls />
          <div className="flex-1">
            <SeekBar />
          </div>
          <Volume />
        </div>
      </div>

      {/* ===== Mobile: floating mini player ===== */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        {/* Collapsed button */}
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="rounded-full p-3 border border-white/20 bg-black/80 backdrop-blur hover:bg-white/10"
            aria-label="Open audio player"
          >
            {/* music note / play state */}
            <span aria-hidden>{playing ? '🎵' : '▶'}</span>
          </button>
        )}

        {/* Expanded panel */}
        {expanded && (
          <div className="w-[92vw] max-w-xs rounded-2xl border border-white/10 bg-black/85 backdrop-blur p-3 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="truncate text-sm font-medium">
                {track.title}
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="text-xs opacity-80 hover:opacity-100"
                aria-label="Close audio player"
              >
                ✕
              </button>
            </div>

            {/* prompt (first play) */}
            {showPrompt && (
              <button
                onClick={play}
                className="mb-2 w-full rounded-full px-3 py-1 text-xs border border-white/20 hover:bg-white/10"
              >
                ▶ Tap to play
              </button>
            )}

            <div className="flex items-center justify-between gap-2">
              <Controls compact />
              <Volume compact />
            </div>

            <div className="mt-2">
              <SeekBar compact />
            </div>
          </div>
        )}
      </div>

      {/* Hidden audio element (shared) */}
      <audio ref={audioRef} src={track.src} preload="metadata" />
    </>
  );
}
