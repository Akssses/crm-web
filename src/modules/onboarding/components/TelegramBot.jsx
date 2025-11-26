"use client";
import React from "react";
import { Button } from "@/ui";
import { useRouter } from "next/navigation";
import s from "../styles/TelegramBot.module.scss";

export default function TelegramBot() {
  const router = useRouter();

  const steps = [
    "После входа в CRM откройте раздел «Telegram-бот»",
    "Нажмите «Привязать»",
    "Отправьте боту ваш персональный код",
    "Готово — бот будет автоматически присылать все документы",
  ];

  const handleContinue = () => {
    router.push("/customer/dashboard");
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.header}>
          <h1 className={s.title}>Получайте билеты и документы в Telegram</h1>
          <p className={s.subtitle}>
            Каждый сотрудник может подключить Telegram-бота, чтобы получать
            свои документы, квитанции и уведомления.
          </p>
        </div>

        <div className={s.instructions}>
          <h2 className={s.instructionsTitle}>Инструкция по шагам</h2>
          <ol className={s.stepsList}>
            {steps.map((step, index) => (
              <li key={index} className={s.stepItem}>
                <div className={s.stepNumber}>{index + 1}</div>
                <span className={s.stepText}>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={s.qrSection}>
          <div className={s.qrPlaceholder}>
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M6.5 6.5H6.51M17.5 6.5H17.51M6.5 17.5H6.51M17.5 17.5H17.51"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className={s.qrText}>Отсканируйте, чтобы открыть бота</p>
        </div>

        <div className={s.cta}>
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            fullWidth
          >
            Перейти в кабинет
          </Button>
        </div>
      </div>
    </div>
  );
}

