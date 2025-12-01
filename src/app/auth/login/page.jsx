"use client";

import Link from "next/link";
import { AuthProvider } from "@/modules/auth/context/AuthContext";
import { LoginForm } from "@/modules/auth/components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Вход в систему
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Введите ваши учетные данные для входа
            </p>
          </div>

          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Или</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/register"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Создать аккаунт
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
