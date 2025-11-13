"use client";
import React, { useState } from "react";
import s from "../styles/Safety.module.scss";
import { MdOutlineShield } from "react-icons/md";
import { Container, Button, Switch } from "@/ui";
import { IoSettingsOutline } from "react-icons/io5";
import { FiMonitor, FiSmartphone } from "react-icons/fi";

export default function Safety() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Chrome на Windows",
      ip: "192.168.1.100",
      status: "Текущая сессия",
      isActive: true,
    },
    {
      id: 2,
      device: "Safari на iPhone",
      ip: "10.0.1.25",
      status: "2 часа назад",
      isActive: false,
    },
  ]);

  return (
    <Container size="full" variant="card" padding="lg">
      <div className={s.header}>
        <MdOutlineShield size={24} />
        <h4>Безопасность</h4>
      </div>
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <p>Пароль</p>
          <input
            className={s.passwordDots}
            type="password"
            placeholder="●●●●●●●●●●"
          />
        </div>
        <Button variant="outline" size="sm">
          <IoSettingsOutline size={16} style={{ marginRight: "6px" }} />
          Изменить
        </Button>
      </div>
      <div className={s.section}>
        <div className={s.twoFactorContent}>
          <p>Двухфакторная аутентификация</p>
          <span>Дополнительная защита аккаунта</span>
        </div>
        <div>
          <Switch />
        </div>
      </div>
      <div className={s.block}>
        <p>Активные сессии</p>
        <span className={s.span}>Устройства с доступом к вашему аккаунту</span>

        <div className={s.sessionsList}>
          {sessions.map((session) => (
            <div key={session.id} className={s.sessionItem}>
              <div className={s.flex}>
                <div>
                  {session.device.includes("Chrome на Windows") ||
                  session.device.includes("Safari на iPhone") ? (
                    <FiMonitor size={24} />
                  ) : (
                    <FiSmartphone size={24} />
                  )}
                </div>
                <div>
                  <p>{session.device}</p>
                  <span className={s.span}>
                    {session.ip} • {session.status}
                  </span>
                </div>
              </div>

              {session.isActive ? (
                <Button variant="green" size="sm">
                  Активна
                </Button>
              ) : (
                <Button variant="red" size="sm">
                  Завершить
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
