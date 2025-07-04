import AuthNav from "./components/AuthNav";
import { Toaster } from "sonner";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="fixed left-0 right-0">
        <AuthNav />
      </nav>

      <div>
        <Toaster position="top-center" /> {children}
      </div>
    </div>
  );
}
