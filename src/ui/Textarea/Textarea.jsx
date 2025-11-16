"use client";
import React, { useState } from "react";
import s from "./Textarea.module.scss";

export default function Textarea({
  label = "",
  placeholder = "",
  value = "",
  onChange = null,
  disabled = false,
  error = "",
  size = "md",
  variant = "default",
  required = false,
  maxLength = null,
  minRows = 4,
  maxRows = 10,
  showCharCount = false,
  className = "",
}) {
  const [isFocused, setIsFocused] = useState(false);

  const textareaClasses = [
    s.textareaWrapper,
    s[`size-${size}`],
    error && s.error,
    disabled && s.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (maxLength && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
    }

    onChange?.(newValue);

    // Auto-expand textarea
    autoExpandTextarea(e.target);
  };

  const autoExpandTextarea = (el) => {
    el.style.height = "auto";
    const newHeight = Math.min(
      Math.max(el.scrollHeight, minRows * 24),
      maxRows * 24
    );
    el.style.height = `${newHeight}px`;
  };

  const charCount = value?.length || 0;
  const charCountText = maxLength
    ? `${charCount}/${maxLength}`
    : `${charCount}`;

  return (
    <div className={textareaClasses}>
      {label && (
        <p className={s.label}>
          {label}
          {required && <span className={s.required}>*</span>}
        </p>
      )}

      <div className={s.inputWrapper}>
        <textarea
          className={s.textarea}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            minHeight: `${minRows * 24}px`,
            maxHeight: `${maxRows * 24}px`,
          }}
        />

        {showCharCount && <div className={s.charCount}>{charCountText}</div>}
      </div>

      {error && <span className={s.errorText}>{error}</span>}
    </div>
  );
}
