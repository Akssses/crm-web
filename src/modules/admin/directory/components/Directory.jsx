"use client";
import React, { useState } from "react";
import s from "../styles/Directory.module.scss";
import { UITable, Button } from "@/ui";
import { TiPlus } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { CiExport } from "react-icons/ci";

// Badge компонент
function Badge({ text, color = "green" }) {
  const colors = {
    green: { bg: "#d1fae5", color: "#10b981" },
    gg: { bg: "#40C4AA", color: "#fff" },

    blue: { bg: "#dbeafe", color: "#3b82f6" },
    yellow: { bg: "#fef3c7", color: "#f59e0b" },
    red: { bg: "#fee2e2", color: "#ef4444" },
  };

  return (
    <span
      style={{
        backgroundColor: colors[color].bg,
        color: colors[color].color,
        padding: "6px 12px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "600",
        whiteSpace: "nowrap",
      }}
    >
      • {text}
    </span>
  );
}

// TAB 1: Услуги
function ServicesTab() {
  const servicesData = [
    {
      id: 1,
      code: "YQ",
      service: "Услуга 6",
      name: "Топливный сбор",
      type: "Такса поставщика",
      percentage: "5%",
      status: "Активен",
    },
    {
      id: 2,
      code: "YR",
      service: "Услуга 5",
      name: "Сбор за оформление",
      type: "Наш сбор",
      percentage: "5%",
      status: "Активен",
    },
    {
      id: 3,
      code: "YR",
      service: "Услуга 2",
      name: "Сбор за оформление",
      type: "Маржа",
      percentage: "5%",
      status: "Активен",
    },
    {
      id: 4,
      code: "YR",
      service: "Услуга 3",
      name: "Сбор за оформление",
      type: "Такса поставщика",
      percentage: "5%",
      status: "Активен",
    },
    {
      id: 5,
      code: "XT",
      service: "Услуга 4",
      name: "Прочие таксы",
      type: "Такса поставщика",
      percentage: "5%",
      status: "Активен",
    },
  ];

  const servicesColumns = [
    {
      key: "code",
      label: "Код",
      render: (value) => <span style={{ fontWeight: "600" }}>{value}</span>,
    },
    { key: "service", label: "Услуга" },
    { key: "name", label: "Название" },
    { key: "type", label: "Тип" },
    { key: "percentage", label: "Наши сборы" },
    {
      key: "status",
      label: "Статус",
      render: (value) => <Badge text={value} color="green" />,
    },
  ];

  return (
    <div className={s.tabContent}>
      <UITable
        columns={servicesColumns}
        rows={servicesData}
        showCheckbox={false}
      />
    </div>
  );
}

// TAB 2: Таксы и сборы
function TaxesTab() {
  const taxesData = [
    {
      id: 1,
      service: "Авиа",
      needed: "Да",
      uses: "Да (маршрутные квитанции)",
      currency: "RUB",
      rounding: "до 1 / 10 / 100",
      status: "Активен",
    },
    {
      id: 2,
      service: "ЖД",
      needed: "Нет",
      uses: "Иногда (редко)",
      currency: "RUB",
      rounding: "до 1",
      status: "Активен",
    },
    {
      id: 3,
      service: "Отели",
      needed: "Нет",
      uses: "Да (ваучеры)",
      currency: "RUB",
      rounding: "до 1",
      status: "Активен",
    },
    {
      id: 4,
      service: "Трансфер",
      needed: "Нет",
      uses: "Да (локальные банки)",
      currency: "RUB",
      rounding: "до 1",
      status: "Активен",
    },
    {
      id: 5,
      service: "Страховки",
      needed: "Нет",
      uses: "Нет",
      currency: "RUB",
      rounding: "до 1",
      status: "Активен",
    },
    {
      id: 6,
      service: "Автобусы",
      needed: "Нет",
      uses: "Иногда",
      currency: "RUB",
      rounding: "до 1",
      status: "Активен",
    },
    {
      id: 7,
      service: "Таксы",
      needed: "Нет",
      uses: "Нет",
      currency: "RUB",
      rounding: "до 1",
      status: "Активен",
    },
    {
      id: 8,
      service: "Туры",
      needed: "Нет",
      uses: "Да (поддержания)",
      currency: "RUB",
      rounding: "до 1 / 10",
      status: "Активен",
    },
    {
      id: 9,
      service: "Виза",
      needed: "Нет",
      uses: "Нет",
      currency: "RUB",
      rounding: "до 1",
      status: "Активен",
    },
  ];

  const taxesColumns = [
    { key: "service", label: "Услуга" },
    { key: "needed", label: "Требуются таксы" },
    { key: "uses", label: "Использует шаблоны бланков" },
    { key: "currency", label: "Валюта по умолчанию" },
    { key: "rounding", label: "Округление" },
    {
      key: "status",
      label: "Статус",
      render: (value) => <Badge text={value} color="green" />,
    },
  ];

  return (
    <div className={s.tabContent}>
      <UITable columns={taxesColumns} rows={taxesData} showCheckbox={false} />
    </div>
  );
}

