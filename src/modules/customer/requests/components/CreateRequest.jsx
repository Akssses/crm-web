"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui";
import Step2 from "@/modules/operator/requests/components/CreateRequest/Step2";
import s from "@/modules/operator/requests/styles/CreateRequest.module.scss";

export default function CustomerCreateRequest() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/customer/requests");
  };

  const handleSubmit = () => {
    // Здесь могла бы быть интеграция с API создания заявки от заказчика.
    router.push("/customer/requests");
  };

  return (
    <div className={s.container}>
      <Step2 />
      <div className={s.navigation}>
        <Button variant="outline" size="md" onClick={handleBack}>
          Отменить
        </Button>
        <Button variant="primary" size="md" onClick={handleSubmit}>
          Отправить заявку
        </Button>
      </div>
    </div>
  );
}


