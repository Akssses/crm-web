"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/ui";
import { useAuth } from "../hooks/useAuth";
import s from "../styles/VerifyCodeForm.module.scss";

export default function VerifyCodeForm() {
  const { verifyCode, isLoading, error, validationErrors, setStep } = useAuth();
  const [codes, setCodes] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);

  // Таймер
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Автоматический переход на следующее поле
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = codes.join("");
    verifyCode({ code });
  };

  const handleResend = () => {
    setTimeLeft(60);
    // TODO: Отправить код еще раз
  };

  return (
    <div className={s.container}>
      <div className={s.card}>
        {/* Header */}
        <div className={s.header}>
          <h1 className={s.title}>Подтвердите что это вы</h1>
          <p className={s.subtitle}>
            Мы отправили проверочный код на адрес электронной почты
            alexandra@mail.com
          </p>
        </div>

        {/* Error Message */}
        {error && <div className={s.errorBanner}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className={s.form}>
          {/* Code Inputs */}
          <div className={s.codeInputs}>
            {codes.map((code, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                disabled={isLoading}
                className={s.codeInput}
                placeholder="•"
              />
            ))}
          </div>

          {validationErrors.code && (
            <div className={s.error}>{validationErrors.code}</div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="primary"
            size="lg"
            disabled={isLoading || codes.some((c) => !c)}
          >
            {isLoading ? "Загрузка..." : "Сбросить пароль"}
          </Button>
        </form>

        {/* Resend Section */}
        <div className={s.resendSection}>
          <p className={s.resendText}>
            Отправить код еще раз -{" "}
            <span className={s.timer}>{timeLeft} сек.</span>
          </p>
          {timeLeft === 0 && (
            <button
              type="button"
              className={s.resendButton}
              onClick={handleResend}
              disabled={isLoading}
            >
              Отправить код еще раз
            </button>
          )}
        </div>

        {/* Back Link */}
        <button
          type="button"
          className={s.backLink}
          onClick={() => setStep("forgot")}
          disabled={isLoading}
        >
          ← Вернуться назад
        </button>
      </div>
    </div>
  );
}
