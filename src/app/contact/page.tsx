import Link from "next/link";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold">Contact Page</h1>
      <Link href="/" className="mt-4 text-blue-500 underline">
        ← Back Home
      </Link>
    </main>
  );
}
