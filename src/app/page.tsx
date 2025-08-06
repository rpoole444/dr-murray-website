export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold">Dr. Robert Murray</h1>
      <nav className="mt-8 space-x-4">
        <a href="/about" className="text-blue-500 underline">About</a>
        <a href="/music" className="text-blue-500 underline">Music</a>
        <a href="/contact" className="text-blue-500 underline">Contact</a>
      </nav>
    </main>
  );
}