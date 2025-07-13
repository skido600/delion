import mongoose, { Schema, model, Document } from "mongoose";
// Define the user document interface
export interface UserDocument extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  emailVerified?: Date;
  verificationToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    emailVerified: { type: Date },
    verificationToken: { type: String },
  },
  {
    timestamps: true,
  }
);

// Check for existing model to avoid OverwriteModelError
const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);

export default User;
