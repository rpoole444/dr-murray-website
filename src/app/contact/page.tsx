import Link from 'next/link'

export default function Contact() {
  return (
    <main className="min-h-screen max-w-lg mx-auto p-8">
      <Link href="/" className="text-blue-500 underline">
        ← Back Home
      </Link>
      <h1 className="text-3xl font-bold my-4">Contact Dr. Murray</h1>

      <form
        className="flex flex-col gap-4"
        action="https://formspree.io/f/YOUR_FORMSPREE_ID"
        method="POST"
      >
        <label className="flex flex-col">
          Your Name:
          <input type="text" name="name" className="border rounded px-2 py-1" required />
        </label>

        <label className="flex flex-col">
          Your Email:
          <input type="email" name="email" className="border rounded px-2 py-1" required />
        </label>

        <label className="flex flex-col">
          Message:
          <textarea name="message" className="border rounded px-2 py-1 h-32" required />
        </label>

        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Send
        </button>
      </form>

      <section className="mt-6 text-center">
        <p>
          Or email directly at:
          <a href="mailto:drmurray@example.com" className="underline text-blue-500">
            drmurray@example.com
          </a>
        </p>
      </section>
    </main>
  )
}
