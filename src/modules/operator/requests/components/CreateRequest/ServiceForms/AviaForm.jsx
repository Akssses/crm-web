"use client";

import React, { useState } from "react";
import { Container, Input, Select, Switch, Button, Modal } from "@/ui";
import { MdFlight, MdAdd, MdRemove } from "react-icons/md";
import { IoCalendarOutline, IoPeopleOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const TRIP_TYPE_OPTIONS = [
  { value: "ow", label: "OW (в одну сторону)" },
  { value: "rt", label: "RT (туда-обратно)" },
  { value: "multicity", label: "MultiCity (сложный маршрут)" },
];

const CLASS_OPTIONS = [
  { value: "economy", label: "Эконом" },
  { value: "comfort", label: "Комфорт+" },
  { value: "business", label: "Бизнес" },
  { value: "first", label: "Первый" },
];

const SUPPLIER_OPTIONS = [
  { value: "sirena", label: "Sirena" },
  { value: "amadeus", label: "Amadeus" },
  { value: "galileo", label: "Galileo" },
  { value: "travelport", label: "Travelport" },
  { value: "direct", label: "Авиакомпании напрямую" },
];

const AIRLINE_OPTIONS = [
  { value: "all", label: "Все авиакомпании" },
  { value: "aeroflot", label: "Aeroflot" },
  { value: "s7", label: "S7 Airlines" },
  { value: "utair", label: "Utair" },
];

const CONNECTION_PROFILE_OPTIONS = [
  { value: "default", label: "По умолчанию" },
  { value: "direct", label: "Только прямые" },
  { value: "one_stop", label: "С одной пересадкой" },
];

export default function AviaForm() {
  const [tripType, setTripType] = useState("rt");
  const [directFlights, setDirectFlights] = useState(false);
  const [withBaggage, setWithBaggage] = useState(false);
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [segments, setSegments] = useState([
    { from: "", to: "", date: "", time: "", class: "economy" },
  ]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    childrenRF: 0,
    children: 0,
    infants: 0,
    infantsRFSeat: 0,
    infantsSeat: 0,
    youth: 0,
    seniors: 0,
    largeFamily: 0,
    disabled: 0,
    infantDisabled: 0,
    accompanyingDisabled: 0,
    dfoResidents: 0,
    dfoChildren: 0,
  });
  
  const [modalAirline, setModalAirline] = useState("all");
  const [modalServiceClass, setModalServiceClass] = useState("economy");
  const [modalConnectionProfile, setModalConnectionProfile] = useState("default");
  const [modalDirectFlights, setModalDirectFlights] = useState(false);
  const [modalRefundable, setModalRefundable] = useState(false);

  const updatePassenger = (type, delta) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const getTotalPassengers = () => {
    return Object.values(passengers).reduce((sum, count) => sum + count, 0);
  };

  const getPassengerSummary = () => {
    const total = getTotalPassengers();
    const classLabel = CLASS_OPTIONS.find(c => c.value === modalServiceClass)?.label || "Эконом";
    return `${total} чел. ${classLabel}`;
  };

  const handleSavePassengers = () => {
    setIsModalOpen(false);
  };

  const addSegment = () => {
    if (segments.length < 8) {
      setSegments([
        ...segments,
        { from: "", to: "", date: "", time: "", class: "economy" },
      ]);
    }
  };

  const removeSegment = (index) => {
    if (segments.length > 1) {
      setSegments(segments.filter((_, i) => i !== index));
    }
  };

  const updateSegment = (index, field, value) => {
    setSegments(
      segments.map((seg, i) => (i === index ? { ...seg, [field]: value } : seg))
    );
  };

  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <MdFlight size={20} />
          <span>Авиабилеты</span>
        </div>
      </div>

      {/* Основные параметры */}
      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Input
            placeholder="Откуда (город + аэропорт)"
            icon={MdFlight}
            className={s.serviceInput}
          />
          <Input
            placeholder="Куда (город + аэропорт)"
            icon={MdFlight}
            className={s.serviceInput}
          />
          <Input
            placeholder="Дата вылета"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
          {tripType === "rt" && (
            <Input
              placeholder="Дата возврата"
              icon={IoCalendarOutline}
              type="date"
              className={s.serviceInput}
            />
          )}
          <Select
            options={TRIP_TYPE_OPTIONS}
            value={tripType}
            onChange={setTripType}
            placeholder="Тип поездки"
            className={s.serviceSelect}
          />
          
          {/* Passenger selection input */}
          <div onClick={() => setIsModalOpen(true)} style={{ cursor: "pointer" }}>
            <Input
              placeholder="Пассажиры и класс"
              icon={IoPeopleOutline}
              value={getPassengerSummary()}
              readOnly
              className={s.serviceInput}
            />
          </div>
        </div>
      </div>

      {/* MultiCity конструктор */}
      {tripType === "multicity" && (
        <div className={s.formSection}>
          <h4 className={s.formSectionTitle}>Конструктор сегментов (до 8)</h4>
          {segments.map((segment, index) => (
            <div key={index} className={s.segmentBlock}>
              <div className={s.segmentHeader}>
                <span className={s.segmentNumber}>Сегмент №{index + 1}</span>
                {segments.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => removeSegment(index)}
                  >
                    Удалить
                  </Button>
                )}
              </div>
              <div className={s.serviceFormGrid}>
                <Input
                  placeholder="Откуда"
                  value={segment.from}
                  onChange={(value) => updateSegment(index, "from", value)}
                  className={s.serviceInput}
                />
                <Input
                  placeholder="Куда"
                  value={segment.to}
                  onChange={(value) => updateSegment(index, "to", value)}
                  className={s.serviceInput}
                />
                <Input
                  placeholder="Дата"
                  type="date"
                  value={segment.date}
                  onChange={(value) => updateSegment(index, "date", value)}
                  className={s.serviceInput}
                />
                <Input
                  placeholder="Время (опционально)"
                  type="time"
                  value={segment.time}
                  onChange={(value) => updateSegment(index, "time", value)}
                  className={s.serviceInput}
                />
                <Select
                  options={CLASS_OPTIONS}
                  value={segment.class}
                  onChange={(value) => updateSegment(index, "class", value)}
                  placeholder="Класс"
                  className={s.serviceSelect}
                />
              </div>
            </div>
          ))}
          {segments.length < 8 && (
            <Button
              variant="outline"
              size="sm"
              icon={MdAdd}
              onClick={addSegment}
            >
              Добавить сегмент
            </Button>
          )}
        </div>
      )}

      {/* Доп. параметры */}
      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Дополнительные параметры</h4>
        <div className={s.checkboxGroup}>
          <Switch
            checked={directFlights}
            onChange={setDirectFlights}
            label="Только прямые рейсы"
          />
          <Switch
            checked={withBaggage}
            onChange={setWithBaggage}
            label="С багажом"
          />
          <Switch
            checked={refundableOnly}
            onChange={setRefundableOnly}
            label="Только возвратные тарифы"
          />
        </div>
        <Select
          options={SUPPLIER_OPTIONS}
          placeholder="Поставщик"
          className={s.serviceSelect}
        />
      </div>

      {/* Passenger Selection Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Пассажиры"
        position="right"
        width="1000px"
      >
        <div className={s.passengerModal}>
          <div className={s.passengerCategories}>
            {/* Column 1: Regular categories */}
            <div className={s.categoryColumn}>
              <h5 className={s.categoryTitle}>Обычные категории</h5>
              
              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Взрослые</p>
                  <p className={s.passengerDesc}>старше 12 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("adults", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.adults}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("adults", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Дети граждане РФ</p>
                  <p className={s.passengerDesc}>от 2 до 12 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("childrenRF", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.childrenRF}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("childrenRF", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Дети</p>
                  <p className={s.passengerDesc}>от 2 до 12 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("children", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.children}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("children", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Младенцы</p>
                  <p className={s.passengerDesc}>до 2 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("infants", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.infants}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("infants", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Младенцы РФ с местом</p>
                  <p className={s.passengerDesc}>до 2 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("infantsRFSeat", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.infantsRFSeat}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("infantsRFSeat", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Младенцы с местом</p>
                  <p className={s.passengerDesc}>до 2 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("infantsSeat", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.infantsSeat}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("infantsSeat", 1)}
                  />
                </div>
              </div>
            </div>

            {/* Column 2: Subsidized categories */}
            <div className={s.categoryColumn}>
              <h5 className={s.categoryTitle}>Субсидированные категории</h5>
              
              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Молодёжь</p>
                  <p className={s.passengerDesc}>12–23 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("youth", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.youth}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("youth", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Пенсионеры</p>
                  <p className={s.passengerDesc}>55+</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("seniors", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.seniors}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("seniors", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Многодетные</p>
                  <p className={s.passengerDesc}>23–55 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("largeFamily", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.largeFamily}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("largeFamily", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Инвалид</p>
                  <p className={s.passengerDesc}>все возраста</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("disabled", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.disabled}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("disabled", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Ребёнок-инвалид</p>
                  <p className={s.passengerDesc}>2–12 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("infantDisabled", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.infantDisabled}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("infantDisabled", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Сопровождающий инвалида</p>
                  <p className={s.passengerDesc}>все возраста</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("accompanyingDisabled", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.accompanyingDisabled}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("accompanyingDisabled", 1)}
                  />
                </div>
              </div>
            </div>

            {/* Column 3: DFO subsidized */}
            <div className={s.categoryColumn}>
              <h5 className={s.categoryTitle}>Субсидированные ДФО/КО</h5>
              
              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Резиденты ДФО/КО</p>
                  <p className={s.passengerDesc}>12+</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("dfoResidents", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.dfoResidents}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("dfoResidents", 1)}
                  />
                </div>
              </div>

              <div className={s.passengerItem}>
                <div>
                  <p className={s.passengerLabel}>Дети ДФО/КО</p>
                  <p className={s.passengerDesc}>2–12 лет</p>
                </div>
                <div className={s.passengerControls}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdRemove}
                    onClick={() => updatePassenger("dfoChildren", -1)}
                  />
                  <span className={s.passengerCount}>{passengers.dfoChildren}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MdAdd}
                    onClick={() => updatePassenger("dfoChildren", 1)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className={s.modalBottomSection}>
            <div className={s.modalBottomGrid}>
              <div>
                <label className={s.modalLabel}>Авиакомпания</label>
                <Select
                  options={AIRLINE_OPTIONS}
                  value={modalAirline}
                  onChange={setModalAirline}
                  className={s.serviceSelect}
                />
              </div>
              <div>
                <label className={s.modalLabel}>Сервисный класс</label>
                <Select
                  options={CLASS_OPTIONS}
                  value={modalServiceClass}
                  onChange={setModalServiceClass}
                  className={s.serviceSelect}
                />
              </div>
              <div>
                <label className={s.modalLabel}>Профиль подключения</label>
                <Select
                  options={CONNECTION_PROFILE_OPTIONS}
                  value={modalConnectionProfile}
                  onChange={setModalConnectionProfile}
                  className={s.serviceSelect}
                />
              </div>
            </div>

            <div className={s.modalCheckboxes}>
              <Switch
                checked={modalDirectFlights}
                onChange={setModalDirectFlights}
                label="Без пересадок"
              />
              <Switch
                checked={modalRefundable}
                onChange={setModalRefundable}
                label="Искать только возвратные тарифы"
              />
            </div>

            <div className={s.modalActions}>
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsModalOpen(false)}
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSavePassengers}
              >
                Далее
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

