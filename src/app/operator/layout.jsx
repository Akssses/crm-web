"use client";
import React from "react";
import { usePathname } from "next/navigation";
import s from "./Layout.module.scss";
import Sidebar, {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import { operatorMenuItems } from "@/components/layout/Sidebar/OperatorData";

function LayoutContent({ children }) {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const isChatDetail =
    pathname?.startsWith("/operator/chat/") && pathname !== "/operator/chat";

  return (
    <div className={s.content} data-collapsed={isCollapsed}>
      {!isChatDetail && <Header menuItems={operatorMenuItems} />}
      <main className={s.main}>{children}</main>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className={s.layout}>
        <Sidebar items={operatorMenuItems} />
        <LayoutContent>{children}</LayoutContent>
      </div>
    </SidebarProvider>
  );
}
