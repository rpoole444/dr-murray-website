import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const Schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  reason: z.string().optional(),
  message: z.string().min(10).max(5000),
  hp: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 });
    }

    const { name, email, reason, message, hp } = parsed.data;

    // Honeypot: silently accept but do nothing
    if (hp && hp.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const subject = `New inquiry — ${name} (${reason || 'General'})`;
    const text = [
      'New website inquiry',
      `Name: ${name}`,
      `Email: ${email}`,
      reason ? `Reason: ${reason}` : null,
      '',
      'Message:',
      message,
    ]
      .filter(Boolean)
      .join('\n');

    const html = `
      <h2>New website inquiry</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      ${reason ? `<p><b>Reason:</b> ${reason}</p>` : ''}
      <p><b>Message:</b></p>
      <pre style="white-space:pre-wrap;">${message}</pre>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM!,     // e.g. "Dr. Robert Murray Website <onboarding@resend.dev>"
      to: process.env.CONTACT_TO!,         // e.g. poole.reid@gmail.com (testing)
      replyTo: email,                     // ✅ correct key for Resend
      subject,
      text,                                // ✅ helps deliverability
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
