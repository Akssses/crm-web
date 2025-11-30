import React from "react";
import { Container, Button, Input, Select, Textarea } from "@/ui";
import {
  IoSearchOutline,
  IoAdd,
  IoPeopleOutline,
  IoDocumentTextOutline,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoEllipsisVertical,
} from "react-icons/io5";
import { MdBusiness } from "react-icons/md";
import s from "../../styles/Step1.module.scss";

const OPERATOR_OPTIONS = [
  { value: "", label: "Выберите оператора" },
  { value: "1", label: "Айсулуу М." },
  { value: "2", label: "Мария К." },
  { value: "3", label: "Андрей К." },
];

const SOURCE_OPTIONS = [
  { value: "", label: "Выберите источник" },
  { value: "phone", label: "WhatsApp" },
  { value: "email", label: "Email" },
  { value: "telegram", label: "Telegram" },
];

const PASSENGERS = [
  {
    id: 1,
    name: "Иванов Петр Сергеевич",
    type: "Взрослый",
    avatar: "M",
    avatarColor: "#3B82F6",
    docStatus: "ok",
  },
  {
    id: 2,
    name: "Иванова Мария Петровна",
    type: "Взрослый",
    avatar: "Ж",
    avatarColor: "#EC4899",
    docStatus: "ok",
  },
  {
    id: 3,
    name: "Иванов Иван Петрович",
    type: "Ребёнок (8 лет)",
    avatar: "И",
    avatarColor: "#8B5CF6",
    docStatus: "ok",
  },
  {
    id: 4,
    name: "Сидоров Алексей Владимирович",
    type: "Сотрудник орг.",
    avatar: "С",
    avatarColor: "#3B82F6",
    docStatus: "missing",
  },
  {
    id: 5,
    name: "Петров Дмитрий Игоревич",
    type: "Взрослый",
    avatar: "П",
    avatarColor: "#3B82F6",
    docStatus: "ok",
  },
  {
    id: 6,
    name: "Козлова Анна Сергеевна",
    type: "Взрослый",
    avatar: "К",
    avatarColor: "#EC4899",
    docStatus: "ok",
  },
  {
    id: 7,
    name: "Смирнов Максим Александрович",
    type: "Взрослый",
    avatar: "С",
    avatarColor: "#3B82F6",
    docStatus: "ok",
  },
  {
    id: 8,
    name: "Новиков Артем Дмитриевич",
    type: "Взрослый",
    avatar: "Н",
    avatarColor: "#3B82F6",
    docStatus: "missing",
  },
];

export default function Step1({ selectedClient }) {
  return (
    <>
      {/* Client Selection */}
      <Container size="full" className={s.section}>
        <h3 className={s.sectionTitle}>Выбор клиента</h3>
        <div className={s.searchFields}>
          <Input
            placeholder="По ФИО / телефону / email / ID"
            icon={IoSearchOutline}
            className={s.searchInput}
          />
          <Input
            placeholder="По ИНН или названию компании"
            icon={MdBusiness}
            className={s.searchInput}
          />
        </div>
        <div className={s.actionButtons}>
          <Button variant="outline" size="sm" icon={IoAdd}>
            Создать нового клиента
          </Button>
          <Button variant="outline" size="sm" icon={IoAdd}>
            Добавить организацию вручную
          </Button>
        </div>

        {selectedClient && (
          <div className={s.clientCard}>
            <div className={s.clientAvatar}>ИП</div>
            <div className={s.clientInfo}>
              <div className={s.clientName}>{selectedClient.name}</div>
              <div className={s.clientContacts}>
                <span>{selectedClient.phone}</span>
                <span>{selectedClient.email}</span>
              </div>
              <div className={s.clientOrg}>{selectedClient.organization}</div>
              <div className={s.clientInn}>{selectedClient.inn}</div>
            </div>
            <div className={s.clientTags}>
              {selectedClient.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`${s.tag} ${
                    tag === "VIP"
                      ? s.tagYellow
                      : tag === "В работе"
                      ? s.tagBlue
                      : s.tagGreen
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* Passengers */}
      <Container size="full" className={s.section}>
        <h3 className={s.sectionTitle}>Пассажиры в заявке</h3>
        <div className={s.passengerActions}>
          <Button variant="primary" size="sm" icon={IoAdd}>
            Добавить пассажира
          </Button>
          <Button variant="outline" size="sm" icon={IoPeopleOutline}>
            Из сотрудников организации
          </Button>
          <Button variant="outline" size="sm" icon={IoPeopleOutline}>
            Добавить группу пассажиров
          </Button>
          <Button variant="outline" size="sm" icon={IoDocumentTextOutline}>
            Импортировать (Excel/CSV)
          </Button>
        </div>

        <div className={s.passengersHeader}>
          <span className={s.passengersCount}>
            Добавленные пассажиры ({PASSENGERS.length})
          </span>
          <button className={s.clearLink}>Очистить список</button>
        </div>

        <div className={s.passengersList}>
          {PASSENGERS.map((passenger) => (
            <div key={passenger.id} className={s.passengerItem}>
              <div
                className={s.passengerAvatar}
                style={{ background: passenger.avatarColor }}
              >
                {passenger.avatar}
              </div>
              <div className={s.passengerInfo}>
                <div className={s.passengerName}>{passenger.name}</div>
                <div className={s.passengerMeta}>
                  <span className={s.passengerType}>{passenger.type}</span>
                  <span
                    className={`${s.docStatus} ${
                      passenger.docStatus === "ok" ? s.docOk : s.docMissing
                    }`}
                  >
                    {passenger.docStatus === "ok" ? (
                      <>
                        <IoCheckmarkCircle size={16} />
                        Документы в порядке
                      </>
                    ) : (
                      <>
                        <IoAlertCircle size={16} />
                        Нет данных документов
                      </>
                    )}
                  </span>
                </div>
              </div>
              <button className={s.passengerMenu}>
                <IoEllipsisVertical size={20} />
              </button>
            </div>
          ))}
        </div>
      </Container>

      {/* Contact Person */}
      <Container size="full" className={s.section}>
        <h3 className={s.sectionTitle}>Контактное лицо</h3>
        <div className={s.formRow}>
          <Input placeholder="Введите имя и роль" className={s.formInput} />
          <Input placeholder="+7 (___) ___-__-__" className={s.formInput} />
        </div>
      </Container>

      {/* Service Fields */}
      <Container size="full" className={s.section}>
        <h3 className={s.sectionTitle}>Служебные поля</h3>
        <div className={s.formRow}>
          <Select
            options={OPERATOR_OPTIONS}
            placeholder="Выберите оператора"
            className={s.formSelect}
          />
          <Select
            options={SOURCE_OPTIONS}
            placeholder="Выберите источник"
            className={s.formSelect}
          />
        </div>
        <Textarea
          placeholder="Дополнительная информация о заявке...."
          className={s.formTextarea}
          rows={4}
        />
      </Container>
    </>
  );
}
