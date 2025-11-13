import React from "react";
import s from "./Checkbox.module.scss";
import { MdCheck } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function Checkbox({
  checked = false,
  onChange = null,
  disabled = false,
  size = "md",
  label = "",
  description = "",
  id = "",
  name = "",
  className = "",
}) {
  const checkboxClasses = [
    s.checkboxWrapper,
    s[`size-${size}`],
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
    <div className={checkboxClasses}>
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
        <label htmlFor={id} className={s.checkbox}>
          {checked && <FaCheck className={s.checkIcon} />}
        </label>
      </div>

      {(label || description) && (
        <div className={s.content}>
          {label && (
            <p htmlFor={id} className={s.label}>
              {label}
            </p>
          )}
          {description && <p className={s.description}>{description}</p>}
        </div>
      )}
    </div>
  );
}
