"use client";
import React, { useState } from "react";
import s from "./Select.module.scss";

export default function Select({
  label = "",
  options = [],
  value = "",
  onChange = null,
  placeholder = "Выберите опцию",
  disabled = false,
  error = "",
  size = "md",
  variant = "default",
  className = "",
  name = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectClasses = [
    s.selectWrapper,
    s[`size-${size}`],
    s[`variant-${variant}`],
    disabled && s.disabled,
    error && s.error,
    isOpen && s.open,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || placeholder;

  const handleSelect = (optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={s.container}>
      {label && <label className={s.label}>{label}</label>}

      <div
        className={selectClasses}
        onBlur={handleClickOutside}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          className={s.trigger}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span className={s.value}>{displayValue}</span>
          <svg
            className={s.arrow}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && (
          <div className={s.dropdown}>
            {options.length > 0 ? (
              options.map((option) => (
                <div
                  key={option.value}
                  className={[s.option, value === option.value && s.selected]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                  {value === option.value && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13.5 4L6 11.5L2.5 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              ))
            ) : (
              <div className={s.empty}>Нет опций</div>
            )}
          </div>
        )}
      </div>

      {error && <span className={s.errorText}>{error}</span>}
    </div>
  );
}
