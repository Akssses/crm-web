"use client";
import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Textarea } from "@/ui";
import { MdAttachFile, MdPerson, MdBusiness } from "react-icons/md";
import PassportMaskingField from "./PassportMaskingField";
import DuplicateWarning from "./DuplicateWarning";
import VisaInsuranceManager from "./VisaInsuranceManager";
import s from "../styles/AddClientModal.module.scss";

export default function AddClientModal({ isOpen, onClose, onSubmit }) {
  const [clientType, setClientType] = useState("individual");
  const [selectedTags, setSelectedTags] = useState(["VIP"]);
  const [status, setStatus] = useState("active");
  const [blacklistReason, setBlacklistReason] = useState("");
  const [passport, setPassport] = useState("");
  const [duplicates, setDuplicates] = useState([]);
  
  // Mock duplicate check
  const checkDuplicates = (field, value) => {
    if (value === "anna.petrova@gmail.com") {
      setDuplicates([
        { id: 1, name: "Анна Петрова", matchType: "email", additionalInfo: "ID: 12345" }
      ]);
    } else {
      setDuplicates([]);
    }
  };

  const tags = ["VIP", "Срочно", "Новичок", "Проблемный", "Частые поездки", "Корпоративный"];
  
  const statusOptions = [
    { value: "active", label: "Активный" },
    { value: "inactive", label: "Не активный" },
    { value: "blacklist", label: "Чёрный список" },
    { value: "vip", label: "VIP" },
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleSubmit = () => {
    onSubmit?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Новый клиент"
      position="right"
      width="800px"
    >
      <div className={s.modalContent}>
        {/* Duplicate Warning */}
        <DuplicateWarning 
          duplicates={duplicates} 
          onViewClient={(id) => console.log("View client", id)} 
        />

        {/* Client Type Tabs */}
        <div className={s.tabs}>
          <Button
            variant={clientType === "individual" ? "primary" : "outline"}
            onClick={() => setClientType("individual")}
            className={s.tabButton}
          >
            Физическое лицо
          </Button>
          <Button
            variant={clientType === "legal" ? "primary" : "outline"}
            onClick={() => setClientType("legal")}
            className={s.tabButton}
          >
            Юридическое лицо
          </Button>
        </div>

        {/* Avatar/Logo Section */}
        <div className={s.avatarSection}>
          <div className={s.avatarPlaceholder}>
            <MdPerson size={32} />
          </div>
          <div className={s.avatarActions}>
            <Button variant="outline" size="sm">
              {clientType === "individual" ? "Загрузить фото" : "Загрузить логотип"}
            </Button>
            <Select
              value={status}
              options={statusOptions}
              onChange={(e) => setStatus(e.target.value)}
              className={s.statusSelect}
            />
          </div>
        </div>

        {status === "blacklist" && (
          <div className={s.blacklistReason}>
            <Input
              label="Причина добавления в ЧС"
              value={blacklistReason}
              onChange={(e) => setBlacklistReason(e.target.value)}
              placeholder="Укажите причину..."
              required
            />
          </div>
        )}

        {/* Form Fields */}
        <div className={s.formGrid}>
          <div className={s.column}>
            <Input
              label="ФИО"
              placeholder="Введите ФИО"
              onChange={() => {}}
            />
            <Input
              label="Контактный e-mail"
              placeholder="Введите email"
              onChange={(e) => checkDuplicates('email', e.target.value)}
            />
            <Select
              label="Пол"
              placeholder="Выберите пол"
              options={[
                { value: "male", label: "Мужской" },
                { value: "female", label: "Женский" },
              ]}
              onChange={() => {}}
            />
            <PassportMaskingField
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
              label="Паспорт / ИД"
            />
          </div>
          <div className={s.column}>
            <Input
              label="Дата рождения"
              placeholder="dd.mm.yyyy"
              onChange={() => {}}
            />
            <div className={s.phoneInput}>
              <span className={s.phoneLabel}>Контактный номер телефона</span>
              <div className={s.phoneInputRow}>
                <Select
                  value="+996"
                  options={[
                    { value: "+996", label: "+996" },
                    { value: "+7", label: "+7" },
                  ]}
                  onChange={() => {}}
                  className={s.countryCode}
                />
                <Input
                  placeholder="Введите номер"
                  className={s.phoneNumber}
                  onChange={() => {}}
                />
              </div>
            </div>
            <Select
              label="Гражданство"
              placeholder="Выберите страну"
              options={[
                { value: "kg", label: "Кыргызстан" },
                { value: "ru", label: "Россия" },
              ]}
              onChange={() => {}}
            />
            <Select
              label="Ответственный оператор"
              value="me"
              options={[
                { value: "me", label: "Андрей Клауд (Я)" },
                { value: "other", label: "Другой оператор" },
              ]}
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Visas and Insurance */}
        <div className={s.section}>
          <h4 className={s.sectionTitle}>Визы и страховки</h4>
          <VisaInsuranceManager />
        </div>

        {/* Comment - Full Width */}
        <Textarea
          label="Комментарий"
          placeholder="Введите комментарий"
          className={s.fullWidthTextarea}
          onChange={() => {}}
        />

        {/* Tags */}
        <div className={s.tagsSection}>
          <span className={s.tagsLabel}>Теги</span>
          <div className={s.tags}>
            {tags.map((tag) => (
              <button
                key={tag}
                className={`${s.tag} ${
                  selectedTags.includes(tag) ? s.tagActive : ""
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={s.actions}>
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Создать клиента
          </Button>
        </div>
      </div>
    </Modal>
  );
}


