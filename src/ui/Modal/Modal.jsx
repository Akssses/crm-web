import React from "react";
import { IoMdClose } from "react-icons/io";
import s from "./Modal.module.scss";

export default function Modal({
  isOpen = false,
  onClose = null,
  title = "",
  children = null,
  position = "right",
  width = "600px",
  size = "md",
  showOverlay = true,
  className = "",
  icon: Icon = null,
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
        <div className={s.header}>
          <p>
            {" "}
            {Icon && <Icon size={18} className={s.icon} />}
            {title}
          </p>
          <button
            className={s.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className={s.content}>{children}</div>
      </div>
    </>
  );
}
