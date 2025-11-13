"use client"
import React, { useState } from "react";
import { Button, Input } from "@/ui";
import { useAuth } from "../hooks/useAuth";
import s from "../styles/LoginForm.module.scss";

export default function LoginForm() {
  const { login, isLoading, error, validationErrors, setStep } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password, rememberMe });
  };

  return (
    <div className={s.container}>
      <div className={s.card}>
        {/* Header */}
        <div className={s.header}>
          <h1 className={s.title}>Авторизация</h1>
          <p className={s.subtitle}>Введите данные для входа</p>
        </div>

        {/* Error Message */}
        {error && <div className={s.errorBanner}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className={s.form}>
          {/* Email */}
          <Input
            label="Почта"
            type="email"
            placeholder="johndoe@mail.com"
            value={email}
            onChange={setEmail}
            error={validationErrors.email}
            disabled={isLoading}
          />

          {/* Password */}
          <div className={s.passwordWrapper}>
            <Input
              label="Пароль"
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

          {/* Checkbox + Link */}
          <div className={s.footer}>
            <label className={s.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Запомнить меня</span>
            </label>
            <button
              type="button"
              className={s.link}
              onClick={() => setStep("forgot")}
              disabled={isLoading}
            >
              Забыли пароль?
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
            {isLoading ? "Загрузка..." : "Войти"}
          </Button>
        </form>
      </div>
    </div>
  );
}
