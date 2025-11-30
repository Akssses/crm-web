"use client";
import React, { useState } from "react";
import { Input } from "@/ui";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import s from "../styles/PassportMaskingField.module.scss";

export default function PassportMaskingField({ 
  value = "", 
  onChange, 
  label = "Паспорт / ИД",
  disabled = false,
  requiredRole = null // можно проверять роль для показа полного номера
}) {
  const [showFull, setShowFull] = useState(false);

  const maskPassport = (passport) => {
    if (!passport) return "";
    const cleaned = passport.replace(/\s/g, "");
    if (cleaned.length < 4) return "••••";
    
    // Формат: 12•• ••456
    const first = cleaned.substring(0, 2);
    const last = cleaned.substring(cleaned.length - 3);
    return `${first}•• ••${last}`;
  };

  const displayValue = showFull ? value : maskPassport(value);

  return (
    <div className={s.container}>
      <label className={s.label}>{label}</label>
      <div className={s.inputWrapper}>
        <Input
          value={displayValue}
          onChange={onChange}
          disabled={disabled}
          placeholder="1234 567890"
          className={s.input}
        />
        <button
          type="button"
          className={s.toggleButton}
          onClick={() => setShowFull(!showFull)}
          title={showFull ? "Скрыть" : "Показать полностью"}
        >
          {showFull ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
        </button>
      </div>
      <p className={s.hint}>
        {showFull ? "Полный номер паспорта" : "Маскированный вид по умолчанию"}
      </p>
    </div>
  );
}
