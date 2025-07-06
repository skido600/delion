import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import Topnav from "@/components/Topnav";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
