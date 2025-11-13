import React from "react";
import s from "./Layout.module.scss";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";

export default function Layout({ children }) {
  return (
    <div className={s.layout}>
      <Sidebar />
      <div className={s.content}>
        <Header />
        <main className={s.main}>{children}</main>
      </div>
    </div>
  );
}
