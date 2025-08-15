'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type FieldErrors = Partial<Record<'name' | 'email' | 'reason' | 'message' | 'hp', string[]>>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [messageValue, setMessageValue] = useState('');
  const minMessage = 10;
  
  const sp = useSearchParams();
  useEffect(() => {
    const r = sp.get('reason');
    if (r) {
      const sel = document.querySelector('select[name="reason"]') as HTMLSelectElement | null;
      if (sel) sel.value = r;
    }
  }, [sp]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    setFieldErrors({});

    const formEl = e.currentTarget; // capture before await
    const f = new FormData(formEl);

    const payload = {
      name: String(f.get('name') || ''),
      email: String(f.get('email') || ''),
      reason: String(f.get('reason') || ''),
      message: String(f.get('message') || ''),
      hp: String(f.get('hp') || ''),
    };

    // Quick client-side checks for clarity
    const localErrors: FieldErrors = {};
    if (!payload.name || payload.name.trim().length < 2) {
      localErrors.name = ['Please enter your full name (at least 2 characters).'];
    }
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      localErrors.email = ['Enter a valid email address.'];
    }
    if (!payload.message || payload.message.trim().length < minMessage) {
      localErrors.message = ['Message must be at least 10 characters.'];
    }
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setStatus('error');
      setError('Please fix the highlighted fields and try again.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        formEl.reset();
        setMessageValue('');
        setStatus('sent');
        setError('');
        return;
      }

      const data = await res.json().catch(() => null);
      if (data?.issues?.fieldErrors) {
        setFieldErrors(data.issues.fieldErrors as FieldErrors);
        setError('Please fix the highlighted fields and try again.');
        setStatus('error');
      } else {
        setError(data?.error || 'Something went wrong.');
        setStatus('error');
      }
    } catch (_) {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Name */}
      <label className="block">
        <span className="block text-sm font-medium">Name</span>
        <input
          name="name"
          aria-invalid={!!fieldErrors.name}
          className={`mt-1 w-full border p-2 rounded ${fieldErrors.name ? 'border-red-500' : ''}`}
          required
        />
        {fieldErrors.name && <p className="text-red-600 text-sm mt-1">{fieldErrors.name[0]}</p>}
      </label>

      {/* Email */}
      <label className="block">
        <span className="block text-sm font-medium">Email</span>
        <input
          name="email"
          type="email"
          aria-invalid={!!fieldErrors.email}
          className={`mt-1 w-full border p-2 rounded ${fieldErrors.email ? 'border-red-500' : ''}`}
          required
        />
        {fieldErrors.email && <p className="text-red-600 text-sm mt-1">{fieldErrors.email[0]}</p>}
      </label>

      {/* Reason */}
      <label className="block">
        <span className="block text-sm font-medium">Reason</span>
        <select name="reason" className="mt-1 w-full border p-2 rounded">
          <option>Performance booking</option>
          <option>Private lessons</option>
          <option>Clinic / masterclass</option>
          <option>Other</option>
        </select>
      </label>

      {/* Message + live character counter */}
      <label className="block">
        <span className="block text-sm font-medium">Message</span>
        <textarea
          name="message"
          rows={6}
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          aria-invalid={!!fieldErrors.message}
          className={`mt-1 w-full border p-2 rounded ${fieldErrors.message ? 'border-red-500' : ''}`}
          required
        />
        <div className="flex justify-between text-xs mt-1">
          <span className={messageValue.length < minMessage ? 'text-red-600' : 'text-gray-500'}>
            {messageValue.length}/{minMessage} min
          </span>
          {fieldErrors.message && <span className="text-red-600">{fieldErrors.message[0]}</span>}
        </div>
      </label>

      {/* Honeypot */}
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />

      <button
        disabled={status==='sending'}
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
      >
        {status==='sending' ? 'Sending…' : 'Send'}
      </button>

      {/* Summary error/success */}
      {status==='sent' && <p className="text-green-700">Thanks! Your message was sent.</p>}
      {status==='error' && error && <p className="text-red-700">{error}</p>}
    </form>
  );
}
