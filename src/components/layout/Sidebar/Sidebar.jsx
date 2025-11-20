"use client";
import React, { useState, createContext, useContext } from "react";
import s from "./Sidebar.module.scss";
import { menuItems } from "./Data";
import { MdKeyboardArrowLeft, MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

// Context для передачи состояния collapse
export const SidebarContext = createContext({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    return { isCollapsed: false, setIsCollapsed: () => {} };
  }
  return context;
}

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

function SidebarComponent() {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <aside className={`${s.sidebar} ${isCollapsed ? s.collapsed : ""}`}>
      <div className={`${s.header} ${isCollapsed ? s.headerCollapsed : ""}`}>
        <h4
          className={`${s.title} ${isCollapsed ? s.titleCollapsed : ""}`}
          aria-hidden={isCollapsed}
        >
          ПСЦ Админ
        </h4>
        <button
          className={s.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Развернуть" : "Свернуть"}
        >
          <MdKeyboardArrowLeft
            size={18}
            className={`${s.arrowIcon} ${isCollapsed ? s.collapsed : ""}`}
          />
        </button>
      </div>

      <nav className={s.menu}>
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${s.menuItem} ${isActive ? s.active : ""}`}
              onClick={() => setActiveItem(item.id)}
              title={isCollapsed ? item.label : ""}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`${s.icon} ${isActive ? s.active : ""}`}
              />
              {!isCollapsed && <span className={s.label}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={s.footer}>
        <div className={s.userInfo}>
          <div className={s.avatar}>
            <img src="/assets/images/avatar.svg" alt="avatar" />
          </div>
          {!isCollapsed && (
            <>
              <div className={s.userDetails}>
                <p className={s.userName}>Andrey Klaud</p>
                <p className={s.userEmail}>andrey@mail.com</p>
              </div>
              <button className={s.moreButton}>
                <MdKeyboardArrowDown size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SidebarComponent;