// TAB 3: Поставщики
function SuppliersTab() {
  const suppliersData = [
    {
      id: 1,
      name: "S7 Airlines",
      type: "Авиакомпания",
      service: "Авиа",
      currency: "RUB",
      template: "S7 Amadeus",
      ocr: "Да",
    },
    {
      id: 2,
      name: "Aeroflot",
      type: "Авиакомпания",
      service: "Авиа",
      currency: "EUR",
      template: "AFL TCH",
      ocr: "Да",
    },
    {
      id: 3,
      name: "Pegasus",
      type: "Авиакомпания",
      service: "Авиа",
      currency: "RUB",
      template: "Pegasus PDF",
      ocr: "Да",
    },
    {
      id: 4,
      name: "Booking.com",
      type: "Отели",
      service: "Отели",
      currency: "USD",
      template: "Booking Voucher",
      ocr: "Нет",
    },
    {
      id: 5,
      name: "Local Partner Antalya",
      type: "Локальный партнёр",
      service: "Трансфер/Отели",
      currency: "RUB",
      template: "Antalya Letter",
      ocr: "Да",
    },
  ];

  const suppliersColumns = [
    { key: "name", label: "Название" },
    { key: "type", label: "Тип" },
    { key: "service", label: "Основная услуга" },
    { key: "currency", label: "Валюта" },
    { key: "template", label: "Шаблон бланка" },
    { key: "ocr", label: "Использует OCR" },
  ];

  return (
    <div className={s.tabContent}>
      <UITable
        columns={suppliersColumns}
        rows={suppliersData}
        showCheckbox={false}
      />
    </div>
  );
}

// TAB 4: Шаблоны бланков
function TemplatesTab() {
  const templatesData = [
    {
      id: 1,
      name: "S7 Airlines",
      type: "Маршрутная",
      supplier: "S7 Airlines",
      format: "PDF",
      template: "S7 Amadeus",
      method: "OCR + Regex",
      status: "OK",
    },
    {
      id: 2,
      name: "Aeroflot TCH",
      type: "Маршрутная",
      supplier: "Aeroflot",
      format: "PDF",
      template: "AFL TCH",
      method: "Regex",
      status: "OK",
    },
    {
      id: 3,
      name: "Booking Voucher",
      type: "Ваучер",
      supplier: "Booking.com",
      format: "JPG",
      template: "Pegasus PDF",
      method: "OCR",
      status: "OK",
    },
    {
      id: 4,
      name: "Antalya Partner",
      type: "Письмо/таблица",
      supplier: "Local Partner",
      format: "XML/PDF",
      template: "Booking Voucher",
      method: "OCR",
      status: "OK",
    },
  ];

  const templatesColumns = [
    { key: "name", label: "Название" },
    { key: "type", label: "Тип бланка" },
    { key: "supplier", label: "Поставщик" },
    { key: "format", label: "Формат" },
    { key: "template", label: "Шаблон бланка" },
    { key: "method", label: "Метод разбора" },
    {
      key: "status",
      label: "Статус",
      render: (value) => <Badge text={value} color="gg" />,
    },
  ];

  return (
    <div className={s.tabContent}>
      <UITable
        columns={templatesColumns}
        rows={templatesData}
        showCheckbox={false}
      />
    </div>
  );
}

