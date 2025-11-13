"use client";
import React from "react";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import VerifyCodeForm from "./VerifyCodeForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { useAuth } from "../hooks/useAuth";

export default function AuthPage() {
  const { step } = useAuth();

  switch (step) {
    case "login":
      return <LoginForm />;
    case "forgot":
      return <ForgotPasswordForm />;
    case "verify":
      return <VerifyCodeForm />;
    case "reset":
      return <ResetPasswordForm />;
    default:
      return <LoginForm />;
  }
}
