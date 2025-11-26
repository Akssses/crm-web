"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Container, Button, Input, Select, Textarea } from "@/ui";
import { FaSave, FaPlus, FaHistory, FaCode } from "react-icons/fa";
import s from "../../styles/DocumentTemplates.module.scss";

export default function DocumentTemplates() {
  const router = useRouter();
  const pathname = usePathname();
  const [templates, setTemplates] = useState([
    { id: 1, type: "Счёт", version: 3, isActive: true },
    { id: 2, type: "Акт", version: 2, isActive: true },
    { id: 3, type: "КП", version: 1, isActive: true },
    { id: 4, type: "Договор", version: 1, isActive: true },
    { id: 5, type: "Приложение", version: 1, isActive: false },
    { id: 6, type: "Документы госконтракта", version: 1, isActive: false },
  ]);
  
  // По умолчанию открываем шаблон "Счёт"
  const defaultTemplate = templates.find((t) => t.type === "Счёт");
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplate || null);

  const [templateSettings, setTemplateSettings] = useState({
    numbering: {
      mask: "ПСЦ-2025-###",
      autoIncrement: true,
    },
    logos: {
      invoice: null,
      act: null,
      contract: null,
    },
    signatures: {
      director: null,
      accountant: null,
    },
  });

  const handleSave = () => {
    console.log("Сохранение шаблонов:", { selectedTemplate, templateSettings });
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Обновляем URL с хэшем
    const templateType = template.type.toLowerCase();
    const hash = `#редактирование:${templateType}`;
    router.push(`${pathname}${hash}`, { scroll: false });
  };

  // Обработка хэша при загрузке страницы
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#редактирование:")) {
        const templateType = hash.replace("#редактирование:", "");
        const template = templates.find(
          (t) => t.type.toLowerCase() === templateType
        );
        if (template) {
          setSelectedTemplate(template);
        }
      } else {
        // Если нет хэша, открываем шаблон "Счёт" по умолчанию
        const defaultTemplate = templates.find((t) => t.type === "Счёт");
        if (defaultTemplate) {
          setSelectedTemplate(defaultTemplate);
        }
      }
    }
  }, [templates]);

  return (
    <div className={s.main}>
      <Container size="full">
        <div className={s.header}>
          <h4>Шаблоны документов и подписи</h4>
          <Button variant="primary" icon={FaSave} onClick={handleSave}>
            Сохранить изменения
          </Button>
        </div>
      </Container>

      {/* Список шаблонов */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Список шаблонов</h5>
          <div className={s.templatesGrid}>
            {templates.map((template) => (
              <div
                key={template.id}
                className={`${s.templateCard} ${selectedTemplate?.id === template.id ? s.active : ""}`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className={s.templateHeader}>
                  <span className={s.templateType}>{template.type}</span>
                  {template.isActive && (
                    <span className={s.activeBadge}>Активен</span>
                  )}
                </div>
                <div className={s.templateInfo}>
                  <span>Версия: {template.version}</span>
                  <Button variant="blue" size="sm" icon={FaHistory}>
                    История
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Редактирование шаблона */}
      {selectedTemplate && (
        <Container size="full">
          <div className={s.section}>
            <div className={s.sectionHeader}>
              <h5 className={s.sectionTitle}>Редактирование: {selectedTemplate.type}</h5>
              <div className={s.templateActions}>
                <Button variant="outline" size="sm" icon={FaHistory}>
                  История версий
                </Button>
                <Button variant="bgblue" size="sm" icon={FaCode}>
                  Редактировать HTML
                </Button>
              </div>
            </div>
            <div className={s.editor}>
              <div className={s.variablesPanel}>
                <h6>Доступные переменные:</h6>
                <div className={s.variablesList}>
                  <span className={s.variable}>{"{{client_name}}"}</span>
                  <span className={s.variable}>{"{{org_name}}"}</span>
                  <span className={s.variable}>{"{{price}}"}</span>
                  <span className={s.variable}>{"{{date}}"}</span>
                  <span className={s.variable}>{"{{signature}}"}</span>
                  <span className={s.variable}>{"{{order_number}}"}</span>
                </div>
              </div>
              <div className={s.editorArea}>
                <Textarea
                  label=""
                  placeholder="HTML/текстовый редактор шаблона..."
                  minRows={15}
                  maxRows={30}
                />
              </div>
            </div>
          </div>
        </Container>
      )}

      {/* Управление логотипами */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Управление логотипами и подписями</h5>
          <div className={s.logosGrid}>
            <div className={s.logoItem}>
              <label>Логотип для счёта</label>
              <div className={s.uploadArea}>
                <input type="file" accept="image/*" />
                <span>Загрузить логотип</span>
              </div>
            </div>
            <div className={s.logoItem}>
              <label>Логотип для акта</label>
              <div className={s.uploadArea}>
                <input type="file" accept="image/*" />
                <span>Загрузить логотип</span>
              </div>
            </div>
            <div className={s.logoItem}>
              <label>Печать</label>
              <div className={s.uploadArea}>
                <input type="file" accept="image/*" />
                <span>Загрузить печать</span>
              </div>
            </div>
            <div className={s.logoItem}>
              <label>Подпись руководителя</label>
              <div className={s.uploadArea}>
                <input type="file" accept="image/*" />
                <span>Загрузить подпись</span>
              </div>
            </div>
            <div className={s.logoItem}>
              <label>Подпись главбуха</label>
              <div className={s.uploadArea}>
                <input type="file" accept="image/*" />
                <span>Загрузить подпись</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Нумерация документов */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Нумерация документов</h5>
          <div className={s.grid}>
            <Input
              label="Маска нумерации"
              placeholder="ПСЦ-2025-###"
              value={templateSettings.numbering.mask}
              onChange={(value) =>
                setTemplateSettings((prev) => ({
                  ...prev,
                  numbering: { ...prev.numbering, mask: value },
                }))
              }
            />
            <div className={s.switchContainer}>
              <label className={s.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={templateSettings.numbering.autoIncrement}
                  onChange={(e) =>
                    setTemplateSettings((prev) => ({
                      ...prev,
                      numbering: {
                        ...prev.numbering,
                        autoIncrement: e.target.checked,
                      },
                    }))
                  }
                />
                <span>Автоинкремент</span>
              </label>
            </div>
          </div>
          <p className={s.helpText}>
            Пример: ПСЦ-2025-### где ### будет заменено на порядковый номер
          </p>
        </div>
      </Container>
    </div>
  );
}

