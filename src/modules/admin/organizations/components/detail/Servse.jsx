import React from "react";
import s from "../../styles/Servse.module.scss";
import { Button, Container } from "@/ui";
import { FaCheckCircle, FaPlus } from "react-icons/fa";

export default function Servse() {
  return (
    <div className={s.flex}>
      <Container size="full">
        <div className={s.colum}>
          <div className={s.header}>
            <h4>Услуги</h4>
            <Button icon={FaPlus} variant="bggreen">
              Добавить
            </Button>
          </div>
          <div className={s.main}>
            <div>
              <p>Авиа</p>
              <span>Основная • 5% • 800 KGS</span>
            </div>
            <FaCheckCircle size={18} color="#22C55E" />
          </div>
          <div className={s.main}>
            <div>
              <p>Отель</p>
              <span>Основная • 1000 фикс</span>
            </div>
            <FaCheckCircle size={18} color="#22C55E" />
          </div>
          <div className={s.main}>
            <div>
              <p>Виза</p>
              <span>Дополнительная • 3%</span>
            </div>
            <FaCheckCircle size={18} color="#22C55E" />
          </div>
          <div className={s.main}>
            <div>
              <p>Трансфер</p>
              <span>Дополнительная • 500 фикс</span>
            </div>
            <FaCheckCircle size={18} color="#22C55E" />
          </div>
        </div>
      </Container>
      <Container size="full">
        <div className={s.colum}>
          <div className={s.header}>
            <h4>Госконтракты</h4>
            <Button icon={FaPlus} variant="bggreen">
              Добавить
            </Button>
          </div>
          <div className={s.bg}>
            <div className={s.header}>
              <p>GC-001</p>
              <span className={s.dow}>В процессе</span>
            </div>
            <div className={s.grid}>
              <div className={s.header}>
                <span>Сумма:</span>
                <p>1 000 000 ₽</p>
              </div>
              <div className={s.header}>
                <span>Выполнено:</span>
                <p>800 000 ₽</p>
              </div>
              <div className={s.header}>
                <span>Оплачено:</span>
                <p>700 000 ₽</p>
              </div>
              <div className={s.header}>
                <span>Остаток:</span>
                <p>200 000 ₽</p>
              </div>
            </div>
          </div>
          <div className={s.bg}>
            <div className={s.header}>
              <p>GC-002</p>
              <span className={s.gre}>Завершён</span>
            </div>
            <div className={s.grid}>
              <div className={s.header}>
                <span>Сумма:</span>
                <p>1 000 000 ₽</p>
              </div>
              <div className={s.header}>
                <span>Выполнено:</span>
                <p>800 000 ₽</p>
              </div>
              <div className={s.header}>
                <span>Оплачено:</span>
                <p>700 000 ₽</p>
              </div>
              <div className={s.header}>
                <span>Остаток:</span>
                <p>200 000 ₽</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
