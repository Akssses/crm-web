import React from "react";
import { Container, Chart } from "@/ui";
import s from "../styles/Efficiency.module.scss";

export default function Efficiency() {
  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Эффективность</h3>
      <Chart />
    </Container>
  );
}
