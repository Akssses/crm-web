"use client";
import React, { useState } from "react";
import { Button, Input } from "@/ui";
import { useAuth } from "../hooks/useAuth";
import s from "../styles/ForgotPasswordForm.module.scss";

export default function ForgotPasswordForm() {
  const { forgotPassword, isLoading, error, validationErrors, setStep } =
    useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  return (
    <div className={s.container}>
      <div className={s.card}>
        {/* Header */}
        <div className={s.header}>
          <h1 className={s.title}>Сбросить пароль</h1>
          <p className={s.subtitle}>
            Введите свой адрес электронной почты, и мы вышлем вам инструкции по
            сбросу пароля.
          </p>
        </div>

        {/* Error Message */}
        {error && <div className={s.errorBanner}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className={s.form}>
          {/* Email */}
          <Input
            label="Введите почту"
            type="email"
            placeholder="johndoe@mail.com"
            value={email}
            onChange={setEmail}
            error={validationErrors.email}
            disabled={isLoading}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="primary"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Подтвердить"}
          </Button>
        </form>

        {/* Back Link */}
        <button
          type="button"
          className={s.backLink}
          onClick={() => setStep("login")}
          disabled={isLoading}
        >
          ← Вернуться к входу
        </button>
      </div>
    </div>
  );
}
