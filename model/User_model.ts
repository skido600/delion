import mongoose, { Document, Model, Schema } from "mongoose";

// Define interface for the user document
export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  emailVerified?: Date;
  verificationToken?: string;
}

// Define the schema
const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: { type: Date },
  verificationToken: { type: String },
});

const User: Model<IUser> =
  mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