// TAB 5: Финансовые правила
function FinancialRulesTab() {
  const [rules, setRules] = useState([
    { service: "Авиа", comment: "защита" },
    { service: "Отели", comment: "высокие риски" },
    { service: "Трансфер", comment: "—" },
    { service: "Туры", comment: "гос.контракты" },
  ]);

  const [orgRules, setOrgRules] = useState([
    {
      org: "MegaTravel",
      type: "тариф",
      value: "фикс 2000",
      service: "Авиа",
      comment: "VIP",
    },
    {
      org: "VipGroup",
      type: "комиссия",
      value: "1%",
      service: "Все",
      comment: "—",
    },
    {
      org: "GovContract",
      type: "тариф",
      value: "скрыт",
      service: "Авиа/Туры",
      comment: "гос.тендер",
    },
  ]);

  return (
    <div className={s.tabContent}>
      <section className={s.rulesSection}>
        <h3>Общие правила маржинальности</h3>
        <table className={s.rulesTable}>
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, idx) => (
              <tr key={idx}>
                <td>{rule.service}</td>
                <td>{rule.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={s.rulesSection}>
        <div className={s.rulesSectionHeader}>
          <h3>Специальные правила по организациям</h3>
          <Button icon={TiPlus} size="sm">
            Добавить правило
          </Button>
        </div>
        <table className={s.rulesTable}>
          <thead>
            <tr>
              <th>Организация</th>
              <th>Тип</th>
              <th>Значение</th>
              <th>Услуга</th>
              <th>Комментарий</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {orgRules.map((rule, idx) => (
              <tr key={idx}>
                <td>{rule.org}</td>
                <td>{rule.type}</td>
                <td>{rule.value}</td>
                <td>{rule.service}</td>
                <td>{rule.comment}</td>
                <td>
                  <button className={s.editBtn}>
                    <MdEdit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={s.rulesSection}>
        <h3>Округление (глобальные финансовые правила)</h3>
        <div className={s.roundingOptions}>
          <div className={s.optionGroup}>
            <h4>Округление итога</h4>
            <div className={s.radioGroup}>
              <label>
                <input type="radio" name="total" value="1" defaultChecked />
                до 1
              </label>
              <label>
                <input type="radio" name="total" value="10" />
                до 10
              </label>
              <label>
                <input type="radio" name="total" value="100" />
                до 100
              </label>
              <label>
                <input type="radio" name="total" value="verso" />
                верс
              </label>
              <label>
                <input type="radio" name="total" value="вниз" />
                вниз
              </label>
              <label>
                <input type="radio" name="total" value="math" defaultChecked />
                математически
              </label>
            </div>
          </div>

          <div className={s.optionGroup}>
            <h4>Округление такс</h4>
            <div className={s.radioGroup}>
              <label>
                <input type="radio" name="tax" value="1" defaultChecked />
                до 1
              </label>
              <label>
                <input type="radio" name="tax" value="only_up" />
                только верх
              </label>
              <label>
                <input type="radio" name="tax" value="only_down" />
                только вниз
              </label>
            </div>
          </div>

          <div className={s.optionGroup}>
            <h4>Округление сборов</h4>
            <div className={s.radioGroup}>
              <label>
                <input type="radio" name="fee" value="1" defaultChecked />
                до 1
              </label>
              <label>
                <input type="radio" name="fee" value="only_up" />
                только верх
              </label>
              <label>
                <input type="radio" name="fee" value="only_down" />
                только вниз
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// TAB 6: Валюты и курсы
function CurrenciesTab() {
  const [currencies, setCurrencies] = useState([
    {
      code: "RUB",
      name: "Российский рубль",
      symbol: "₽",
      decimals: 2,
      uses: "Все",
      status: "Активна",
      action: "Редактировать",
    },
    {
      code: "USD",
      name: "Доллар США",
      symbol: "$",
      decimals: 2,
      uses: "Авиа/Отели/Туры",
      status: "Активна",
      action: "Редактировать",
    },
    {
      code: "EUR",
      name: "Евро",
      symbol: "€",
      decimals: 2,
      uses: "Авиа/Отели",
      status: "Активна",
      action: "Редактировать",
    },
    {
      code: "KGS",
      name: "Сом",
      symbol: "сом",
      decimals: 2,
      uses: "Локальные услуги",
      status: "Активна",
      action: "Редактировать",
    },
    {
      code: "KZT",
      name: "Тенге",
      symbol: "₸",
      decimals: 2,
      uses: "Редко",
      status: "Не активна",
      action: "Включить",
    },
  ]);

  const [rates, setRates] = useState([
    {
      currency: "USD",
      rate: "92.50",
      source: "ЦБ РФ",
      date: "15.11.2025",
      update: "Авто ежедневно",
      action: "Редактировать",
    },
    {
      currency: "EUR",
      rate: "100.20",
      source: "ЦБ РФ",
      date: "15.11.2025",
      update: "Авто ежедневно",
      action: "Редактировать",
    },
    {
      currency: "KGS",
      rate: "1.02",
      source: "Ручной",
      date: "14.11.2025",
      update: "Ручное",
      action: "Редактировать",
    },
    {
      currency: "KZT",
      rate: "0.19",
      source: "ЦБ РФ",
      date: "13.11.2025",
      update: "Авто",
      action: "Редактировать",
    },
    {
      currency: "TRY",
      rate: "3.27",
      source: "Ручной",
      date: "—",
      update: "Нет обновлений",
      action: "Назначить",
    },
  ]);

  const currenciesColumns = [
    { key: "code", label: "Код" },
    { key: "name", label: "Название" },
    { key: "symbol", label: "Символ" },
    { key: "decimals", label: "Знаков после запятой" },
    { key: "uses", label: "Используется в услугах" },
    {
      key: "status",
      label: "Статус",
      render: (value) => (
        <Badge text={value} color={value === "Активна" ? "green" : "yellow"} />
      ),
    },
    {
      key: "action",
      label: "Действие",
      render: (value) => (
        <a href="#" style={{ color: "#3b82f6", textDecoration: "none" }}>
          {value}
        </a>
      ),
    },
  ];

  const ratesColumns = [
    { key: "currency", label: "Валюта" },
    {
      key: "rate",
      label: "Курс → RUB",
      render: (value) => <span style={{ fontWeight: "600" }}>{value}</span>,
    },
    { key: "source", label: "Источник" },
    { key: "date", label: "Дата обновления" },
    { key: "update", label: "Обновление" },
    {
      key: "action",
      label: "Действия",
      render: (value) => (
        <a href="#" style={{ color: "#3b82f6", textDecoration: "none" }}>
          {value}
        </a>
      ),
    },
  ];

  return (
    <div className={s.tabContent}>
      <section className={s.currencySection}>
        <h3>Настроенные валюты системы</h3>
        <p className={s.subtitle}>Справочник валют, используемые в CRM</p>
        <UITable
          columns={currenciesColumns}
          rows={currencies}
          showCheckbox={false}
        />
      </section>

      <section className={s.currencySection}>
        <div className={s.ratesSectionHeader}>
          <div>
            <h3>Курсы валют</h3>
            <p className={s.subtitle}>Массив действующих курсов для расчётов</p>
          </div>
          <Button icon={TiPlus}>Добавить курс</Button>
        </div>
        <UITable columns={ratesColumns} rows={rates} showCheckbox={false} />
      </section>

      <section className={s.currencySection}>
        <div className={s.historySectionHeader}>
          <div className={s.colum}>
            <h3>История изменений валют и курсов</h3>
            <p className={s.subtitle}>Журнал всех изменений</p>
          </div>
          <Button variant="outline" icon={CiExport}>
            Экспорт
          </Button>
        </div>
        <table className={s.historyTable}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Валета</th>
              <th>Было</th>
              <th>Стало</th>
              <th>Источник</th>
              <th>Пользователь</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12.11</td>
              <td>USD</td>
              <td>91.90</td>
              <td style={{ color: "#10b981", fontWeight: "600" }}>92.50</td>
              <td>ЦБ РФ</td>
              <td>Авто</td>
            </tr>
            <tr>
              <td>10.11</td>
              <td>EUR</td>
              <td>98.7</td>
              <td style={{ color: "#10b981", fontWeight: "600" }}>100.2</td>
              <td>ЦБ РФ</td>
              <td>Авто</td>
            </tr>
            <tr>
              <td>09.11</td>
              <td>TRY</td>
              <td>рублей</td>
              <td style={{ color: "#ef4444" }}>рублей</td>
              <td>рублей</td>
              <td>Админ</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default function Directory() {
  const [activeTab, setActiveTab] = useState("services");

  const tabs = [
    { id: "services", label: "Услуги" },
    { id: "taxes", label: "Таксы и сборы" },
    { id: "suppliers", label: "Поставщики" },
    { id: "templates", label: "Шаблоны бланков" },
    { id: "rules", label: "Фин.правила" },
    { id: "currencies", label: "Валюты и курсы" },
  ];

  return (
    <div className={s.directory}>
      {/* Tabs Navigation */}
      <div className={s.tabsNav}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "bgblue" : "outline"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={s.tabsContainer}>
        {activeTab === "services" && <TaxesTab />}
        {activeTab === "taxes" && <ServicesTab />}
        {activeTab === "suppliers" && <SuppliersTab />}
        {activeTab === "templates" && <TemplatesTab />}
        {activeTab === "rules" && <FinancialRulesTab />}
        {activeTab === "currencies" && <CurrenciesTab />}
      </div>
    </div>
  );
}
