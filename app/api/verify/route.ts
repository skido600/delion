import { NextResponse } from "next/server";
import User from "@/model/User_model";
import { connectDB } from "@/lib/mongo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/verify-error`);
  }

  await connectDB();

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/verify-error`);
  }

  user.emailVerified = new Date();
  user.verificationToken = undefined;
  await user.save();

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/verify-success`);
}
