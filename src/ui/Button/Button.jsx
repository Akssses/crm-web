import React from "react";
import s from "./Button.module.scss";

export default function Button({
  children,
  variant = "primary",
  size = "sm",
  icon: Icon = null,
  disabled = false,
  onClick = null,
  className = "",
  type = "button",
  fullWidth = false,
}) {
  const isIconOnly = Icon && !children;
  
  const buttonClasses = [
    s.button,
    s[`variant-${variant}`],
    s[`size-${size}`],
    disabled && s.disabled,
    fullWidth && s.fullWidth,
    isIconOnly && s.iconOnly,
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
      {children && <span className={s.text}>{children}</span>}
    </button>
  );
}
