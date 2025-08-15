import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const ipHits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX = 5;

function limited(ip: string) {
  const now = Date.now();
  const rec = ipHits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    ipHits.set(ip, { count: 1, ts: now }); return false;
  }
  rec.count++; return rec.count > MAX;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const Schema = z.object({
  name: z.string().min(2, 'Please enter your full name (at least 2 characters).'),
  email: z.string().email('Enter a valid email address.'),
  reason: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  hp: z.string().optional(), // honeypot
});

// Map reasons to cleaner subject labels
const reasonLabels: Record<string, string> = {
  'Performance booking': 'Performance Inquiry',
  'Private lessons': 'Lesson Inquiry',
  'Clinic / masterclass': 'Clinic / Masterclass Inquiry',
  'Other': 'General Inquiry'
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Try again soon.' }, { status: 429 });
  }
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      // Return field-level errors so the client can highlight inputs
      const issues = parsed.error.flatten(); // { fieldErrors, formErrors }
      return NextResponse.json(
        { ok: false, error: 'Invalid input', issues },
        { status: 400 }
      );
    }

    const { name, email, reason, message, hp } = parsed.data;

    // Honeypot: silently accept but do nothing
    if (hp && hp.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }
const reasonLabel = reasonLabels[reason || 'Other'] || 'General Inquiry';

    const subject = `New ${reasonLabel} — ${name}`;
    const text = [
      `New ${reasonLabel}`,
      `Name: ${name}`,
      `Email: ${email}`,
      reason ? `Reason: ${reason}` : null,
      '',
      'Message:',
      message,
    ].filter(Boolean).join('\n');

    const html = `
      <h2>New ${reasonLabel}</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
      ${reason ? `<p><b>Reason:</b> ${reason}</p>` : ''}
      <p><b>Message:</b></p>
      <pre style="white-space:pre-wrap;">${message}</pre>
    `;
// Build a Reply-To with a display name that includes the inquiry type
const replyToWithLabel = `${name} (${reasonLabel}) <${email}>`;


    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM!, // e.g. "Dr. Robert Murray Website <onboarding@resend.dev>"
      to: process.env.CONTACT_TO!,     // e.g. poole.reid@gmail.com (testing)
      replyTo: replyToWithLabel,
      subject,
      text,
      html,
    });

       if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ ok: false, error: 'Email send failed' }, { status: 502 });
    }

       // ---- Auto-reply to the sender ----
    try {
      const ackSubject = `Thanks for your ${reasonLabel} — Dr. Rob Murray`;
      const ackText = `Hi ${name},

        Thanks for your ${reasonLabel.toLowerCase()}. I’ve received it and will follow up shortly.

        — Dr. Rob Murray
        Bookings & Lessons: ${process.env.CONTACT_TO}
        Website: https://robert-murray-site.vercel.app`;

      const ackHtml = `
        <p>Hi ${name},</p>
        <p>Thanks for your <b>${reasonLabel.toLowerCase()}</b>. I’ve received it and will follow up shortly.</p>
        <p>— Dr. Rob Murray<br/>
        Bookings &amp; Lessons: <a href="mailto:${process.env.CONTACT_TO}">${process.env.CONTACT_TO}</a><br/>
        Website: <a href="https://robert-murray-site.vercel.app">robert-murray-site.vercel.app</a></p>
      `;

      await resend.emails.send({
        from: process.env.CONTACT_FROM!,
        to: email, // sender's email
        subject: ackSubject,
        text: ackText,
        html: ackHtml,
      });
    } catch (e) {
      console.warn('Auto-reply failed (ignored):', e);
    }
    // ---- End auto-reply ----


    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('contact error:', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
  
}