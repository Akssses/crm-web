"use client";
import React, { useState } from "react";
import { Modal, Input, Select, Button, Textarea } from "@/ui";
import { MdAttachFile, MdPerson, MdBusiness } from "react-icons/md";
import s from "../styles/AddClientModal.module.scss";

export default function AddClientModal({ isOpen, onClose, onSubmit }) {
  const [clientType, setClientType] = useState("individual");
  const [selectedTags, setSelectedTags] = useState(["VIP"]);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: "документ.jpg", type: "JPG", size: "1.5 MB" },
  ]);

  const tags = ["VIP", "Срочно", "Новичок", "Проблемный"];

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        // Если тег уже выбран, удаляем его из выбранных
        return prev.filter((t) => t !== tag);
      } else {
        // Если тег не выбран, добавляем его в выбранные
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
      width="600px"
    >
      <div className={s.modalContent}>
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
          <Button variant="outline" size="sm">
            {clientType === "individual" ? "Автарка" : "Логотип организации"}
          </Button>
        </div>

        {/* Form Fields */}
        <div className={s.formGrid}>
          <div className={s.column}>
            <Input
              label="ФИО"
              value="John"
              onChange={() => {}}
              placeholder="Введите ФИО"
            />
            <Input
              label="Контактный e-mail"
              value="johndoe@mail.com"
              onChange={() => {}}
              placeholder="Введите email"
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
                { value: "me", label: "Адрей Клауд (Я)" },
                { value: "other", label: "Другой оператор" },
              ]}
              onChange={() => {}}
            />
          </div>
          <div className={s.column}>
            <Input
              label="Дата рождения"
              placeholder="mm/dd/yyyy"
              onChange={() => {}}
            />
            <div className={s.phoneInput}>
              <span className={s.phoneLabel}>Контактный номер телефона</span>
              <div className={s.phoneInputRow}>
                <Select
                  value="+1"
                  options={[
                    { value: "+1", label: "+1" },
                    { value: "+996", label: "+996" },
                    { value: "+7", label: "+7" },
                  ]}
                  onChange={() => {}}
                  className={s.countryCode}
                />
                <Input
                  value="(303) 555-0105"
                  onChange={() => {}}
                  placeholder="Введите номер"
                  className={s.phoneNumber}
                />
              </div>
            </div>
            <Select
              label="Организация"
              placeholder="Выберите организацию"
              options={[
                { value: "org1", label: "Организация 1" },
                { value: "org2", label: "Организация 2" },
              ]}
              onChange={() => {}}
            />
            <Select
              label="Источник"
              value="telegram"
              options={[
                { value: "telegram", label: "Telegram" },
                { value: "website", label: "Сайт" },
                { value: "phone", label: "Телефон" },
              ]}
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Comment - Full Width */}
        <Textarea
          label="Комментарий"
          value="Descriptions..."
          onChange={() => {}}
          placeholder="Введите комментарий"
          className={s.fullWidthTextarea}
        />

        {/* Document Upload */}
        <div className={s.documentsSection}>
          <Button variant="outline" icon={MdAttachFile}>
            Загрузить документы
          </Button>
          {uploadedFiles.map((file) => (
            <div key={file.id} className={s.fileItem}>
              <span className={s.fileName}>{file.name}</span>
              <span className={s.fileInfo}>
                {file.type}, {file.size}
              </span>
            </div>
          ))}
        </div>

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
            Создать
          </Button>
        </div>
      </div>
    </Modal>
  );
}

