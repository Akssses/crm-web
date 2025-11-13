"use client";
import React from "react";
import s from "../styles/Integrations.module.scss";
import { RiRobot2Line } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { Button, Checkbox, Container } from "@/ui";

export default function Integrations() {
  return (
    <Container size="full">
      <div className={s.header}>
        <RiRobot2Line size={24} />
        <h4>Интеграции и уведомления</h4>
      </div>
      <div className={s.flex}>
        <div className={s.bots}>
          <p>Подключённые Telegram-боты</p>
          <Container size="full">
            <div className={s.box}>
              <div className={s.bot}>
                <RiRobot2Line size={24} color="#2563eb" />
                <div>
                  <p>CRM Support Bot</p>
                  <span className={s.green}>
                    <FaCircle size={14} /> Подключен
                  </span>
                </div>
              </div>
              <Button variant="red">Отключить</Button>
            </div>
          </Container>
          <Container size="full">
            <div className={s.box}>
              <div className={s.bot}>
                <RiRobot2Line size={24} />
                <div>
                  <p>Notification Bot</p>
                  <span className={s.red}>
                    <FaCircle size={14} /> Не подключен
                  </span>
                </div>
              </div>
              <Button variant="blue">Подключить</Button>
            </div>
          </Container>
        </div>
        <div className={s.checks}>
          <h5>Типы уведомлений</h5>
          <div className={s.check}>
            <Checkbox label="Новые заявки" checked={true} />
            <Checkbox label="Изменение статуса заявки" checked={true} />
            <Checkbox label="Сообщения от клиентов" checked={true} />
            <Checkbox label="Напоминания по задачам" checked={false} />
          </div>
          <p className={s.watch}>
            <MdOutlineWatchLater size={16} />
            Только в рабочее время
          </p>
          <span className={s.span}>
            Уведомления будут приходить только с 9:00 до 18:00
          </span>
        </div>
      </div>
    </Container>
  );
}
