// app/contact/page.tsx  ✅ SERVER COMPONENT (no "use client")
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Booking, lessons, and general inquiries.',
};

export default function ContactPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Dr. Murray</h1>
      <ContactForm />   {/* client child */}
      <p className="mt-4 text-sm">
        Prefer email? <a className="underline" href="mailto:AJNA100@gmail.com">AJNA100@gmail.com</a>
      </p>
    </main>
  );
}
