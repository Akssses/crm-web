"use client";
import React from "react";
import { Button } from "@/ui";
import { MdEdit, MdAdd, MdShoppingCart, MdArchive } from "react-icons/md";
import s from "../../styles/ClientHeader.module.scss";

export default function ClientHeader({ clientName = 'ООО "Asia Travel"' }) {
  return (
    <div className={s.header}>
      <div className={s.left}>
        <h1 className={s.title}>{clientName}</h1>
        <div className={s.tags}>
          <span className={s.tag}>Юр. лицо</span>
          <span className={`${s.tag} ${s.tagVip}`}>VIP</span>
        </div>
      </div>
      <div className={s.actions}>
        <Button variant="primary" icon={MdEdit}>
          Редактировать
        </Button>
        <Button variant="primary" icon={MdAdd}>
          Создать заявку
        </Button>
        <Button variant="primary" icon={MdShoppingCart}>
          Создать заказ
        </Button>
        <Button variant="primary" icon={MdArchive}>
          Архивировать
        </Button>
      </div>
    </div>
  );
}

