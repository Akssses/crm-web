import React from "react";
import { IoMdClose } from "react-icons/io";
import s from "./Modal.module.scss";

export default function Modal({
  isOpen = false,
  onClose = null,
  title = "",
  children = null,
  position = "right", // 'right' | 'left' | 'center'
  width = "600px",
  size = "md", // 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showOverlay = true,
  className = "",
  icon: Icon = null,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) {
  const modalClasses = [
    s.modal,
    s[`position-${position}`],
    s[`size-${size}`],
    isOpen && s.open,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // Закрытие при нажатии ESC
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEscape && e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Не рендерим ничего, если модалка не открыта (оптимизация)
  if (!isOpen && !document.querySelector(`.${s.modal}.${s.open}`)) {
    return null;
  }

  return (
    <>
      {showOverlay && (
        <div
          className={[s.overlay, isOpen && s.overlayOpen]
            .filter(Boolean)
            .join(" ")}
          onClick={handleOverlayClick}
        />
      )}

      <div
        className={modalClasses}
        style={{
          // На десктопе применяем width, на мобилке игнорируется через !important
          width: position === "center" ? undefined : width,
        }}
      >
        <div className={s.header}>
          <p>
            {Icon && <Icon size={18} className={s.icon} />}
            {title}
          </p>
          {onClose && (
            <button
              className={s.closeButton}
              onClick={onClose}
              aria-label="Закрыть модальное окно"
              type="button"
            >
              <IoMdClose size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className={s.content}>{children}</div>
      </div>
    </>
  );
}
