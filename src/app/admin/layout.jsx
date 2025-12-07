"use client";
import React from "react";
import s from "./Layout.module.scss";
import Sidebar, {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import { usePathname } from "next/navigation";
import { operatorMenuItems } from "@/components/layout/Sidebar/OperatorData";

function LayoutContent({ children }) {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const isChatRoute = pathname?.startsWith("/admin/chat");

  return (
    <div className={s.content} data-collapsed={isCollapsed}>
      {!isChatRoute && <Header menuItems={operatorMenuItems} />}
      <main className={s.main}>{children}</main>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className={s.layout}>
        <Sidebar />
        <LayoutContent>{children}</LayoutContent>
      </div>
    </SidebarProvider>
  );
}
