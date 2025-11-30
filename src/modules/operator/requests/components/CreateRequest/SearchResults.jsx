"use client";

import React, { useState } from "react";
import { Button, Container, Modal } from "@/ui";
import AviaDrawer from "./ServiceDrawers/AviaDrawer";
import HotelDrawer from "./ServiceDrawers/HotelDrawer";
import TrainDrawer from "./ServiceDrawers/TrainDrawer";
import TransferDrawer from "./ServiceDrawers/TransferDrawer";
import VisaDrawer from "./ServiceDrawers/VisaDrawer";
import InsuranceDrawer from "./ServiceDrawers/InsuranceDrawer";
import TourDrawer from "./ServiceDrawers/TourDrawer";
import TaxiDrawer from "./ServiceDrawers/TaxiDrawer";
import LoungeDrawer from "./ServiceDrawers/LoungeDrawer";
import { IoArrowBack } from "react-icons/io5";
import {
  MdFlight,
  MdHotel,
  MdDirectionsCar,
  MdClose,
  MdTour,
} from "react-icons/md";
import {
  BsShieldCheck,
  BsTrainFront,
  BsBriefcase,
} from "react-icons/bs";
import { FaTaxi, FaPassport } from "react-icons/fa";
import { HiGlobeAlt } from "react-icons/hi";
import s from "../../styles/SearchResults.module.scss";

const SERVICE_TYPES = [
  { id: "avia", label: "Авиа", icon: MdFlight },
  { id: "train", label: "Ж/Д", icon: BsTrainFront },
  { id: "hotel", label: "Отели", icon: MdHotel },
  { id: "transfer", label: "Трансферы", icon: MdDirectionsCar },
  { id: "visa", label: "Визы", icon: HiGlobeAlt },
  { id: "insurance", label: "Страховки", icon: BsShieldCheck },
  { id: "tour", label: "Экскурсии", icon: MdTour },
  { id: "taxi", label: "Такси", icon: FaTaxi },
  { id: "lounge", label: "Бизнес-залы", icon: BsBriefcase },
];

import { MOCK_DATA } from "./mockData";


