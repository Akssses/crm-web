"use client";
import React, { useState } from "react";
import { Container, Input, Select, Switch } from "@/ui";
import s from "../../../styles/tabs/GeneralInfo.module.scss";

export default function GeneralInfo() {
  const [userData, setUserData] = useState({
    name: "Leslie Alexander",
    email: "lesliealx01@mail.com",
    phone: "(702) 555-0122",
    organization: "Asia Travel",
    role: "Админ",
    status: "Активен",
    mfaEnabled: false,
    accessRestricted: false,
  });

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={s.generalInfo}>
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Основная информация</h5>
          <div className={s.grid}>
            <Input
              label="ФИО"
              value={userData.name}
              onChange={(val) => handleChange("name", val)}
            />
            <Input
              label="Email"
              value={userData.email}
              onChange={(val) => handleChange("email", val)}
            />
            <Input
              label="Телефон"
              value={userData.phone}
              onChange={(val) => handleChange("phone", val)}
            />
            <Select
              label="Организация"
              value={userData.organization}
              onChange={(val) => handleChange("organization", val)}
              options={[
                { value: "Asia Travel", label: "Asia Travel" },
                { value: "Турбай", label: "Турбай" },
                { value: "Best Travel", label: "Best Travel" },
              ]}
            />
            <Select
              label="Роль"
              value={userData.role}
              onChange={(val) => handleChange("role", val)}
              options={[
                { value: "Админ", label: "Админ" },
                { value: "Оператор", label: "Оператор" },
                { value: "Бухгалтер", label: "Бухгалтер" },
                { value: "Супервайзор", label: "Супервайзор" },
                { value: "Закупщик", label: "Закупщик" },
              ]}
            />
            <Select
              label="Статус"
              value={userData.status}
              onChange={(val) => handleChange("status", val)}
              options={[
                { value: "Активен", label: "Активен" },
                { value: "Не активен", label: "Не активен" },
                { value: "В архиве", label: "В архиве" },
              ]}
            />
          </div>
        </div>
      </Container>

      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Безопасность</h5>
          <div className={s.securityGrid}>
            <div className={s.switchContainer}>
              <Switch
                label="Многофакторная аутентификация (MFA)"
                checked={userData.mfaEnabled}
                onChange={(checked) => handleChange("mfaEnabled", checked)}
              />
            </div>
            <div className={s.switchContainer}>
              <Switch
                label="Ограничение доступа по организациям"
                checked={userData.accessRestricted}
                onChange={(checked) => handleChange("accessRestricted", checked)}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

