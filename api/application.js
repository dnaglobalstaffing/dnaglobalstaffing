import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }

  try {

    const data = req.body;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'dnaglobalstaffing@gmail.com',
      subject: 'New DNA Staffing Application',
      html: `
        <h2>New Application Received</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `
    });

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ success: false });
  }
}
