"use client";
import React from "react";
import { Container, UITable } from "@/ui";
import s from "../../styles/ServiceDetail.module.scss";

export default function History() {
  const historyItems = [
    {
      date: "12.10.2025",
      user: "Азамат",
      field: "Стоимость",
      was: "29 500",
      became: "30 100",
      isChanged: true,
    },
    {
      date: "11.10.2025",
      user: "Бухгалтерия",
      field: "Комиссия",
      was: "4%",
      became: "5%",
      isChanged: false,
    },
    {
      date: "10.10.2025",
      user: "Азамат",
      field: "Статус",
      was: "Черновик",
      became: "Подтверждено",
      isChanged: false,
    },
  ];

  const columns = [
    {
      key: "date",
      label: "Дата",
    },
    {
      key: "user",
      label: "Пользователь",
    },
    {
      key: "field",
      label: "Поле",
    },
    {
      key: "was",
      label: "Было",
    },
    {
      key: "became",
      label: "Стало",
      render: (value, row) => (
        <span className={row.isChanged ? s.changedValue : ""}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <Container size="full" className={s.section}>
      <div className={s.sectionHeader}>
        <h3 className={s.sectionTitle}>История</h3>
        <button className={s.showAllLink}>Показать всю историю</button>
      </div>
      <UITable columns={columns} rows={historyItems} showCheckbox={false} />
    </Container>
  );
}

