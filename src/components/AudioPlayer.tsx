'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
  const [showPrompt, setShowPrompt] = useState(true); // polite autoplay gate

  const track = useMemo(() => tracks[idx], [tracks, idx]);

  // Wire events
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTime = () => setCurrentTime(el.currentTime || 0);
    const onLoaded = () => setDuration(el.duration || 0);
    const onEnded = () => next();

    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('ended', onEnded);
    el.volume = volume;

    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('ended', onEnded);
    };
  }, [idx, volume]);

  function play() {
    const el = audioRef.current;
    if (!el) return;
    el.play().then(() => {
      setPlaying(true);
      setShowPrompt(false);
      // Media Session API
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title,
          artist: track.artist ?? 'Rob Murray',
        });
      }
    }).catch(() => {
      // If autoplay blocked, keep prompt visible
      setShowPrompt(true);
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

  function next() {
    setIdx((i) => (i + 1) % tracks.length);
    setTimeout(() => playing && play(), 0);
  }

  function prev() {
    setIdx((i) => (i - 1 + tracks.length) % tracks.length);
    setTimeout(() => playing && play(), 0);
  }

  // Keep element volume in sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
        {/* Prompt (first visit) */}
        {showPrompt && (
          <button
            onClick={play}
            className="self-start md:self-auto rounded-full px-3 py-1 text-sm border border-white/20 hover:bg-white/10"
          >
            ▶ Play site audio
          </button>
        )}

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button onClick={prev} aria-label="Previous" className="rounded px-2 py-1 border border-white/10 hover:bg-white/10">⏮</button>
          <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} className="rounded px-3 py-1 border border-white/10 hover:bg-white/10">
            {playing ? '⏸' : '▶'}
          </button>
          <button onClick={next} aria-label="Next" className="rounded px-2 py-1 border border-white/10 hover:bg-white/10">⏭</button>
        </div>

        {/* Title */}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm">{track.title}{track.artist ? ` — ${track.artist}` : ''}</div>
          {/* Seek */}
          <div className="flex items-center gap-2 text-xs opacity-80">
            <span className="w-10 text-right tabular-nums">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={1000}
              value={duration ? Math.floor((currentTime / duration) * 1000) : 0}
              onChange={(e) => seek(Number(e.target.value) / 1000)}
              className="w-full accent-white"
              aria-label="Seek"
            />
            <span className="w-10 tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-80">Vol</span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="w-28 accent-white"
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={track.src} preload="metadata" />
    </div>
  );
}
