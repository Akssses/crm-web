"use client";
import React from "react";
import s from "./Layout.module.scss";
import Sidebar, {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import { supervisorMenuItems } from "@/components/layout/Sidebar/SupervisorData";

function LayoutContent({ children }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={s.content}
      style={{
        marginLeft: isCollapsed ? "80px" : "280px",
        transition: "margin-left 0.1s ease",
      }}
    >
      <Header menuItems={supervisorMenuItems} />
      <main className={s.main}>{children}</main>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className={s.layout}>
        <Sidebar items={supervisorMenuItems} />
        <LayoutContent>{children}</LayoutContent>
      </div>
    </SidebarProvider>
  );
}


