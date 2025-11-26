"use client";
import React from "react";
import { Button } from "@/ui";
import { useRouter } from "next/navigation";
import s from "../styles/WelcomeScreen.module.scss";

export default function WelcomeScreen() {
  const router = useRouter();

  const benefits = [
    "Все командировки вашей компании в едином кабинете",
    "Билеты, квитанции и документы — сразу после оформления",
    "Прозрачные статусы и хранение всей переписки",
    "Без e-mail хаоса — все заявки в одном месте",
    "Привязка Telegram-бота",
    "Доступность 24/7",
  ];

  const handleRegister = () => {
    router.push("/onboarding/register");
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.header}>
          <h1 className={s.title}>Добро пожаловать в ПСЦ Тревел Хаб</h1>
        </div>

        <div className={s.benefits}>
          <ul className={s.benefitsList}>
            {benefits.map((benefit, index) => (
              <li key={index} className={s.benefitItem}>
                <div className={s.benefitIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className={s.benefitText}>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.cta}>
          <Button
            variant="primary"
            size="lg"
            onClick={handleRegister}
            fullWidth
          >
            Перейти к регистрации
          </Button>
        </div>
      </div>
    </div>
  );
}

