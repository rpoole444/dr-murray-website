import Link from 'next/link'

export default function Music() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto p-8">
      <Link href="/" className="text-blue-500 underline">
        ← Back Home
      </Link>
      <h1 className="text-3xl font-bold my-4">Music & Recordings</h1>

      {/* Solo Recordings Section */}
      <section className="my-8">
        <h2 className="text-2xl font-semibold">Solo Recordings</h2>
        <p className="text-gray-600 mb-2">[Brief description]</p>
        <div className="space-y-4">
          {/* Replace these iframe embeds with actual YouTube or SoundCloud embeds */}
          <iframe className="w-full h-64" src="https://www.youtube.com/embed/[your-video-id]" allowFullScreen />
        </div>
      </section>

      {/* Ensemble Performances Section */}
      <section className="my-8">
        <h2 className="text-2xl font-semibold">Ensemble Performances</h2>
        <p className="text-gray-600 mb-2">[Brief description]</p>
        <div className="space-y-4">
          <iframe className="w-full h-64" src="https://www.youtube.com/embed/[your-video-id]" allowFullScreen />
        </div>
      </section>

      {/* Teaching & Masterclasses Section (Optional) */}
      <section className="my-8">
        <h2 className="text-2xl font-semibold">Teaching & Masterclasses</h2>
        <p className="text-gray-600 mb-2">[Brief description]</p>
        <div className="space-y-4">
          <iframe className="w-full h-64" src="https://www.youtube.com/embed/[your-video-id]" allowFullScreen />
        </div>
      </section>
    </main>
  )
}
