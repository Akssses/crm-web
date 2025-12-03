"use client";
import React, { useState, createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import s from "./Sidebar.module.scss";
import { menuItems as adminMenuItems } from "./Data";
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

function SidebarComponent({ items = adminMenuItems }) {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const pathname = usePathname();

  const normalize = (href) => {
    if (!href) return "";
    if (href !== "/" && href.endsWith("/")) return href.slice(0, -1);
    return href;
  };

  const normalizedPath = normalize(pathname || "/");

  const activeHref = useMemo(() => {
    return (
      items
        .filter((item) => item.href && item.href !== "#")
        .reduce((best, item) => {
          const normalizedHref = normalize(item.href);
          if (
            normalizedPath === normalizedHref ||
            (normalizedHref !== "/" &&
              normalizedPath.startsWith(`${normalizedHref}/`))
          ) {
            if (!best || normalizedHref.length > best.length) {
              return normalizedHref;
            }
          }
          return best;
        }, null) || null
    );
  }, [items, normalizedPath]);

  return (
    <aside className={`${s.sidebar} ${isCollapsed ? s.collapsed : ""}`}>
      <div className={`${s.header} ${isCollapsed ? s.headerCollapsed : ""}`}>
        <h4
          className={`${s.title} ${isCollapsed ? s.titleCollapsed : ""}`}
          aria-hidden={isCollapsed}
        >
          ПСЦ CRM
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
        {items.map((item) => {
          const normalizedHref = normalize(item.href);
          const isActive = activeHref && normalizedHref === activeHref;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${s.menuItem} ${isActive ? s.active : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon
                className={`${s.icon} ${isActive ? s.active : ""}`}
                size={20}
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
