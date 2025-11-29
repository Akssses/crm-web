"use client";

import React from "react";
import { Container } from "@/ui";
import s from "../../styles/CreateRequest.module.scss";

const STEPS = [
  {
    id: 1,
    number: "1",
    title: "Клиент и организация",
    subtitle: "Основная информация",
  },
  {
    id: 2,
    number: "2",
    title: "Типы услуг",
    subtitle: "Параметры бронирования",
  },
  {
    id: 3,
    number: "3",
    title: "Дополнительные данные",
    subtitle: "Файлы и требования",
  },
  {
    id: 4,
    number: "4",
    title: "Ответственные",
    subtitle: "Распределение операторов",
  },
];

export default function ProgressSteps({ currentStep = 1 }) {
  return (
    <Container size="full" className={s.progressSection}>
      <h2 className={s.sectionTitle}>Создание новой заявки</h2>
      <p className={s.sectionSubtitle}>
        Заполните все необходимые данные для формирования заявки
      </p>

      <div className={s.steps}>
        {STEPS.map((step) => (
          <div
            key={step.id}
            className={`${s.step} ${step.id === currentStep ? s.active : ""} ${
              step.id < currentStep ? s.completed : ""
            }`}
          >
            <div className={s.stepNumber}>{step.number}</div>
            <div className={s.stepContent}>
              <div className={s.stepTitle}>{step.title}</div>
              <div className={s.stepSubtitle}>{step.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
