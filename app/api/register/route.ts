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
      from: `"welcome to delion" <${process.env.NODE_CODE_SENDING_EMAIL_ADDRESS}>`,
      to: email,
      subject: "Verify Your Wave Account",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to Wave!</h2>
            <p>Please verify your email address to activate your account:</p>
            <a href="${verifyLink}" 
               style="display: inline-block; padding: 12px 24px; background-color: #2563eb; 
                      color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">
              Verify Email
            </a>
            <p>Or copy this link into your browser:<br>
              <code style="word-break: break-all;">${verifyLink}</code>
            </p>
            <hr style="border: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="font-size: 0.8rem; color: #6b7280;">
              If you didn't create a Wave account, please ignore this email.<br>
              This verification link expires in 24 hours.
            </p>
          </div>
        `,
      text: `Welcome to Wave!\n\nPlease verify your email by clicking this link:\n${verifyLink}\n\nIf you didn't request this, please ignore this email.\n\nThis link expires in 24 hours.`,
    });

    return NextResponse.json(
      { message: "User created. Verification email sent." },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Registration error:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
