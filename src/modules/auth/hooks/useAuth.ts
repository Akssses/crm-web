"use client";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import type {
  LoginCredentials,
  ForgotPasswordData,
  VerifyCodeData,
  ResetPasswordData,
} from "../types";

export const useAuth = () => {
  const store = useAuthStore();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  // Валидация email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Валидация пароля
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  // Login
  const login = async (credentials: LoginCredentials) => {
    const errors: { [key: string]: string } = {};

    if (!credentials.email) {
      errors.email = "Email обязателен";
    } else if (!validateEmail(credentials.email)) {
      errors.email = "Введите корректный email";
    }

    if (!credentials.password) {
      errors.password = "Пароль обязателен";
    } else if (!validatePassword(credentials.password)) {
      errors.password = "Пароль должен быть не менее 6 символов";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    store.setLoading(true);
    store.setError(null);

    try {
      // TODO: Замени на реальный API запрос
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Имитация успешного логина
      store.setUser({
        id: "1",
        email: credentials.email,
        name: "John Doe",
      });

      store.setStep("login");
    } catch (error) {
      store.setError("Ошибка при входе. Попробуйте снова.");
    } finally {
      store.setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (data: ForgotPasswordData) => {
    const errors: { [key: string]: string } = {};

    if (!data.email) {
      errors.email = "Email обязателен";
    } else if (!validateEmail(data.email)) {
      errors.email = "Введите корректный email";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    store.setLoading(true);
    store.setError(null);

    try {
      // TODO: Замени на реальный API запрос
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Переход к верификации кода
      store.setStep("verify");
    } catch (error) {
      store.setError("Ошибка при отправке email. Попробуйте снова.");
    } finally {
      store.setLoading(false);
    }
  };

  // Verify code
  const verifyCode = async (data: VerifyCodeData) => {
    const errors: { [key: string]: string } = {};

    if (!data.code || data.code.length !== 4) {
      errors.code = "Введите 4-значный код";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    store.setLoading(true);
    store.setError(null);

    try {
      // TODO: Замени на реальный API запрос
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Переход к сбросу пароля
      store.setStep("reset");
    } catch (error) {
      store.setError("Неверный код. Попробуйте снова.");
    } finally {
      store.setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (data: ResetPasswordData) => {
    const errors: { [key: string]: string } = {};

    if (!data.password) {
      errors.password = "Пароль обязателен";
    } else if (!validatePassword(data.password)) {
      errors.password = "Пароль должен быть не менее 6 символов";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Подтверждение пароля обязательно";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Пароли не совпадают";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    store.setLoading(true);
    store.setError(null);

    try {
      // TODO: Замени на реальный API запрос
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Успешный сброс пароля
      store.setStep("login");
      store.setError(null);
      // Можешь показать success уведомление
    } catch (error) {
      store.setError("Ошибка при сбросе пароля. Попробуйте снова.");
    } finally {
      store.setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    store.reset();
  };

  return {
    ...store,
    login,
    forgotPassword,
    verifyCode,
    resetPassword,
    logout,
    validationErrors,
    setValidationErrors,
  };
};
