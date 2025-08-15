// src/app/not-found.tsx
import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="opacity-80 mb-6">The link may be broken or the page moved.</p>
      <Link className="underline" href="/">Back to Home</Link>
    </main>
  );
}
