import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongo";
import User from "@/model/User_model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Signupschema } from "@/lib/validate";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  try {
    const { error } = Signupschema.validate({ username, email, password });
    if (error) {
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 401 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "A user with that email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verifyLink = `${process.env.NEXTAUTH_URL}/api/verify?token=${verificationToken}`;
    console.log("verifyLink:", verifyLink);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      emailVerified: null,
    });
    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
        pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Delion POS" <${process.env.NODE_CODE_SENDING_EMAIL_ADDRESS}>`,
      to: email,
      subject: "Verify Your Delion POS Account",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verify Your Delion POS Account</title>
            <style>
              @media only screen and (max-width: 600px) {
                .container {
                  width: 100% !important;
                  padding: 16px !important;
                }
                .button {
                  width: 100% !important;
                }
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
            <div class="container" style="
              max-width: 600px;
              margin: 0 auto;
              padding: 32px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            ">
              <div style="text-align: center; margin-bottom: 24px;">
                <img src="https://your-domain.com/logo.png" alt="Delion POS Logo" width="120" style="max-width: 100%;" />
              </div>
              
              <h2 style="color: #2563eb; font-size: 20px; margin-bottom: 16px;">Welcome to Delion POS!</h2>
              <p style="color: #4b5563; margin-bottom: 24px; line-height: 1.5;">
                Thank you for signing up! Please verify your email address to activate your account and start using our point-of-sale system.
              </p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${verifyLink}" 
                   class="button"
                   style="
                     display: inline-block;
                     padding: 12px 24px;
                     background-color: #2563eb;
                     color: white;
                     text-decoration: none;
                     border-radius: 6px;
                     font-weight: 500;
                     font-size: 16px;
                   ">
                  Verify Email Address
                </a>
              </div>
              
              <p style="color: #4b5563; margin-bottom: 8px; font-size: 14px;">
                Or copy and paste this link into your browser:
              </p>
              <code style="
                display: block;
                word-break: break-all;
                background-color: #f3f4f6;
                padding: 12px;
                border-radius: 4px;
                font-size: 13px;
                margin-bottom: 32px;
                color: #1f2937;
              ">${verifyLink}</code>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
              
              <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
                If you didn't create a Delion POS account, please ignore this email.<br />
                This verification link will expire in 24 hours for security reasons.
              </p>
              
              <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
                Delion POS Team<br />
                <a href="https://your-domain.com" style="color: #9ca3af; text-decoration: underline;">www.your-domain.com</a>
              </p>
            </div>
          </body>
          </html>
        `,
      text: `Welcome to Delion POS!
      
      Thank you for signing up! Please verify your email address to activate your account.
      
      Verify your email by clicking this link:
      ${verifyLink}
      
      Or copy and paste this URL into your browser:
      ${verifyLink}
      
      If you didn't request this, please ignore this email.
      
      This verification link expires in 24 hours.
      
  
      `,
    });
    return NextResponse.json(
      {
        message:
          "User created. Verification email sent. to your email check your email",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Registration error:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
