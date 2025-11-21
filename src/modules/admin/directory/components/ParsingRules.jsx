"use client";
import React, { useState } from "react";
import s from "../styles/ParsingRules.module.scss";
import { Input, Button, Switch } from "@/ui";
import { TiPlus } from "react-icons/ti";

export default function ParsingRules() {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: "Tariff",
      placeholder: "FARE*0*U*1*3",
      description: "Какой Тариф в начале прочих цена нет",
    },
    {
      id: 2,
      name: "YQ",
      placeholder: "YQ*0*1*1*7",
      description: "Топливный сбор",
    },
    {
      id: 3,
      name: "YR",
      placeholder: "YR*1*U*1*7",
      description: "Сбор за оформление",
    },
    {
      id: 4,
      name: "XT",
      placeholder: "XT*1*u*1*7",
      description: "Прочие таксы",
    },
    {
      id: 5,
      name: "Airport Tax",
      placeholder: "Airport*Tax(\\d{1}*7)",
      description: "Аэропортовый сбор",
    },
    {
      id: 6,
      name: "Currency detection",
      placeholder: "(RUB|USD|EUR)",
      description: "Автоопределение валюты",
    },
    {
      id: 7,
      name: "Passenger name",
      placeholder: "Name([A-Z\\s]+)",
      description: "ФИО пассажира",
    },
    {
      id: 8,
      name: "Ticket number",
      placeholder: "T(\\d{4}|\\d{13})",
      description: "Номер билета",
    },
    {
      id: 9,
      name: "Total",
      placeholder: "Total(\\d+[.,]\\d{2})",
      description: "Итоговая сумма",
    },
  ]);

  const [logics, setLogics] = useState([
    {
      id: 1,
      name: "Разбивать TAX-4900",
      desc: "Автоматически разделить таксы на компоненты",
      enabled: true,
    },
    {
      id: 2,
      name: "Определить валюту по строке",
      desc: "Автоматическое распознавание валюты из текста",
      enabled: true,
    },
    {
      id: 3,
      name: "Auto-trim лишних пробелов",
      desc: "Удалить лишние пробелы в начале и конце",
      enabled: true,
    },
    {
      id: 4,
      name: "Преобразовать ошибки OCR",
      desc: "Исправить l=1, O=0 и другие частые ошибки",
      enabled: true,
    },
  ]);

  const [behavior, setBehavior] = useState("error"); // error | warning | ignore

  const handleAddRule = () => {
    setRules([
      ...rules,
      {
        id: Math.max(...rules.map((r) => r.id), 0) + 1,
        name: "",
        placeholder: "",
        description: "",
      },
    ]);
  };

  const handleDeleteRule = (id) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const handleUpdateRule = (id, field, value) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleSwitchLogic = (id) => {
    setLogics(
      logics.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  };

  return (
    <div className={s.container}>
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Правила парсинга</h2>

        <div className={s.rulesContainer}>
          <div className={s.rulesColumn}>
            <h3 className={s.columnTitle}>Где искать поля</h3>
            {rules.map((rule) => (
              <div key={rule.id} className={s.ruleField}>
                <label className={s.fieldLabel}>{rule.name}</label>
                <Input
                  value={rule.placeholder}
                  onChange={(val) =>
                    handleUpdateRule(rule.id, "placeholder", val)
                  }
                  placeholder={rule.placeholder}
                  size="sm"
                />
              </div>
            ))}
            <button className={s.addRuleBtn} onClick={handleAddRule}>
              <TiPlus size={18} />
              Добавить поле
            </button>
          </div>

          <div className={s.rulesColumn}>
            <h3 className={s.columnTitle}>Описание</h3>
            {rules.map((rule) => (
              <div key={rule.id} className={s.ruleField}>
                <label className={s.fieldLabel}>Описание</label>
                <Input
                  value={rule.description}
                  onChange={(val) =>
                    handleUpdateRule(rule.id, "description", val)
                  }
                  placeholder={rule.description}
                  size="sm"
                />
              </div>
            ))}
            <div style={{ height: "48px" }} />
          </div>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Логика разбора</h2>

        <div className={s.logicsContainer}>
          {logics.map((logic) => (
            <div key={logic.id} className={s.logicItem}>
              <div className={s.logicContent}>
                <div
                  className={s.logicIcon}
                  style={{ color: getIconColor(logic.name) }}
                >
                  {getLogicIcon(logic.name)}
                </div>
                <div className={s.logicInfo}>
                  <h4 className={s.logicName}>{logic.name}</h4>
                  <p className={s.logicDesc}>{logic.desc}</p>
                </div>
              </div>
              <div>
                <Switch
                  checked={logic.enabled}
                  onChange={() => handleSwitchLogic(logic.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>Поведение</h3>

        <div className={s.behaviorOptions}>
          <p className={s.subtitle}>Если поле не найдено</p>
          <div>
            <label className={s.radio}>
              <input
                type="radio"
                name="behavior"
                value="error"
                checked={behavior === "error"}
                onChange={(e) => setBehavior(e.target.value)}
                defaultChecked
              />
              <span className={s.radioLabel}>Ошибка</span>
            </label>
            <label className={s.radio}>
              <input
                type="radio"
                name="behavior"
                value="warning"
                checked={behavior === "warning"}
                onChange={(e) => setBehavior(e.target.value)}
              />
              <span className={s.radioLabel}>Предупреждение</span>
            </label>
            <label className={s.radio}>
              <input
                type="radio"
                name="behavior"
                value="ignore"
                checked={behavior === "ignore"}
                onChange={(e) => setBehavior(e.target.value)}
              />
              <span className={s.radioLabel}>Игнорировать</span>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

// Вспомогательные функции
function getIconColor(name) {
  const colors = {
    "Разбивать TAX-4900": "#3b82f6",
    "Определить валюту по строке": "#10b981",
    "Auto-trim лишних пробелов": "#f59e0b",
    "Преобразовать ошибки OCR": "#ef4444",
  };
  return colors[name] || "#6b7280";
}

function getLogicIcon(name) {
  const icons = {
    "Разбивать TAX-4900": "🅺",
    "Определить валюту по строке": "💵",
    "Auto-trim лишних пробелов": "⚠️",
    "Преобразовать ошибки OCR": "🔧",
  };
  return icons[name] || "•";
}
