import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SessionProvider } from "next-auth/react";
import AdminLayout from "@/context/protected";
import Topnav from "@/components/Topnav";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminLayout>
      <SessionProvider>
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="border-b border-neutral-200 dark:border-[#ffffff1a]">
                <Topnav />
              </header>
              <main className="flex-1 overflow-y-auto p-2">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </AdminLayout>
  );
}
