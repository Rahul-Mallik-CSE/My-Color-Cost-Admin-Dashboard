/** @format */
"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Briefcase,
  Calendar,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/button";
import LogoutModal from "./LogOutModal";
import { PiUsersThreeBold } from "react-icons/pi";
import { AiOutlineCrown } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GrUserSettings } from "react-icons/gr";
import { BsBox2 } from "react-icons/bs";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";

export default function DashboardSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isCollapsed = state === "collapsed";

  const navItems = [
    {
      href: "/",
      icon: LayoutGrid,
      label: "Dashboard",
    },
    {
      href: "/users",
      icon: PiUsersThreeBold,
      label: "Users",
    },
    {
      href: "/subscribers",
      icon: AiOutlineCrown,
      label: "Subscribers",
    },
    {
      href: "/retailers",
      icon: MdOutlineShoppingCart,
      label: "Retailers",
    },
    {
      href: "/affiliate-users",
      icon: GrUserSettings,
      label: "Affiliate Users",
    },
    {
      href: "/orders",
      icon: BsBox2,
      label: "Orders",
    },
    {
      href: "/earnings",
      icon: LiaMoneyBillWaveAltSolid,
      label: "Earnings",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  const handleLogout = () => {
    router.push("/sign-in");
    // Add your logout logic here (e.g., clear tokens, redirect, etc.)
    console.log("Logging out...");
    setIsLogoutModalOpen(false);
    // Example: router.push('/login');
  };

  if (
    pathname == "/signin" ||
    pathname == "/forgot-password" ||
    pathname == "/reset-password" ||
    pathname == "/verify-otp"
  )
    return null;

  return (
    <>
      {/* mobile menu button */}
      {/* <div className="fixed top-10 bg-gray-200 rounded-sm left-8 z-40 md:hidden">
        <SidebarTrigger />
      </div> */}

      {/* Sidebar content goes here */}
      <Sidebar
        className="shadow-none px-3 py-4 md:px-2 bg-white border-r border-gray-200"
        collapsible="icon"
      >
        <SidebarContent className="bg-white rounded-tr-xl shadow-none">
          <div className="flex items-center justify-center my-4 px-2">
            <Logo open={!isCollapsed} />
          </div>
          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-1 items-center" : "md:px-1 space-y-1"
            }
          >
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={
                  !!(
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/")
                  )
                }
                collapsed={isCollapsed}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="pb-4 bg-white rounded-br-2xl shadow-none">
          {/* Footer content can go here if needed */}
          <div className="w-full flex justify-center">
            <Button
              variant="default"
              size="sm"
              className={cn(
                "flex text-black grow items-center justify-center bg-gray-50 font-medium hover:bg-[#F5E9EA] hover:text-[#9E2729]",
                isCollapsed
                  ? "rounded-md w-8 h-8 p-0"
                  : "h-10 md:h-12 w-full gap-2 rounded-md p-3",
              )}
              onClick={() => setIsLogoutModalOpen(true)}
            >
              {isCollapsed ? (
                <LogOut size={20} />
              ) : (
                <>
                  <LogOut size={18} />
                  <span className="text-base">Log Out</span>
                </>
              )}
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-12 mx-auto"
              : " flex items-center gap-3 h-10 md:h-12 rounded-md p-3 transition-colors text-sm",
            active
              ? "bg-linear-to-b from-[#e993fd] to-[#ff6c95]  text-white hover:bg-[#ff6c95] hover:text-white! font-medium"
              : "text-gray-700  hover:bg-[#F5E9EA]! hover:text-[#ff6c95]!  font-medium",
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-base">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
// ...existing code...

const Logo = ({ open }: { open: boolean }) => {
  return (
    <div
      className="font-normal flex items-center text-sm relative z-20 w-full justify-center"
      suppressHydrationWarning
    >
      <Image
        className="w-full h-full object-contain"
        alt="Logo"
        src="/color-cost-logo.png"
        width={open ? 900 : 30}
        height={open ? 900 : 40}
        priority
      />
    </div>
  );
};
