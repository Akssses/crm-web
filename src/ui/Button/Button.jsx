import React from "react";
import s from "./Button.module.scss";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon = null,
  disabled = false,
  onClick = null,
  className = "",
  type = "button",
  fullWidth = false,
}) {
  const buttonClasses = [
    s.button,
    s[`variant-${variant}`],
    s[`size-${size}`],
    disabled && s.disabled,
    fullWidth && s.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon className={s.icon} />}
      <span className={s.text}>{children}</span>
    </button>
  );
}
