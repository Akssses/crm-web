"use client";
import React, { useState } from "react";
import { Button, Input } from "@/ui";
import { useAuth } from "../hooks/useAuth";
import s from "../styles/ResetPasswordForm.module.scss";

export default function ResetPasswordForm() {
  const { resetPassword, isLoading, error, validationErrors, setStep } =
    useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({ password, confirmPassword });
  };

  return (
    <div className={s.container}>
      <div className={s.card}>
        {/* Header */}
        <div className={s.header}>
          <h1 className={s.title}>Введите код</h1>
          <p className={s.subtitle}>
            Мы отправили проверочный код на адрес электронной почты
            alexandra@mail.com
          </p>
        </div>

        {/* Error Message */}
        {error && <div className={s.errorBanner}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className={s.form}>
          {/* Password */}
          <div className={s.passwordWrapper}>
            <Input
              label="Новый пароль"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              error={validationErrors.password}
              disabled={isLoading}
            />
            <button
              type="button"
              className={s.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Confirm Password */}
          <div className={s.passwordWrapper}>
            <Input
              label="Подтвердите пароль"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={validationErrors.confirmPassword}
              disabled={isLoading}
            />
            <button
              type="button"
              className={s.togglePassword}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="primary"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Сбросить пароль"}
          </Button>
        </form>

        {/* Info */}
        <p className={s.info}>
          Отправить код еще раз - <span className={s.timer}>59 сек.</span>
        </p>

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
