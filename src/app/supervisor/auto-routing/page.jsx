"use client";

import React, { useState } from "react";
import { Container, Select, Switch, Button, Checkbox } from "@/ui";
import {
  MdTune,
  MdAutoMode,
  MdOutlineGroups,
  MdTimeline,
} from "react-icons/md";
import s from "@/modules/accountant/document/styles/Document.module.scss";

export default function SupervisorAutoRoutingSettingsPage() {
  const [bySpecialization, setBySpecialization] = useState(true);
  const [byWorkload, setByWorkload] = useState(true);
  const [byExperience, setByExperience] = useState(false);
  const [respectSLA, setRespectSLA] = useState(true);
  const [respectResponseTime, setRespectResponseTime] = useState(true);
  const [serviceTypes, setServiceTypes] = useState(["all"]);

  const handleServiceTypesChange = (value) => {
    setServiceTypes(
      value === "all"
        ? ["all"]
        : serviceTypes.includes("all")
        ? [value]
        : [...serviceTypes.filter((v) => v !== value), value]
    );
  };

  return (
    <Container size="full">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MdAutoMode /> Настройки авто-распределения заявок
        </h2>
        <p style={{ color: "#6b7280", marginTop: 4 }}>
          Управляйте логикой распределения заявок между операторами: по
          специализации, загруженности, опыту и SLA.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        <section
          style={{
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            padding: 20,
            backgroundColor: "#ffffff",
          }}
        >
          <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MdOutlineGroups /> Основные правила
          </h3>
          <p style={{ color: "#6b7280", margin: "4px 0 16px" }}>
            Определите, как система будет выбирать оператора для новой заявки.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <label style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontWeight: 500 }}>По специализации</p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>
                  Направлять заявки операторам с нужным типом услуг
                </p>
              </div>
              <Switch
                checked={bySpecialization}
                onChange={setBySpecialization}
              />
            </label>

            <label style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontWeight: 500 }}>По загруженности</p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>
                  Отдавать приоритет менее загруженным операторам
                </p>
              </div>
              <Switch checked={byWorkload} onChange={setByWorkload} />
            </label>

            <label style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontWeight: 500 }}>По опыту</p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>
                  Сложные услуги — более опытным операторам
                </p>
              </div>
              <Switch checked={byExperience} onChange={setByExperience} />
            </label>
          </div>
        </section>

        <section
          style={{
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            padding: 20,
            backgroundColor: "#ffffff",
          }}
        >
          <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MdTimeline /> SLA и время отклика
          </h3>
          <p style={{ color: "#6b7280", margin: "4px 0 16px" }}>
            Настройки приоритета SLA и скорости реакции.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <label style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontWeight: 500 }}>С учетом SLA</p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>
                  Повышать приоритет заявок с риском срыва SLA
                </p>
              </div>
              <Switch checked={respectSLA} onChange={setRespectSLA} />
            </label>

            <label style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontWeight: 500 }}>По времени отклика</p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>
                  Учитывать среднее время ответа оператора
                </p>
              </div>
              <Switch
                checked={respectResponseTime}
                onChange={setRespectResponseTime}
              />
            </label>
          </div>
        </section>
      </div>

      <section
        style={{
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          padding: 20,
          backgroundColor: "#ffffff",
          marginBottom: 20,
        }}
      >
        <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MdTune /> Типы услуг и исключения
        </h3>
        <p style={{ color: "#6b7280", margin: "4px 0 16px" }}>
          Настройте, какие типы услуг участвуют в авто-распределении, а какие
          требуют ручного назначения.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Checkbox
            checked={serviceTypes.includes("all")}
            onChange={() => handleServiceTypesChange("all")}
            label="Все услуги"
          />
          <Checkbox
            checked={serviceTypes.includes("avia")}
            onChange={() => handleServiceTypesChange("avia")}
            label="Авиа"
          />
          <Checkbox
            checked={serviceTypes.includes("hotel")}
            onChange={() => handleServiceTypesChange("hotel")}
            label="Отели"
          />
          <Checkbox
            checked={serviceTypes.includes("package")}
            onChange={() => handleServiceTypesChange("package")}
            label="Пакетные туры"
          />
          <Checkbox
            checked={serviceTypes.includes("visa")}
            onChange={() => handleServiceTypesChange("visa")}
            label="Визы / документы"
          />
        </div>
      </section>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <Button variant="outline">Отменить изменения</Button>
        <Button variant="primary">Сохранить настройки</Button>
      </div>
    </Container>
  );
}


