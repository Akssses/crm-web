import React from "react";
import s from "./Input.module.scss";

export default function Input({
  type = "text",
  label = "",
  placeholder = "",
  value = "",
  onChange = null,
  onFocus = null,
  onBlur = null,
  disabled = false,
  error = "",
  size = "md",
  variant = "default",
  icon: Icon = null,
  className = "",
  name = "",
  autoComplete = "off",
  required = false,
  maxLength = null,
}) {
  const inputClasses = [
    s.inputWrapper,
    s[`size-${size}`],
    s[`variant-${variant}`],
    disabled && s.disabled,
    error && s.error,
    Icon && s.withIcon,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={s.container}>
      {label && (
        <span className={s.label}>
          {label}
          {required && <span className={s.required}>*</span>}
        </span>
      )}

      <div className={inputClasses}>
        {Icon && <Icon className={s.icon} />}

        <input
          type={type}
          className={s.input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          name={name}
          autoComplete={autoComplete}
          maxLength={maxLength}
        />
      </div>

      {error && <span className={s.errorText}>{error}</span>}
    </div>
  );
}
