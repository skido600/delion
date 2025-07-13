/* eslint-disable */
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

    console.log("Connecting to the database...");
    await connectDB();
    console.log("Database connected successfully");
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
      from: `"Welcome to Delion pos" <${process.env.NODE_CODE_SENDING_EMAIL_ADDRESS}>`,
      to: email,
      subject: "Verify Your Delion pos Account",
      html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Verify Your Email</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f9fafb;">
              <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 24px;
                background-color: #ffffff;
              ">
                <h2 style="color: #333446;">Welcome to Delion pos Account!</h2>
                <p>Please verify your email address to activate your account:</p>
                <a href="${verifyLink}" 
                   style="
                     display: inline-block;
                     padding: 12px 24px;
                     background-color: #333446;
                     color: white;
                     text-decoration: none;
                     border-radius: 4px;
                     margin: 16px 0;
                   ">
                  Verify Email
                </a>
                <p>Or copy this link into your browser:</p>
                <code style="word-break: break-all;">${verifyLink}</code>
                <hr style="border: 1px solid #e5e7eb; margin: 24px 0;" />
              </div>
              <p>this email.
      This link expires in 24 hours</p>
            </body>
          </html>
        `,
      text: `Welcome to Delion pos!
      
      Please verify your email by clicking this link:
      ${verifyLink}
      
      If you didn't request this, please ignore this email.
      This link expires in 24 hours.`,
    });

    return NextResponse.json(
      { message: "User created. Verification email sent. to your email check" },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Registration error:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
