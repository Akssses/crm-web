"use client";
import React from "react";
import { Container } from "@/ui";
import { MdWarning, MdError, MdInfo } from "react-icons/md";
import s from "../../styles/ClientWarnings.module.scss";

export default function ClientWarnings({ warnings = [] }) {
  if (!warnings || warnings.length === 0) {
    return null;
  }

  const getWarningIcon = (type) => {
    switch (type) {
      case "error":
        return <MdError size={20} className={s.errorIcon} />;
      case "warning":
        return <MdWarning size={20} className={s.warningIcon} />;
      case "info":
      default:
        return <MdInfo size={20} className={s.infoIcon} />;
    }
  };

  const getWarningClass = (type) => {
    switch (type) {
      case "error":
        return s.errorCard;
      case "warning":
        return s.warningCard;
      case "info":
      default:
        return s.infoCard;
    }
  };

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>⚠️ Предупреждения</h3>
      <div className={s.warningsList}>
        {warnings.map((warning, idx) => (
          <div key={idx} className={`${s.warningCard} ${getWarningClass(warning.type)}`}>
            <div className={s.iconWrapper}>
              {getWarningIcon(warning.type)}
            </div>
            <div className={s.content}>
              <p className={s.message}>{warning.message}</p>
              {warning.details && (
                <p className={s.details}>{warning.details}</p>
              )}
              {warning.date && (
                <span className={s.date}>{warning.date}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
