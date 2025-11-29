"use client";

import React, { useState } from "react";
import { Container, Button } from "@/ui";
import {
  MdFlight,
  MdHotel,
  MdDirectionsCar,
  MdTour,
  MdCheckCircle,
} from "react-icons/md";
import { BsShieldCheck, BsTrainFront } from "react-icons/bs";
import { FaTaxi, FaBus, FaBriefcase } from "react-icons/fa";
import { HiGlobeAlt } from "react-icons/hi";
import AviaForm from "./ServiceForms/AviaForm";
import HotelForm from "./ServiceForms/HotelForm";
import TrainForm from "./ServiceForms/TrainForm";
import TransferForm from "./ServiceForms/TransferForm";
import VisaForm from "./ServiceForms/VisaForm";
import TourForm from "./ServiceForms/TourForm";
import InsuranceForm from "./ServiceForms/InsuranceForm";
import TaxiForm from "./ServiceForms/TaxiForm";
import BusForm from "./ServiceForms/BusForm";
import LoungeForm from "./ServiceForms/LoungeForm";
import s from "../../styles/CreateRequest.module.scss";

const SERVICES = [
  { id: "avia", label: "Авиа", icon: MdFlight, selected: true },
  { id: "hotel", label: "Отель", icon: MdHotel, selected: true },
  { id: "train", label: "Ж/Д", icon: BsTrainFront, selected: false },
  { id: "transfer", label: "Трансфер", icon: MdDirectionsCar, selected: false },
  { id: "visa", label: "Виза", icon: HiGlobeAlt, selected: false },
  { id: "tour", label: "Тур", icon: MdTour, selected: false },
  { id: "insurance", label: "Страховка", icon: BsShieldCheck, selected: false },
  { id: "taxi", label: "Такси", icon: FaTaxi, selected: false },
  { id: "bus", label: "Автобус", icon: FaBus, selected: false },
  { id: "lounge", label: "Бизнес-залы", icon: FaBriefcase, selected: false },
];

const SERVICE_FORMS = {
  avia: AviaForm,
  hotel: HotelForm,
  train: TrainForm,
  transfer: TransferForm,
  visa: VisaForm,
  tour: TourForm,
  insurance: InsuranceForm,
  taxi: TaxiForm,
  bus: BusForm,
  lounge: LoungeForm,
};

export default function Step2() {
  const [services, setServices] = useState(SERVICES);

  const toggleService = (serviceId) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId ? { ...s, selected: !s.selected } : s
      )
    );
  };

  const selectedServices = services.filter((s) => s.selected);

  return (
    <>
      {/* Services Selection */}
      <Container size="full" className={s.section}>
        <div className={s.servicesHeader}>
          <h3 className={s.sectionTitle}>Выберите услуги для заявки</h3>
          <p className={s.sectionSubtitle}>
            Выберите одну или несколько услуг, которые нужны клиенту
          </p>
        </div>

        <div className={s.servicesGrid}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`${s.serviceCard} ${
                  service.selected ? s.serviceCardSelected : ""
                }`}
                onClick={() => toggleService(service.id)}
              >
                <Icon size={24} />
                <span>{service.label}</span>
                {service.selected && <MdCheckCircle className={s.checkIcon} />}
              </div>
            );
          })}
        </div>
      </Container>

      {/* Selected Service Forms */}
      {selectedServices.length > 0 &&
        selectedServices.map((service) => {
          const FormComponent = SERVICE_FORMS[service.id];
          return FormComponent ? <FormComponent key={service.id} /> : null;
        })}
    </>
  );
}
