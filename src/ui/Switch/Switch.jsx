import React from "react";
import s from "./Switch.module.scss";

export default function Switch({
  checked = false,
  onChange = null,
  disabled = false,
  size = "md",
  variant = "default",
  id = "",
  name = "",
  className = "",
  label = "",
  description = "",
}) {
  const switchClasses = [
    s.switchWrapper,
    s[`size-${size}`],
    s[`variant-${variant}`],
    disabled && s.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e) => {
    if (!disabled) {
      onChange?.(e.target.checked);
    }
  };

  return (
    <div className={switchClasses}>
      <div className={s.control}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={s.input}
        />
        <label htmlFor={id} className={s.toggle}></label>
      </div>

      {(label || description) && (
        <div className={s.content}>
          {label && (
            <label htmlFor={id} className={s.label}>
              {label}
            </label>
          )}
          {description && <p className={s.description}>{description}</p>}
        </div>
      )}
    </div>
  );
}
