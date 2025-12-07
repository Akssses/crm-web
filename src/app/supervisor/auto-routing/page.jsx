"use client";

import React, { useState } from "react";
import { Container, Select, Switch, Button, Checkbox } from "@/ui";
import {
  MdTune,
  MdAutoMode,
  MdOutlineGroups,
  MdTimeline,
} from "react-icons/md";
import s from "./SupervisorAutoRoutingSettings.module.scss";

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
      <div className={s.header}>
        <h2>
          <MdAutoMode /> Настройки авто-распределения заявок
        </h2>
        <p>
          Управляйте логикой распределения заявок между операторами: по
          специализации, загруженности, опыту и SLA.
        </p>
      </div>

      <div className={s.mainGrid}>
        <section className={s.section}>
          <h3>
            <MdOutlineGroups /> Основные правила
          </h3>
          <p>
            Определите, как система будет выбирать оператора для новой заявки.
          </p>

          <div className={s.settingsList}>
            <label className={s.settingItem}>
              <div>
                <p>По специализации</p>
                <p>Направлять заявки операторам с нужным типом услуг</p>
              </div>
              <Switch
                checked={bySpecialization}
                onChange={setBySpecialization}
              />
            </label>

            <label className={s.settingItem}>
              <div>
                <p>По загруженности</p>
                <p>Отдавать приоритет менее загруженным операторам</p>
              </div>
              <Switch checked={byWorkload} onChange={setByWorkload} />
            </label>

            <label className={s.settingItem}>
              <div>
                <p>По опыту</p>
                <p>Сложные услуги — более опытным операторам</p>
              </div>
              <Switch checked={byExperience} onChange={setByExperience} />
            </label>
          </div>
        </section>

        <section className={s.section}>
          <h3>
            <MdTimeline /> SLA и время отклика
          </h3>
          <p>Настройки приоритета SLA и скорости реакции.</p>

          <div className={s.settingsList}>
            <label className={s.settingItem}>
              <div>
                <p>С учетом SLA</p>
                <p>Повышать приоритет заявок с риском срыва SLA</p>
              </div>
              <Switch checked={respectSLA} onChange={setRespectSLA} />
            </label>

            <label className={s.settingItem}>
              <div>
                <p>По времени отклика</p>
                <p>Учитывать среднее время ответа оператора</p>
              </div>
              <Switch
                checked={respectResponseTime}
                onChange={setRespectResponseTime}
              />
            </label>
          </div>
        </section>
      </div>

      <section className={s.servicesSection}>
        <h3>
          <MdTune /> Типы услуг и исключения
        </h3>
        <p>
          Настройте, какие типы услуг участвуют в авто-распределении, а какие
          требуют ручного назначения.
        </p>

        <div className={s.checkboxGroup}>
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

      <div className={s.actions}>
        <Button variant="outline">Отменить изменения</Button>
        <Button variant="primary">Сохранить настройки</Button>
      </div>
    </Container>
  );
}
