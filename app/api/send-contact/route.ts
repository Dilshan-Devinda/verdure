import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ── 1. Notify the site owner ─────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Verdure Contact Form 🌿" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name} — "${subject || "No subject"}"`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#f0f4f1;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
            <div style="max-width:580px;margin:40px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(26,44,34,0.08);">
              <div style="background:linear-gradient(135deg,#1a2c22 0%,#2d4a38 100%);padding:32px 36px;">
                <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;">📬 New Contact Message</h1>
                <p style="margin:6px 0 0;color:#a0c4a0;font-size:14px;">Via Verdure Contact Form</p>
              </div>
              <div style="padding:32px 36px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e8f0eb;width:100px;">
                      <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#72927e;">From</span>
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #e8f0eb;font-size:14px;color:#1a2c22;font-weight:600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e8f0eb;">
                      <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#72927e;">Email</span>
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #e8f0eb;font-size:14px;color:#1a2c22;font-weight:600;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e8f0eb;">
                      <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#72927e;">Subject</span>
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #e8f0eb;font-size:14px;color:#1a2c22;font-weight:600;">${subject || "—"}</td>
                  </tr>
                </table>
                <div style="margin-top:24px;">
                  <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#72927e;margin:0 0 10px;">Message</p>
                  <div style="background:#f0f4f1;border-radius:12px;padding:18px 20px;font-size:15px;line-height:1.7;color:#1a2c22;white-space:pre-wrap;">${message}</div>
                </div>
                <div style="margin-top:24px;padding:14px 18px;background:#eef7f0;border-radius:10px;font-size:13px;color:#4a7255;">
                  💡 Reply directly to this email to respond to <strong>${name}</strong>.
                </div>
              </div>
              <div style="background:#1a2c22;padding:20px 36px;text-align:center;">
                <p style="margin:0;color:#72927e;font-size:12px;">© 2025 Verdure · Bringing nature indoors 🌿</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // ── 2. Auto-reply to the sender ──────────────────────────────────────────
    await transporter.sendMail({
      from: `"Verdure 🌿" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We got your message! 🌿",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#f0f4f1;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
            <div style="max-width:580px;margin:40px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(26,44,34,0.08);">
              <div style="background:linear-gradient(135deg,#1a2c22 0%,#2d4a38 100%);padding:36px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-size:32px;font-weight:800;letter-spacing:-0.5px;">Verdure 🌿</h1>
                <p style="margin:8px 0 0;color:#a0c4a0;font-size:15px;">Thanks for reaching out!</p>
              </div>
              <div style="padding:36px;">
                <h2 style="margin:0 0 14px;color:#1a2c22;font-size:22px;font-weight:700;">
                  Hi ${name}, we received your message! 🎉
                </h2>
                <p style="margin:0;color:#5c6e64;font-size:15px;line-height:1.7;">
                  Thank you for contacting Verdure. We've received your message and one of our team members will get back to you within <strong>24 hours</strong>.
                </p>
                <div style="margin:28px 0;background:#f0f4f1;border-radius:14px;padding:20px 24px;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#72927e;">Your message</p>
                  <p style="margin:0;font-size:14px;color:#1a2c22;line-height:1.7;white-space:pre-wrap;">${message}</p>
                </div>
                <p style="margin:0;color:#5c6e64;font-size:14px;line-height:1.7;">
                  While you wait, feel free to browse our collection of beautiful indoor plants at 
                  <a href="https://verdure.store" style="color:#4a7255;font-weight:600;text-decoration:none;">verdure.store</a> 🌱
                </p>
              </div>
              <div style="background:#1a2c22;padding:24px 36px;text-align:center;">
                <p style="margin:0;color:#72927e;font-size:13px;">© 2025 Verdure · Bringing nature indoors 🌿</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
