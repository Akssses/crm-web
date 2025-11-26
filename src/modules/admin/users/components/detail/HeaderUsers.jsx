"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaUser, FaLock, FaBan, FaKey } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import s from "../../styles/HeaderUsers.module.scss";
import { Button } from "@/ui";

export default function HeaderUsers() {
  const pathname = usePathname();
  const router = useRouter();

  // Получаем ID пользователя из пути
  const userId = pathname?.split("/")[3] || "";

  const isActive = (path) => {
    if (!pathname) return false;
    if (path === "") {
      return (
        !pathname.includes("/activity-log") &&
        !pathname.includes("/auth-history") &&
        !pathname.includes("/permissions") &&
        !pathname.includes("/audit-blocks")
      );
    }
    return pathname.includes(path);
  };

  const handleNavigate = (path) => {
    router.push(`/admin/users/${userId}${path}`);
  };

  const handleBlock = () => {
    // Логика блокировки пользователя
    console.log("Блокировка пользователя");
  };

  const handleRestrictAccess = () => {
    // Логика ограничения доступа
    console.log("Ограничение доступа");
  };

  const handleChangePassword = () => {
    // Логика смены пароля
    console.log("Смена пароля");
  };

  return (
    <>
      <div className={s.header}>
        <div className={s.user}>
          <div className={s.avatar}>
            <FaUser size={18} />
          </div>
          <h4>Leslie Alexander</h4>
        </div>
        <div className={s.buttons}>
          <Button variant="bgblue" icon={FaPenToSquare}>
            Редактировать
          </Button>
          <Button variant="bgblue" icon={FaLock} onClick={handleBlock}>
            Заблокировать
          </Button>
          <Button variant="bgblue" icon={FaBan} onClick={handleRestrictAccess}>
            Ограничить доступ
          </Button>
          <Button variant="bgblue" icon={FaKey} onClick={handleChangePassword}>
            Сменить пароль
          </Button>
        </div>
      </div>
      <div className={s.navigation}>
        <button
          className={`${s.navItem} ${isActive("") ? s.active : ""}`}
          onClick={() => handleNavigate("")}
        >
          Общая информация
        </button>
        <button
          className={`${s.navItem} ${isActive("/activity-log") ? s.active : ""}`}
          onClick={() => handleNavigate("/activity-log")}
        >
          Журнал действий
        </button>
        <button
          className={`${s.navItem} ${isActive("/auth-history") ? s.active : ""}`}
          onClick={() => handleNavigate("/auth-history")}
        >
          История авторизаций
        </button>
        <button
          className={`${s.navItem} ${isActive("/permissions") ? s.active : ""}`}
          onClick={() => handleNavigate("/permissions")}
        >
          Матрица прав
        </button>
        <button
          className={`${s.navItem} ${isActive("/audit-blocks") ? s.active : ""}`}
          onClick={() => handleNavigate("/audit-blocks")}
        >
          Аудит блокировок
        </button>
      </div>
    </>
  );
}

