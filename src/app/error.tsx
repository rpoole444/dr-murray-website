// src/app/error.tsx (client file)
'use client';
export default function Error({ error }: { error: Error }) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      <p className="opacity-80 mb-6">{error.message}</p>
    </main>
  );
}