export default function SearchResults({ onBack, selectedServices = [], onUpdateServices }) {
  const [activeTab, setActiveTab] = useState("recommended");
  const [activeServiceType, setActiveServiceType] = useState("avia");
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleSelectService = (service) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  };

  const currentData = MOCK_DATA[activeServiceType] || MOCK_DATA.avia;

  const renderAviaRow = (flight) => (
    <div key={flight.id} className={s.flightCard}>
      <div className={`${s.flightRow} ${s.gridAvia}`}>
        <div className={s.col}>{flight.airline}</div>
        <div className={s.col}>{flight.flightNumber}</div>
        <div className={s.col}>
          <button
            className={s.routeLink}
            onClick={() =>
              setExpandedFlight(expandedFlight === flight.id ? null : flight.id)
            }
          >
            {flight.route}
          </button>
        </div>
        <div className={s.col}>
          <div className={s.time}>{flight.departureTime}</div>
          <div className={s.location}>{flight.departureLocation}</div>
        </div>
        <div className={s.col}>{flight.duration}</div>
        <div className={s.col}>{flight.connections}</div>
        <div className={s.col}>{flight.baggage}</div>
        <div className={s.col}>
          <div className={s.price}>{flight.price}</div>
          <div className={s.priceNote}>{flight.pricePerPerson}</div>
        </div>
        <div className={s.col}>
          <Button variant="primary" size="sm" onClick={() => handleSelectService(flight)}>
            Выбрать
          </Button>
        </div>
      </div>

      {expandedFlight === flight.id && (
        <div className={s.flightDetails}>
          <div className={s.detailsHeader}>
            <div className={s.detailCol}>Откуда</div>
            <div className={s.detailCol}>Куда</div>
            <div className={s.detailCol}>Вылет</div>
            <div className={s.detailCol}>Прилет</div>
            <div className={s.detailCol}>В пути</div>
            <div className={s.detailCol}>Рейс</div>
            <div className={s.detailCol}>Самалёт</div>
          </div>
          {flight.segments.map((segment, idx) => (
            <div key={idx} className={s.detailsRow}>
              <div className={s.detailCol}>{segment.from}</div>
              <div className={s.detailCol}>{segment.to}</div>
              <div className={s.detailCol}>{segment.departure}</div>
              <div className={s.detailCol}>{segment.arrival}</div>
              <div className={s.detailCol}>{segment.duration}</div>
              <div className={s.detailCol}>{segment.flight}</div>
              <div className={s.detailCol}>{segment.aircraft}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTrainRow = (train) => (
    <div key={train.id} className={s.flightCard}>
      <div className={`${s.flightRow} ${s.gridTrain}`}>
        <div className={s.col}>
          <div style={{ fontWeight: 600 }}>{train.carrier}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{train.trainNumber}</div>
        </div>
        <div className={s.col}>{train.trainName}</div>
        <div className={s.col}>{train.route}</div>
        <div className={s.col}>
          <div className={s.time}>{train.departureTime} - {train.arrivalTime}</div>
        </div>
        <div className={s.col}>{train.duration}</div>
        <div className={s.col}>{train.carType}</div>
        <div className={s.col}>
          <div className={s.price}>{train.price}</div>
        </div>
        <div className={s.col}>
          <Button variant="primary" size="sm" onClick={() => handleSelectService(train)}>
            Выбрать
          </Button>
        </div>
      </div>

    </div>
  );

  const renderHotelRow = (hotel) => (
    <div key={hotel.id} className={s.flightCard}>
      <div className={`${s.flightRow} ${s.gridHotel}`}>
        <div className={s.col}>
          <div style={{ fontWeight: 600 }}>{hotel.name}</div>
        </div>
        <div className={s.col}>{hotel.stars}</div>
        <div className={s.col}>{hotel.location}</div>
        <div className={s.col}>
          <div className={s.time}>{hotel.checkIn} - {hotel.checkOut}</div>
        </div>
        <div className={s.col}>{hotel.nights}</div>
        <div className={s.col}>{hotel.roomType}</div>
        <div className={s.col}>{hotel.guests}</div>
        <div className={s.col}>
          <div className={s.price}>{hotel.price}</div>
          <div className={s.priceNote}>{hotel.pricePerNight}</div>
        </div>
        <div className={s.col}>
          <Button variant="primary" size="sm" onClick={() => handleSelectService(hotel)}>
            Выбрать
          </Button>
        </div>
      </div>

    </div>
  );

  const renderTransferRow = (transfer) => (
    <div key={transfer.id} className={s.flightCard}>
      <div className={`${s.flightRow} ${s.gridTransfer}`}>
        <div className={s.col} style={{ fontWeight: 600 }}>{transfer.supplier}</div>
        <div className={s.col}>{transfer.route}</div>
        <div className={s.col}>{transfer.carClass}</div>
        <div className={s.col}>{transfer.capacity}</div>
        <div className={s.col}>{transfer.duration}</div>
        <div className={s.col}>
          <div className={s.price}>{transfer.price}</div>
        </div>
        <div className={s.col}>
          <Button variant="primary" size="sm" onClick={() => handleSelectService(transfer)}>
            Выбрать
          </Button>
        </div>
      </div>

    </div>
  );

  const renderVisaRow = (visa) => (
    <div key={visa.id} className={s.flightCard}>
      <div className={`${s.flightRow} ${s.gridVisa}`}>
        <div className={s.col} style={{ fontWeight: 600 }}>{visa.country}</div>
        <div className={s.col}>{visa.terms}</div>
        <div className={s.col}>{visa.docs}</div>
        <div className={s.col}>
          <div className={s.price}>{visa.price}</div>
        </div>
        <div className={s.col}>
          <Button variant="primary" size="sm" onClick={() => handleSelectService(visa)}>
            Выбрать
          </Button>
        </div>
      </div>

    </div>
  );

  const renderInsuranceRow = (insurance) => (
    <div key={insurance.id} className={s.flightCard}>
      <div className={`${s.flightRow} ${s.gridInsurance}`}>
        <div className={s.col} style={{ fontWeight: 600 }}>{insurance.company}</div>
        <div className={s.col}>{insurance.coverage}</div>
        <div className={s.col}>{insurance.term}</div>
        <div className={s.col}>
          <div className={s.price}>{insurance.price}</div>
        </div>
        <div className={s.col}>
          <Button variant="primary" size="sm" onClick={() => handleSelectService(insurance)}>
            Выбрать
          </Button>
        </div>
      </div>

    </div>
  );

  const renderTourRow = (tour) => (
    <div key={tour.id} className={s.flightCard}>
      <div className={`${s.flightRow} ${s.gridTour}`}>
        <div className={s.col} style={{ fontWeight: 600 }}>{tour.name}</div>
        <div className={s.col}>{tour.dateTime}</div>
        <div className={s.col}>{tour.duration}</div>
        <div className={s.col}>{tour.pax}</div>
        <div className={s.col}>
          <div className={s.price}>{tour.price}</div>
        </div>
        <div className={s.col}>
          <Button variant="primary" size="sm" onClick={() => handleSelectService(tour)}>
            Выбрать
          </Button>
        </div>
      </div>

    </div>
  );

  const renderTaxiRow = (taxi) => (
    <div key={taxi.id} className={s.flightCard}>
      <div className={`${s.flightRow} ${s.gridTaxi}`}>
        <div className={s.col} style={{ fontWeight: 600 }}>{taxi.service}</div>
        <div className={s.col}>{taxi.route}</div>
        <div className={s.col}>{taxi.duration}</div>
        <div className={s.col}>{taxi.carClass}</div>
        <div className={s.col}>{taxi.pax}</div>
        <div className={s.col}>
          <div className={s.price}>{taxi.price}</div>
        </div>
        <div className={s.col}>
          <Button variant="primary" size="sm" onClick={() => handleSelectService(taxi)}>
            Выбрать
          </Button>
        </div>
      </div>

    </div>
  );

  const renderLoungeRow = (lounge) => (
    <div key={lounge.id} className={s.flightCard}>
      <div className={`${s.flightRow} ${s.gridLounge}`}>
        <div className={s.col} style={{ fontWeight: 600 }}>{lounge.name}</div>
        <div className={s.col}>{lounge.terminal}</div>
        <div className={s.col}>{lounge.accessTime}</div>
        <div className={s.col}>
          <div className={s.price}>{lounge.price}</div>
        </div>
        <div className={s.col}>
          <Button variant="primary" size="sm" onClick={() => handleSelectService(lounge)}>
            Выбрать
          </Button>
        </div>
      </div>

    </div>
  );

  const renderRow = (item) => {
    switch (activeServiceType) {
      case "avia":
        return renderAviaRow(item);
      case "train":
        return renderTrainRow(item);
      case "hotel":
        return renderHotelRow(item);
      case "transfer":
        return renderTransferRow(item);
      case "visa":
        return renderVisaRow(item);
      case "insurance":
        return renderInsuranceRow(item);
      case "tour":
        return renderTourRow(item);
      case "taxi":
        return renderTaxiRow(item);
      case "lounge":
        return renderLoungeRow(item);
      default:
        return null;
    }
  };

  return (
    <div className={s.searchResults}>
      {/* Header */}
      <div className={s.resultsHeader}>
        <div className={s.resultsHeaderLeft}>
          <Button variant="outline" size="sm" icon={IoArrowBack} onClick={onBack}>
            Назад к параметрам
          </Button>
        </div>
        <div className={s.resultsHeaderRight}>
          <span className={s.foundCount}>Найдено: 126</span>
        </div>
      </div>

      {/* Tabs */}
      <div className={s.resultsTabs}>
        <div className={s.tabsLeft}>
          <button
            className={`${s.tab} ${activeTab === "recommended" ? s.tabActive : ""}`}
            onClick={() => setActiveTab("recommended")}
          >
            Рекомендуемые
          </button>
          <button
            className={`${s.tab} ${activeTab === "cheapest" ? s.tabActive : ""}`}
            onClick={() => setActiveTab("cheapest")}
          >
            Самые дешевые
          </button>
          <button
            className={`${s.tab} ${activeTab === "fastest" ? s.tabActive : ""}`}
            onClick={() => setActiveTab("fastest")}
          >
            Самые быстрые
          </button>
        </div>
      </div>

      {/* Service Type Tabs */}
      <div className={s.serviceTypeTabs}>
        {SERVICE_TYPES.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              className={`${s.serviceTab} ${
                activeServiceType === service.id ? s.active : ""
              }`}
              onClick={() => setActiveServiceType(service.id)}
            >
              <Icon size={18} />
              {service.label}
            </button>
          );
        })}
      </div>

      <div className={s.resultsContent}>
        {/* Results Table */}
        <div className={s.resultsTable}>
          <div
            className={`${s.tableHeader} ${
              s[
                `grid${
                  activeServiceType.charAt(0).toUpperCase() +
                  activeServiceType.slice(1)
                }`
              ]
            }`}
          >
            {currentData.headers.map((header, idx) => (
              <div key={idx} className={s.col}>
                {header}
              </div>
            ))}
          </div>

          {currentData.items.map((item) => renderRow(item))}
        </div>

        {/* Selected Services Panel - At Bottom */}
        {selectedServices.length > 0 && (
          <div className={s.selectedPanel}>
            <h3 className={s.panelTitle}>Выбранные услуги</h3>

            <div className={s.selectedServices}>
              {selectedServices.map((service) => (
                <div key={service.id} className={s.selectedService}>
                  <div className={s.serviceIcon}>
                    <service.icon size={28} />
                  </div>
                  <div className={s.serviceInfo}>
                    <div className={s.serviceType}>{service.type}</div>
                    <div className={s.serviceDetails}>{service.details}</div>
                    <div className={s.serviceTime}>{service.time}</div>
                  </div>
                  <div className={s.serviceActions}>
                    <div className={s.servicePrice}>{service.price}</div>
                  </div>
                  <button className={s.removeService}>
                    <MdClose size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className={s.totalSection}>
              <div className={s.totalRow}>
                <span>Услуги ({selectedServices.length})</span>
                <span>100 150 ₽</span>
              </div>
              <div className={s.totalRow}>
                <span>Комиссия</span>
                <span>2 500 ₽</span>
              </div>
              <div className={s.totalRow}>
                <strong>Итого</strong>
                <strong className={s.totalPrice}>102 650 ₽</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Service Drawer Modal */}
      <Modal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`Добавление услуги – ${
          SERVICE_TYPES.find((t) => t.id === activeServiceType)?.label
        }`}
        width={activeServiceType === "train" ? "900px" : "560px"}
        position="right"
      >
        {activeServiceType === "avia" && (
          <AviaDrawer
            data={selectedService}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
        {activeServiceType === "hotel" && (
          <HotelDrawer
            data={selectedService}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
        {activeServiceType === "train" && (
          <TrainDrawer
            data={selectedService}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
        {activeServiceType === "transfer" && (
          <TransferDrawer
            data={selectedService}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
        {activeServiceType === "visa" && (
          <VisaDrawer
            data={selectedService}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
        {activeServiceType === "insurance" && (
          <InsuranceDrawer
            data={selectedService}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
        {activeServiceType === "tour" && (
          <TourDrawer
            data={selectedService}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
        {activeServiceType === "taxi" && (
          <TaxiDrawer
            data={selectedService}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
        {activeServiceType === "lounge" && (
          <LoungeDrawer
            data={selectedService}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}
