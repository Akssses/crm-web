"use client";
import React from "react";
import s from "../styles/Schedule.module.scss";
import { Container, Piechart } from "@/ui";

export default function ScheduleOrder() {
  return (
    <Container size="full" direction="column" gap="lg">
      <h5 className={s.text}>График заказов</h5>
      <Piechart />
    </Container>
  );
}
