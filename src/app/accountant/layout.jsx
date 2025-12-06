"use client";
import React from "react";
import s from "./Layout.module.scss";
import Sidebar, {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import { accountantMenuItems } from "@/components/layout/Sidebar/AccountantData";
import { usePathname } from "next/navigation";

function LayoutContent({ children }) {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const isChatRoute = pathname?.startsWith("/accountant/chat");

  return (
    <div
      className={s.content}
      style={{
        marginLeft: isCollapsed ? "80px" : "280px",
        transition: "margin-left 0.1s ease",
      }}
    >
      {!isChatRoute && <Header menuItems={accountantMenuItems} />}
      <main className={s.main}>{children}</main>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className={s.layout}>
        <Sidebar items={accountantMenuItems} />
        <LayoutContent>{children}</LayoutContent>
      </div>
    </SidebarProvider>
  );
}
