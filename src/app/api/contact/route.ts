import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

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

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM!, // e.g. "Dr. Robert Murray Website <onboarding@resend.dev>"
      to: process.env.CONTACT_TO!,     // e.g. poole.reid@gmail.com (testing)
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ ok: false, error: 'Email send failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('contact error:', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}