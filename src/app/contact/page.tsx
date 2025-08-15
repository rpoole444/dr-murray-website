// app/contact/page.tsx  ✅ SERVER COMPONENT (no "use client")
import ContactForm from '@/components/ContactForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Contact',
  description: 'Booking, lessons, and general inquiries.',
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Get in touch</h1>
      <p className="opacity-80 mb-6">
        For performance bookings, lessons, clinics, or media requests, use the form below.
      </p>

      {/* ✅ Required: Suspense wrapper when child uses useSearchParams */}
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </main>
  );
}
