"use client";
import React, { useState } from "react";
import s from "./Sidebar.module.scss";
import { menuItems } from "./Data";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${s.sidebar} ${isCollapsed ? s.collapsed : ""}`}>
      <div className={s.header}>
        {!isCollapsed && <h4>ПСЦ Админ</h4>}
        <button
          className={s.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Развернуть" : "Свернуть"}
        >
          <MdKeyboardArrowDown
            size={18}
            className={`${s.arrowIcon} ${isCollapsed ? s.collapsed : ""}`}
          />
        </button>
      </div>

      <nav className={s.menu}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${s.menuItem} ${isActive ? s.active : ""}`}
              onClick={() => setActiveItem(item.id)}
              title={isCollapsed ? item.label : ""}
            >
              <IconComponent className={s.icon} />
              {!isCollapsed && <span className={s.label}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={s.footer}>
        <div className={s.userInfo}>
          <div className={s.avatar}>A</div>
          {!isCollapsed && (
            <>
              <div className={s.userDetails}>
                <p className={s.userName}>Andrey Klaud</p>
                <p className={s.userEmail}>andrey@mail.com</p>
              </div>
              <button className={s.moreButton}>
                <MdKeyboardArrowRight />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
