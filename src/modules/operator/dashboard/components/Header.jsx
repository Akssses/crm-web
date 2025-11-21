"use client";
import React from "react";
import { Button } from "@/ui";
import { CiCalendar } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import s from "../styles/Header.module.scss";

export default function Header({ date = "Feb 28, 2024" }) {
  return (
    <div className={s.header}>
      <span className={s.date}>
        <CiCalendar size={20} />
        {date}
      </span>
      <Button variant="primary" icon={MdAdd}>
        Создать заявку
      </Button>
    </div>
  );
}
