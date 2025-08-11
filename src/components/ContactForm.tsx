'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending'); 
    setError('');
  
    const formEl = e.currentTarget;              // ✅ capture before await
    const f = new FormData(formEl);
  
    const payload = {
      name: String(f.get('name') || ''),
      email: String(f.get('email') || ''),
      reason: String(f.get('reason') || ''),
      message: String(f.get('message') || ''),
      hp: String(f.get('hp') || ''),
    };
  
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  
    if (res.ok) {
      formEl.reset();                            // ✅ safe now
      setStatus('sent');
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error || 'Something went wrong.');
      setStatus('error');
    }
  }
  

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium">Name</span>
        <input name="name" required className="mt-1 w-full border p-2 rounded" />
      </label>

      <label className="block">
        <span className="block text-sm font-medium">Email</span>
        <input name="email" type="email" required className="mt-1 w-full border p-2 rounded" />
      </label>

      <label className="block">
        <span className="block text-sm font-medium">Reason</span>
        <select name="reason" className="mt-1 w-full border p-2 rounded">
          <option>Performance booking</option>
          <option>Private lessons</option>
          <option>Clinic / masterclass</option>
          <option>Other</option>
        </select>
      </label>

      <label className="block">
        <span className="block text-sm font-medium">Message</span>
        <textarea name="message" required rows={6} className="mt-1 w-full border p-2 rounded" />
      </label>

      {/* Honeypot */}
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />

      <button disabled={status==='sending'} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
        {status==='sending' ? 'Sending…' : 'Send'}
      </button>

      {status==='sent' && <p className="text-green-700">Thanks! Your message was sent.</p>}
      {status==='error' && <p className="text-red-700">Error: {error}</p>}
    </form>
  );
}
