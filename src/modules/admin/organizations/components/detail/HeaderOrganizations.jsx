"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaUser, FaPlus, FaSave } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import s from "../../styles/HeaderOrganizations.module.scss";
import { Button } from "@/ui";

export default function HeaderOrganizations() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Получаем ID организации из пути
  const orgId = pathname?.split("/")[3] || "";

  const isActive = (path) => {
    if (!pathname) return false;
    if (path === "") {
      // Для главной страницы проверяем, что нет других путей
      return !pathname.includes("/financial-settings") && !pathname.includes("/balance");
    }
    return pathname.includes(path);
  };

  const handleNavigate = (path) => {
    router.push(`/admin/organizations/${orgId}${path}`);
  };

  return (
    <>
      <div className={s.header}>
        <div className={s.user}>
          <div className={s.avatar}>
            <FaUser size={18} />
          </div>
          <h4>ООО "Asia Travel"</h4>
        </div>
        <div className={s.buttons}>
          <Button variant="bgblue" icon={FaPenToSquare}>Редактировать</Button>
          <Button variant="bgblue" icon={FaPlus}>
            Добавить сотрудника
          </Button>
          <Button variant="bgblue" icon={FaSave}>
            Сохранить
          </Button>
          <Button variant="bgblue" icon={MdDelete}>
            Архивировать
          </Button>
        </div>
      </div>
      <div className={s.navigation}>
        <button
          className={`${s.navItem} ${!pathname?.includes("/financial-settings") && !pathname?.includes("/balance") ? s.active : ""}`}
          onClick={() => handleNavigate("")}
        >
          Общая информация
        </button>
        <button
          className={`${s.navItem} ${isActive("/financial-settings") ? s.active : ""}`}
          onClick={() => handleNavigate("/financial-settings")}
        >
          Финансовые настройки
        </button>
        <button
          className={`${s.navItem} ${isActive("/balance") ? s.active : ""}`}
          onClick={() => handleNavigate("/balance")}
        >
          Баланс и задолженности
        </button>
      </div>
    </>
  );
}
