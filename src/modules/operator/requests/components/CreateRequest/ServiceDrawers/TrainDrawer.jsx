import React, { useState } from "react";
import { Button } from "@/ui";
import s from "../../../styles/TrainDrawer.module.scss";
import {
  MdWifi,
  MdRestaurant,
  MdAcUnit,
  MdTv,
  MdPower,
  MdWc,
} from "react-icons/md";

const SERVICE_ICONS = {
  wifi: <MdWifi />,
  food: <MdRestaurant />,
  ac: <MdAcUnit />,
  tv: <MdTv />,
  power: <MdPower />,
  wc: <MdWc />,
};

export default function TrainDrawer({ data, onClose }) {
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(1);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!data) return null;

  const handleCarSelect = (carId) => {
    setSelectedCarId(carId === selectedCarId ? null : carId);
    setSelectedSeats([]); // Reset seats when changing car
  };

  const handleSeatSelect = (seat) => {
    if (seat.isFree) {
      if (selectedSeats.find((s) => s.number === seat.number)) {
        setSelectedSeats(selectedSeats.filter((s) => s.number !== seat.number));
      } else {
        if (selectedSeats.length < selectedSeatsCount) {
          setSelectedSeats([...selectedSeats, seat]);
        }
      }
    }
  };

  const selectedCar = data.cars?.find((c) => c.id === selectedCarId);

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    return sum + parseInt(seat.price.replace(/\D/g, ""));
  }, 0);

  return (
    <div className={s.drawerContainer}>
      <div className={s.header}>
        <div className={s.trainInfo}>
          <div className={s.trainMain}>
            <div className={s.trainNumber}>
              {data.trainNumber}
              <span className={s.trainName}>{data.trainName}</span>
            </div>
            <div className={s.routeInfo}>{data.route}</div>
          </div>
          <div className={s.duration}>
            {data.duration} • {data.departureDate}
          </div>
        </div>

        <div className={s.timeInfo}>
          <div className={s.timeBlock}>
            <span className={s.time}>{data.departureTime}</span>
            <span className={s.station}>
              {data.stations?.split(" → ")[0]}
            </span>
          </div>
          <div className={s.timeBlock}>
            <span className={s.time}>{data.arrivalTime}</span>
            <span className={s.station}>
              {data.stations?.split(" → ")[1]}
            </span>
          </div>
        </div>

        {/* <div className={s.services}>
          {data.services?.map((srv, idx) => (
            <div key={idx} className={s.serviceIcon} title={srv}>
              {SERVICE_ICONS[srv.toLowerCase()] || <MdWifi />}
            </div>
          ))}
        </div> */}

        {/* 2. Seat Selector */}
        <div className={s.seatSelector}>
          <span className={s.seatLabel}>Количество мест:</span>
          <div className={s.seatButtons}>
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`${s.seatButton} ${
                  selectedSeatsCount === num ? s.active : ""
                }`}
                onClick={() => {
                  setSelectedSeatsCount(num);
                  setSelectedSeats([]);
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area (Scrollable) */}
      <div className={s.content}>
        {/* 3. Car Cards */}
        <div className={s.carsGrid}>
          {data.cars?.map((car) => (
            <div
              key={car.id}
              className={`${s.carCard} ${
                selectedCarId === car.id ? s.active : ""
              }`}
              onClick={() => handleCarSelect(car.id)}
            >
              <div className={s.carHeader}>
                <span className={s.carNumber}>Вагон {car.number}</span>
                <span className={s.carType}>{car.type}</span>
              </div>
              <div className={s.carDetails}>
                <span className={s.carClass}>
                  Класс {car.cls} • {car.carrier}
                </span>
                <span className={s.freeSeats}>
                  {car.freeSeats} мест свободно
                </span>
              </div>
              <div className={s.services}>
                {car.services?.map((srv, idx) => (
                  <span key={idx} className={s.serviceIcon}>
                    {SERVICE_ICONS[srv]}
                  </span>
                ))}
              </div>
              <span className={s.carPrice}>{car.priceRange}</span>
            </div>
          ))}
        </div>

        {/* 4. Car Schema */}
        {selectedCar && (
          <div className={s.schemaContainer}>
            <h4 className={s.schemaTitle}>
              Схема вагона {selectedCar.number} ({selectedCar.type})
            </h4>
            <div className={s.wagon}>
              <div className={s.coupe}>
                {Array.from({ length: 9 }).map((_, coupeIdx) => (
                  <div key={coupeIdx} className={s.coupeBlock}>
                    {selectedCar.schema.seats
                      .slice(coupeIdx * 4, (coupeIdx + 1) * 4)
                      .map((seat) => (
                        <div
                          key={seat.number}
                          className={`${s.seat} ${seat.type} ${
                            !seat.isFree ? s.busy : ""
                          } ${
                            selectedSeats.find((s) => s.number === seat.number)
                              ? s.selected
                              : ""
                          }`}
                          onClick={() => handleSeatSelect(seat)}
                          title={
                            seat.isFree
                              ? `Место ${seat.number} - ${seat.price}`
                              : `Место ${seat.number} занято`
                          }
                        >
                          {seat.number}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={s.footer}>
        <div className={s.selectedSeats}>
          <span className={s.seatsList}>
            {selectedSeats.length > 0
              ? `Выбрано: ${selectedSeats
                  .map((s) => `место ${s.number}`)
                  .join(", ")}`
              : "Выберите места на схеме"}
          </span>
          <span className={s.totalPrice}>
            {totalPrice > 0 ? `${totalPrice.toLocaleString()} ₽` : "0 ₽"}
          </span>
        </div>
        <div className={s.footerActions}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            variant="primary"
            disabled={selectedSeats.length === 0}
            onClick={onClose}
          >
            Добавить в заявку
          </Button>
        </div>
      </div>
    </div>
  );
}
