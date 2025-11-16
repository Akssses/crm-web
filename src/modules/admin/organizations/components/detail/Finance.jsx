import React from "react";
import s from "../../styles/Finance.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { Container } from "@/ui";

export default function Finance() {
  return (
    <Container size="full">
      <div className={s.main}>
        <h4>Финансовые параметры</h4>
        <div className={s.grid}>
          <div>
            <span>Тип расчёта</span>
            <p>НДС включён</p>
          </div>
          <div>
            <span>Ставка НДС</span>
            <p>12%</p>
          </div>
          <div>
            <span>Тип комиссий</span>
            <p>%</p>
          </div>
          <div>
            <span>Ставка комиссии</span>
            <p>5%</p>
          </div>
          <div>
            <span>Формат документов</span>
            <p>Счёт + Акт</p>
          </div>
          <div>
            <span>Валюта учёта</span>
            <p>KGS</p>
          </div>
          <div>
            <span>Метод округления</span>
            <p>до 1 KGS</p>
          </div>
          <div></div>
          <div>
            <span>Синхронизация с бухгалтерией</span>
            <p>
              <FaCheckCircle color="#22C55E" size={18} />
              Подключено (1С)
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
