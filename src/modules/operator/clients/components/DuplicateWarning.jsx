"use client";
import React from "react";
import { Button } from "@/ui";
import { MdWarning, MdOpenInNew } from "react-icons/md";
import s from "../styles/DuplicateWarning.module.scss";

export default function DuplicateWarning({ duplicates = [], onViewClient }) {
  if (!duplicates || duplicates.length === 0) {
    return null;
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <MdWarning size={20} className={s.icon} />
        <h4 className={s.title}>Возможные дубли:</h4>
      </div>
      
      <div className={s.list}>
        {duplicates.map((dup, idx) => (
          <div key={idx} className={s.duplicateItem}>
            <div className={s.duplicateInfo}>
              <span className={s.name}>{dup.name}</span>
              <span className={s.match}>
                {dup.matchType === 'email' && 'совпадает email'}
                {dup.matchType === 'phone' && 'совпадает телефон'}
                {dup.matchType === 'inn' && 'совпадает ИНН'}
                {dup.matchType === 'passport' && 'совпадает паспорт'}
              </span>
              {dup.additionalInfo && (
                <span className={s.additional}>{dup.additionalInfo}</span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={MdOpenInNew}
              onClick={() => onViewClient && onViewClient(dup.id)}
            >
              Посмотреть карточку
            </Button>
          </div>
        ))}
      </div>

      <p className={s.hint}>
        Перед созданием клиента убедитесь, что это не дубликат существующей записи
      </p>
    </div>
  );
}
