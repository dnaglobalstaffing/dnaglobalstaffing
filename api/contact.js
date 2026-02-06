import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    // 👇 MANUAL BODY PARSING (IMPORTANT)
    let body = "";
    for await (const chunk of req) {
      body += chunk.toString();
    }

    const params = new URLSearchParams(body);

    const name = params.get("name");
    const phone = params.get("phone");
    const service = params.get("service");
    const location = params.get("location");
    const message = params.get("message");

    await resend.emails.send({
      from: "DNA Global Staffing <onboarding@resend.dev>",
      to: ["dnaglobalstaffing@googlegroups.com"],
      subject: "New Service Request - DNA Global Staffing",
      html: `
        <h2>New Service Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>
      `,
    });

    // 👇 SUCCESS REDIRECT (BACK TO CONTACT PAGE)
    res.status(302).setHeader("Location", "/contact.html");
    res.end();

  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).send("Email failed");
  }
}
