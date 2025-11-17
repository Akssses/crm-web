import React from "react";
import s from "../../styles/AddOrgModal.module.scss";
import { Input, Button } from "@/ui";

export default function Step1({ inn, setInn, onNext, onClose, loading }) {
  return (
    <>
      <p>Юридическое лицо / ИНН</p>
      <Input
        placeholder="Введите ИНН"
        value={inn}
        onChange={setInn}
        maxLength={12}
      />

      <div className={s.actions}>
        <Button variant="outline" onClick={onClose}>
          Отмена
        </Button>
        <Button onClick={onNext} disabled={loading || inn.length === 0}>
          {loading ? "Проверка..." : "Далее"}
        </Button>
      </div>
    </>
  );
}
