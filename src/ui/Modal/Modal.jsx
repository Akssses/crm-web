import React from "react";
import s from "./Modal.module.scss";

export default function Modal({
  isOpen = false,
  onClose = null,
  title = "",
  children = null,
  position = "right",
  width = "500px",
  size = "md",
  showOverlay = true,
  className = "",
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
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // Закрытие при нажатии ESC
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
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
  }, [isOpen, onClose]);

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

      <div className={modalClasses} style={{ width }}>
        {/* Header */}
        <div className={s.header}>
          <h2 className={s.title}>{title}</h2>
          <button
            className={s.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className={s.content}>{children}</div>
      </div>
    </>
  );
}
