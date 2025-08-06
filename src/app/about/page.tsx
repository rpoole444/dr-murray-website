import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto p-8">
      <Link href="/" className="text-blue-500 underline">
        ← Back Home
      </Link>
      <h1 className="text-3xl font-bold my-4">About Dr. Robert Murray</h1>

      <section className="flex flex-col md:flex-row gap-6 items-center">
        <Image
          src="/images/RobMurray406x500.jpg" // Put an action shot in /public/images/
          alt="Dr. Murray performing"
          width={400}
          height={400}
          className="rounded shadow-md"
        />
        <div className="prose">
          <p>[Insert Dr. Murray's full biography here, approximately 3–6 paragraphs. but up to you shorter or longer is a - okay here]</p>
          <ul>
            <li><strong>Education:</strong> [Insert education here]</li>
            <li><strong>Teaching Experience:</strong> [Columbus State University, University of Northern Colorado]</li>
            <li><strong>Performance Highlights:</strong> [Key performances, ensembles]</li>
            <li><strong>Awards & Honors:</strong> [List notable awards]</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
