import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <section className="text-center">
        <Image
          src="/images/rob-murray-p-mauriat-artist-0.webp" // put image in /public/images/
          alt="Dr. Robert Murray"
          width={250}
          height={250}
          className="rounded-full shadow-lg mx-auto"
        />
        <h1 className="text-4xl font-bold mt-4">Dr. Robert Murray</h1>
        <p className="text-xl mt-2 text-gray-600">
          Trumpet Artist, Educator & Conductor
        </p>
      </section>

      <nav className="mt-8 flex space-x-6 text-lg underline text-blue-500">
        <Link href="/about">About</Link>
        <Link href="/music">Music</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </main>
  )
}
