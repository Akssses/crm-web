import React from "react";
import s from "../../styles/AddOrgModal.module.scss";
import { Button } from "@/ui";

export default function Step2({ error, onManualEntry, onBack }) {
  return (
    <>
      <p>{error}</p>
      <div className={s.actions}>
        <Button variant="outline" onClick={onBack}>
          Назад
        </Button>
        <Button onClick={onManualEntry}>Ввести данные вручную</Button>
      </div>
    </>
  );
}
