import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      fullName,
      phone,
      address,
      city,
      postalCode,
      note,
      cartItems,
    } = body as {
      email: string;
      fullName: string;
      phone: string;
      address: string;
      city: string;
      postalCode: string;
      note?: string;
      cartItems: Array<{
        id: number;
        name: string;
        price: string;
        image: string;
        tagline: string;
      }>;
    };

    if (
      !email ||
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !postalCode ||
      !cartItems ||
      cartItems.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    const total = cartItems.reduce((sum, item) => {
      const digits = item.price.replace(/[^0-9]/g, "");
      return sum + parseInt(digits || "0", 10);
    }, 0);

    const imageMap: Record<string, string> = {
      "/plant1.png":
        "https://res.cloudinary.com/dlf4wz8pi/image/upload/v1778220832/plant1_uhuuej.png",
      "/plant2.png":
        "https://res.cloudinary.com/dlf4wz8pi/image/upload/v1778220859/plant2_g8p2n3.png",
      "/plant3.png":
        "https://res.cloudinary.com/dlf4wz8pi/image/upload/v1778220862/plant3_lrd9yp.png",
      "/plant4.png":
        "https://res.cloudinary.com/dlf4wz8pi/image/upload/v1778220864/plant4_gpfef3.png",
      "/plant5.png":
        "https://res.cloudinary.com/dlf4wz8pi/image/upload/v1778220863/plant5_rjlflq.png",
      "/plant6.png":
        "https://res.cloudinary.com/dlf4wz8pi/image/upload/v1778220863/plant6_jtawxr.png",
      "/plant7.png":
        "https://res.cloudinary.com/dlf4wz8pi/image/upload/v1778220863/plant7_krmtu7.png",
      "/plant8.png":
        "https://res.cloudinary.com/dlf4wz8pi/image/upload/v1778220865/plant8_ctqvo5.png",
    };

    const itemsHtml = cartItems
      .map((item) => {
        const imageUrl = imageMap[item.image] || `https://verdure.vercel.app${item.image}`;
        return `
        <tr>
          <td style="padding:16px 12px; border-bottom:1px solid #e2e8f0; vertical-align:middle;">
            <div style="display:flex; align-items:center; gap:16px;">
              <img
                src="${imageUrl}"
                alt="${item.name}"
                style="width:70px; height:70px; object-fit:contain; border-radius:12px; background:#f1f5f2; padding:6px;"
                onerror="this.style.display='none'"
              />
              <div>
                <div style="font-weight:700; color:#1a2c22; font-size:15px;">${item.name}</div>
                <div style="color:#5c6e64; font-size:13px; margin-top:4px;">${item.tagline}</div>
              </div>
            </div>
          </td>
          <td style="padding:16px 12px; border-bottom:1px solid #e2e8f0; text-align:right; font-weight:700; color:#1a2c22; font-size:13px; white-space:nowrap;">
            ${item.price}
          </td>
        </tr>
      `;
      })
      .join("");

    const mailOptions = {
      from: `"Verdure 🌿" <${process.env.EMAIL_USER}>`,
      to: email,
      bcc: "gamirasakmfoods@gmail.com",
      subject: "Your Verdure Order Confirmation 🌿",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="color-scheme" content="light" />
            <meta name="supported-color-schemes" content="light" />
          </head>
          <body style="margin:0; padding:0; background:#f0f4f1; color:#1a2c22; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; color-scheme:light;">
            <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:24px; overflow:hidden; box-shadow:0 4px 24px rgba(26,44,34,0.08); color:#1a2c22;">
              
              <!-- Header -->
              <div style="background:linear-gradient(135deg,#1a2c22 0%,#2d4a38 100%); padding:40px 40px 32px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:36px; font-weight:800; letter-spacing:-0.5px;">Verdure 🌿</h1>
                <p style="margin:8px 0 0; color:#a0c4a0; font-size:15px;">Order Confirmation</p>
              </div>

              <!-- Greeting -->
              <div style="padding:36px 40px 0;">
                <h2 style="margin:0 0 12px; color:#1a2c22; font-size:22px; font-weight:700;">
                  Thank you for your purchase! 🎉
                </h2>
                <p style="margin:0; color:#5c6e64; font-size:15px; line-height:1.6;">
                  We've received your order and are getting it ready with care. Here's a summary of what you've ordered:
                </p>
              </div>

              <!-- Delivery Details -->
              <div style="padding:24px 40px 0;">
                <div style="background:#f7faf7; border:1px solid #e2e8f0; border-radius:16px; padding:18px 20px;">
                  <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:#72927e; margin-bottom:10px;">
                    Delivery Details
                  </div>
                  <div style="font-size:14px; color:#1a2c22; line-height:1.6;">
                    <div><strong>Name:</strong> ${fullName}</div>
                    <div><strong>Phone:</strong> ${phone}</div>
                    <div><strong>Address:</strong> ${address}, ${city} ${postalCode}</div>
                    ${note ? `<div><strong>Note:</strong> ${note}</div>` : ""}
                  </div>
                </div>
              </div>

              <!-- Order Items -->
              <div style="padding:28px 40px;">
                <table style="width:100%; border-collapse:collapse;">
                  <thead>
                    <tr>
                      <th style="text-align:left; padding:10px 12px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:#72927e; border-bottom:2px solid #e2e8f0;">Item</th>
                      <th style="text-align:right; padding:10px 12px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:#72927e; border-bottom:2px solid #e2e8f0;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>

                <!-- Total -->
                <table role="presentation" style="margin-top:28px; width:100%; border-collapse:collapse; background:#f0f4f1; border-radius:12px;">
                  <tr>
                    <td style="padding:16px 12px; font-size:14px; font-weight:600; color:#5c6e64;">Order Total</td>
                    <td style="padding:16px 12px; text-align:right; font-size:18px; font-weight:800; color:#1a2c22; white-space:nowrap;">Rs. ${total.toLocaleString("en-IN")}/-</td>
                  </tr>
                </table>
              </div>

              <!-- Footer message -->
              <div style="padding:0 40px 36px;">
                <div style="background:#eef4f0; border-radius:16px; padding:24px; color:#1a2c22;">
                  <p style="margin:0; color:#1a2c22; font-size:14px; line-height:1.7;">
                    🌱 <strong>Your plants are being prepared</strong> with love. You'll receive a shipping notification once your order is on its way.<br/><br/>
                    If you have any questions, feel free to reply to this email.
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background:#1a2c22; padding:24px 40px; text-align:center;">
                <p style="margin:0; color:#72927e; font-size:13px;">
                  © 2025 Verdure · Bringing nature indoors 🌿
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
