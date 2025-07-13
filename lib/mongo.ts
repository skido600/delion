// import mongoose, { Mongoose } from "mongoose";

// declare global {
//   // eslint-disable-next-line no-var
//   var mongoose: {
//     conn: Mongoose | null;
//     promise: Promise<Mongoose> | null;
//   };
// }
// const MONGODB_URI: string | undefined = process.env.MONGO_URL;

// if (!MONGODB_URI) {
//   throw new Error("Please define DATABASE_URL in your environment variables");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export const connectDB = async (): Promise<Mongoose> => {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     mongoose.set("strictQuery", true);

//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         dbName: "Pos_delion",
//         bufferCommands: false, // Disable mongoose buffering
//         serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
//         socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
//       })
//       .then((mongoose: Mongoose) => {
//         console.log("MongoDB connected successfully");
//         return mongoose;
//       });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     console.error("MongoDB connection error:", e);
//     throw e;
//   }

//   return cached.conn;
// };

"use server";

import mongoose from "mongoose";
const { MONGO_URL } = process.env;

export const connectDB = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error("Missing env");
    }
    const { connection } = await mongoose.connect(MONGO_URL as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
