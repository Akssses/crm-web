import React, { useState } from "react";
import { Button, Input, Select, Textarea } from "@/ui";
import { 
  MdCloudUpload, 
  MdClose, 
  MdCheck, 
  MdDescription, 
  MdPictureAsPdf, 
  MdImage,
  MdAdd,
  MdAssignment,
  MdLabel,
  MdAttachMoney,
  MdAttachFile
} from "react-icons/md";
import s from "../../styles/Step3.module.scss";

export default function Step3({ onBack, onNext }) {
  const [requirements, setRequirements] = useState({
    invoice: false,
    contract: false,
    visa: false,
    urgent: false,
    sign: false,
  });

  const [tags, setTags] = useState([
    { id: 1, label: "VIP", color: "purple" },
    { id: 2, label: "Горит", color: "red" },
    { id: 3, label: "Новый", color: "green" },
    { id: 4, label: "Приоритет", color: "blue" },
  ]);

  const [files, setFiles] = useState([
    { id: 1, name: "Техническое_задание.pdf", size: "2.4 MB", type: "pdf", status: "Загружен" },
    { id: 2, name: "Паспорт_сотрудника.docx", size: "1.1 MB", type: "doc", status: "Загружен" },
    { id: 3, name: "Приглашение.jpg", size: "856 KB", type: "img", status: "Загружен" },
  ]);

  const handleRequirementChange = (key) => {
    setRequirements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const removeTag = (id) => {
    setTags(prev => prev.filter(t => t.id !== id));
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className={s.container}>
      {/* Requirements */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>
          Требования
        </h3>
        <div className={s.checkboxGroup}>
          <label className={s.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={requirements.invoice} 
              onChange={() => handleRequirementChange('invoice')} 
            />
            Нужен счёт
          </label>
          <label className={s.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={requirements.urgent} 
              onChange={() => handleRequirementChange('urgent')} 
            />
            Срочно
          </label>
          <label className={s.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={requirements.contract} 
              onChange={() => handleRequirementChange('contract')} 
            />
            Нужен договор
          </label>
          <label className={s.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={requirements.sign} 
              onChange={() => handleRequirementChange('sign')} 
            />
            Нужна ЭЦП
          </label>
          <label className={s.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={requirements.visa} 
              onChange={() => handleRequirementChange('visa')} 
            />
            Нужна виза
          </label>
        </div>
      </div>

      {/* Tags and SLA */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>
          Теги и SLA
        </h3>
        <div>
          <span className={s.label}>Метки</span>
          <div className={s.tagsGroup}>
            {tags.map(tag => (
              <div key={tag.id} className={`${s.tag} ${s[tag.color]}`}>
                {tag.label}
                <span className={s.removeTag} onClick={() => removeTag(tag.id)}>
                  <MdClose size={12} />
                </span>
              </div>
            ))}
            <div className={`${s.tag} ${s.gray}`}>
              <MdAdd size={14} /> Добавить тег
            </div>
          </div>
        </div>
        
        <div>
          <span className={s.label}>SLA</span>
          <Select 
            options={[{ value: "30", label: "Ответ в течение 30 мин" }]} 
            defaultValue="30"
            fullWidth
          />
        </div>
      </div>

      {/* Budget */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>
          Бюджет
        </h3>
        <div className={s.budgetRow}>
          <div>
            <span className={s.label}>Бюджет</span>
            <Input placeholder="Введите сумму" fullWidth />
          </div>
          <div>
            <span className={s.label}>Валюта</span>
            <Select 
              options={[{ value: "KGS", label: "KGS" }, { value: "RUB", label: "RUB" }, { value: "USD", label: "USD" }]} 
              defaultValue="KGS"
              fullWidth
            />
          </div>
        </div>
        <div>
          <span className={s.label}>Условия</span>
          <Textarea placeholder="например, отели 3-4*, loyalty, без виз" rows={3} fullWidth />
        </div>
      </div>

      {/* Files */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>
          Файлы
        </h3>
        <div className={s.fileUploadArea}>
          <MdCloudUpload className={s.uploadIcon} />
          <div>
            <div className={s.uploadText}>Перетащите файлы или выберите с компьютера</div>
          </div>
          <Button variant="primary">Выбрать файлы</Button>
        </div>

        <div className={s.fileList}>
          {files.map(file => (
            <div key={file.id} className={s.fileItem}>
              <div className={s.fileInfo}>
                <div className={`${s.fileIcon} ${s[file.type]}`}>
                  {file.type === 'pdf' ? <MdPictureAsPdf /> : file.type === 'img' ? <MdImage /> : <MdDescription />}
                </div>
                <div>
                  <span className={s.fileName}>{file.name}</span>
                  <span className={s.fileSize}>{file.size}</span>
                </div>
              </div>
              <div className={s.fileStatus}>
                <span className={s.statusText}>
                  <MdCheck /> {file.status}
                </span>
                <span className={s.removeFile} onClick={() => removeFile(file.id)}>
                  <MdClose />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
