"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import s from "./Sidebar.module.scss";
import { menuItems as adminMenuItems } from "./Data";
import { MdKeyboardArrowLeft, MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

// Context для передачи состояния collapse
export const SidebarContext = createContext({
  isCollapsed: false,
  setIsCollapsed: () => {},
  isMobileSidebarOpen: false,
  setIsMobileSidebarOpen: () => {},
});

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    return {
      isCollapsed: false,
      setIsCollapsed: () => {},
      isMobileSidebarOpen: false,
      setIsMobileSidebarOpen: () => {},
    };
  }
  return context;
}

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Закрываем sidebar при изменении размера экрана на desktop
  useEffect(() => {
    // Проверка на клиентскую сторону
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Блокируем скролл body когда sidebar открыт на мобильных
  useEffect(() => {
    // Проверка на клиентскую сторону
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    if (isMobileSidebarOpen && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function SidebarComponent({ items = adminMenuItems }) {
  const {
    isCollapsed,
    setIsCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  } = useSidebar();
  const pathname = usePathname();

  const roleTitles = {
    admin: "ПСЦ Админ",
    accountant: "ПСЦ Бухгалтер",
    operator: "ПСЦ Оператор",
    customer: "ПСЦ Клиент",
    supervisor: "ПСЦ Супервизор",
  };

  const rootSegment = pathname?.split("/")[1] || "";
  const portalTitle = roleTitles[rootSegment] || "ПСЦ CRM";

  const handleLinkClick = () => {
    // Проверка на клиентскую сторону
    if (typeof window === "undefined") return;

    // Закрываем мобильный sidebar при клике на ссылку
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop для мобильных */}
      {isMobileSidebarOpen && (
        <div
          className={s.backdrop}
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`${s.sidebar} ${isCollapsed ? s.collapsed : ""} ${
          isMobileSidebarOpen ? s.open : ""
        }`}
      >
        <div className={`${s.header} ${isCollapsed ? s.headerCollapsed : ""}`}>
          <h4
            className={`${s.title} ${isCollapsed ? s.titleCollapsed : ""}`}
            aria-hidden={isCollapsed}
          >
            {portalTitle}
          </h4>
          <button
            className={s.collapseButton}
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Развернуть" : "Свернуть"}
          >
            <MdKeyboardArrowLeft
              size={16}
              className={`${s.arrowIcon} ${isCollapsed ? s.collapsed : ""}`}
            />
          </button>
        </div>

        <nav className={s.menu}>
          {items.map((item) => {
            // Для корневых дашбордов типа "/accountant" считаем активным только точное совпадение,
            // чтобы дашборд бухгалтера не подсвечивался одновременно с другими страницами.
            const isRootDashboard = item.href === "/accountant";
            const isActive =
              pathname === item.href ||
              (!isRootDashboard && pathname.startsWith(item.href + "/"));
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`${s.menuItem} ${isActive ? s.active : ""}`}
                title={isCollapsed ? item.label : ""}
                onClick={handleLinkClick}
              >
                <Icon className={s.icon} size={20} />
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
    </>
  );
}

export default SidebarComponent;
