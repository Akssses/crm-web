import React from "react";
import { Container } from "@/ui";
import { CiCalendar } from "react-icons/ci";
import s from "../styles/Date.module.scss";

export default function Date({ date }) {
  return (
    <Container size="sm">
      <span className={s.date}>
        <CiCalendar size={20} />
        {date}
      </span>
    </Container>
  );
}
