export { auth as middleware } from "@/auth";

// 👇 Add this at the BOTTOM of the file
export const config = {
  matcher: "/:path*",
  runtime: "nodejs",
  unstable_allowDynamic: ["./lib/mongo.ts", "./node_modules/mongoose/dist/**"],
};
