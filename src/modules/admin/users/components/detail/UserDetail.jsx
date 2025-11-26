"use client";
import React from "react";
import { usePathname } from "next/navigation";
import HeaderUsers from "./HeaderUsers";
import GeneralInfo from "./tabs/GeneralInfo";
import ActivityLog from "./tabs/ActivityLog";
import AuthHistory from "./tabs/AuthHistory";
import PermissionsMatrix from "./tabs/PermissionsMatrix";
import AuditBlocks from "./tabs/AuditBlocks";
import s from "../../styles/UserDetail.module.scss";

export default function UserDetail() {
  const pathname = usePathname();
  
  // Определяем активную вкладку из URL
  const getActiveTab = () => {
    if (!pathname) return "general";
    if (pathname.includes("/activity-log")) return "activity-log";
    if (pathname.includes("/auth-history")) return "auth-history";
    if (pathname.includes("/permissions")) return "permissions";
    if (pathname.includes("/audit-blocks")) return "audit-blocks";
    return "general";
  };

  const activeTab = getActiveTab();

  return (
    <div className={s.userDetail}>
      <HeaderUsers />
      <div className={s.content}>
        {activeTab === "general" && <GeneralInfo />}
        {activeTab === "activity-log" && <ActivityLog />}
        {activeTab === "auth-history" && <AuthHistory />}
        {activeTab === "permissions" && <PermissionsMatrix />}
        {activeTab === "audit-blocks" && <AuditBlocks />}
      </div>
    </div>
  );
}

