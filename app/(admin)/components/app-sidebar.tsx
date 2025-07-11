"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { FiHome } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";

import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { toast } from "sonner";
import { toastSuccesscolor } from "@/util/toastcol";
import UserBox from "@/components/UserBox";

const sidebarItems = [
  {
    name: "update",
    icon: FiHome,
    path: "/admin",
  },
  {
    name: "All product /Management",
    icon: MdOutlineProductionQuantityLimits,
    path: "/all",
  },
];

export function AppSidebar() {
  const handleLogout = async () => {
    toast.success("Signed out successfully", toastSuccesscolor);
    console.log("Signed out successfully");
    setTimeout(() => {
      signOut({ callbackUrl: "/login" });
    }, 1000);
  };

  return (
    <Sidebar className="bg-bright dark:!bg-black border-r border-neutral-200 dark:!border-neutral-900">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="ml-2 font-medium mr-3 mt-4">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent className="ml-1">
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href={item.path} className="font-medium text-[0.73rem]">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4">
        <UserBox />
        <Button
          onClick={handleLogout}
          className="w-full mb-2 flex cursor-pointer text-[0.75rem] dark:bg-black border-neutral-200 dark:border-neutral-900"
          variant="outline">
          <IoIosLogOut /> Logout
        </Button>
      </div>
    </Sidebar>
  );
}
