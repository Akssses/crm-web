import React from "react";
import s from "../../styles/AddOrgModal.module.scss";
import { Input, Select, Button, Textarea } from "@/ui";
import { FaRegUser } from "react-icons/fa";
import { GoDownload } from "react-icons/go";

export default function Step3({
  formData,
  inn,
  onInputChange,
  onSubmit,
  onClose,
}) {
  return (
    <>
      <div className={s.header}>
        <div className={s.headerIcon}>
          <FaRegUser size={24} />
        </div>
        <Button icon={GoDownload} size="sm" variant="outline">
          Логотип организации
        </Button>
      </div>
      <div className={s.section}>
        <Input
          label="Полное название"
          placeholder="Введите полное название"
          value={formData.fullName}
          onChange={(val) => onInputChange("fullName", val)}
        />
      </div>
      <div className={s.twoColumns}>
        <div>
          <Input
            label="Краткое название"
            placeholder="Введите название"
            value={formData.shortName}
            onChange={(val) => onInputChange("shortName", val)}
          />
        </div>
        <div>
          <Input
            label="Марка"
            placeholder="Выберите марку"
            value={formData.currency}
            onChange={(val) => onInputChange("currency", val)}
          />
        </div>
      </div>
      <div className={s.twoColumns}>
        <Input
          label="Контактный e-mail"
          placeholder="john@example.com"
          type="email"
          value={formData.email}
          onChange={(val) => onInputChange("email", val)}
        />

        <Input
          label="Контактный номер телефона"
          placeholder="+1 (303) 555-0105"
          type="tel"
          value={formData.phone}
          onChange={(val) => onInputChange("phone", val)}
        />
      </div>

      <div className={s.twoColumns}>
        <Select
          label="Основная валюта"
          options={[
            { label: "Рублей", value: "rub" },
            { label: "Доллары", value: "usd" },
          ]}
          value={formData.currency}
          onChange={(val) => onInputChange("currency", val)}
          placeholder="Выберите валюту"
        />
        <Select
          label="Бухгалтерия"
          options={[
            { label: "1С:Бухгалтерия", value: "1c" },
            { label: "Другое", value: "other" },
          ]}
          value={formData.country}
          onChange={(val) => onInputChange("country", val)}
          placeholder="Выберите тип"
        />
      </div>
      <p className={s.sectionTitle}>Банковские реквизиты</p>
      <div className={s.twoColumns}>
        <Input
          label="Основной счетчик"
          placeholder="Выберите счетчик"
          value={formData.accountHolder}
          onChange={(val) => onInputChange("accountHolder", val)}
        />
        <Input
          label="Ответственный сотрудник"
          placeholder="Ответственный сотрудник"
          value={formData.bankName}
          onChange={(val) => onInputChange("bankName", val)}
        />
      </div>

      <div className={s.twoColumns}>
        <Input placeholder="Введите ИНН" label="ИНН" value={inn} disabled />
        <Input
          label="КПП"
          placeholder="Введите КПП"
          value={formData.kpp}
          onChange={(val) => onInputChange("kpp", val)}
        />
      </div>

      <div className={s.twoColumns}>
        <Input
          label="ОГРН"
          placeholder="Введите ОГРН"
          value={formData.ogrn}
          onChange={(val) => onInputChange("ogrn", val)}
        />
        <Input
          label="ОКПО"
          placeholder="Введите ОКПО"
          value={formData.okpo}
          onChange={(val) => onInputChange("okpo", val)}
        />
      </div>

      <div className={s.twoColumns}>
        <Input
          label="Юр. адрес"
          placeholder="Введите юр. адрес"
          value={formData.legalAddress}
          onChange={(val) => onInputChange("legalAddress", val)}
        />
        <Input
          label="Фактический адрес"
          placeholder="Введите адрес"
          value={formData.actualAddress}
          onChange={(val) => onInputChange("actualAddress", val)}
        />
      </div>

      <div className={s.twoColumns}>
        <Input
          label="Расчетный счет"
          placeholder="Введите номер счета"
          value={formData.accountNumber}
          onChange={(val) => onInputChange("accountNumber", val)}
        />
        <Input
          label="Корр. счет"
          placeholder="Введите корр. счет"
          value={formData.corrAccountNumber}
          onChange={(val) => onInputChange("corrAccountNumber", val)}
        />
      </div>

      <div className={s.twoColumns}>
        <Input
          label="БИК"
          placeholder="Введите БИК"
          value={formData.bik}
          onChange={(val) => onInputChange("bik", val)}
        />
        <Input
          label="Банк"
          placeholder="Введите банк"
          value={formData.correspondent}
          onChange={(val) => onInputChange("correspondent", val)}
        />
      </div>

      <Textarea
        label="Описание"
        placeholder="Descriptions..."
        value={formData.description}
        onChange={(val) => onInputChange("description", val)}
        minRows={4}
      />

      <div className={s.actions}>
        <Button variant="outline" onClick={onClose}>
          Отмена
        </Button>
        <Button onClick={onSubmit}>Далее</Button>
      </div>
    </>
  );
}
