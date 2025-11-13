"use client";
import React from "react";
import s from "../styles/Schedule.module.scss";
import { Container, Chart } from "@/ui";

export default function Schedule() {
  return (
    <Container size="full" direction="column" gap="lg">
      <h5 className={s.text}>График выручки</h5>
      <Chart />
    </Container>
  );
}
