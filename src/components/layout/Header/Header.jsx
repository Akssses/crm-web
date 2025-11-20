"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { usePathname } from "next/navigation";
import { menuItems } from "../Sidebar/Data";
import s from "./Header.module.scss";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const pageTitle = useMemo(() => {
    if (!pathname) {
      return "Профиль";
    }

    const matchedItem = menuItems.find((item) => {
      if (!item.href || item.href === "#") {
        return false;
      }
      return pathname.startsWith(item.href);
    });

    return matchedItem?.label || "Профиль";
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <h4 className={s.title}>{pageTitle}</h4>

        <div className={s.profileSection} ref={dropdownRef}>
          <button
            className={s.profileButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={s.avatar}>
              <img src="/assets/images/avatar.svg" alt="avatar" />
            </div>
            <div className={s.userInfo}>
              <p className={s.userName}>Andrey Klaud</p>
              <p className={s.userRole}>Администратор</p>
            </div>
            <MdKeyboardArrowDown
              size={20}
              className={`${s.arrowIcon} ${isDropdownOpen ? s.open : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className={s.dropdown}>
              <button className={s.dropdownItem}>Мой профиль</button>
              <button className={s.dropdownItem}>Настройки</button>
              <button className={s.dropdownItem}>Помощь</button>
              <div className={s.divider}></div>
              <button className={s.dropdownItem + " " + s.logout}>Выход</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
