"use client";
import React from "react";
import { Container, UITable, Button } from "@/ui";
import { MdAdd, MdMoreVert } from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/ServicesTable.module.scss";

export default function ServicesTable() {
  const router = useRouter();

  const services = [
    {
      id: 1,
      type: "Авиаперелет",
      client: "Артем Чувак",
      supplier: "Booking",
      order: "ORD-123456",
      operator: "Айтурган Ж.",
      status: "Подтверждено",
      statusColor: "green",
    },
  ];

  const columns = [
    {
      key: "type",
      label: "Тип услуги",
    },
    {
      key: "client",
      label: "Клиент/Организация",
    },
    {
      key: "supplier",
      label: "Поставщик",
    },
    {
      key: "order",
      label: "Заказ",
      render: (value) => <span className={s.orderLink}>#{value}</span>,
    },
    {
      key: "operator",
      label: "Оператор",
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <div className={s.statusCell}>
          <span
            className={`${s.statusDot} ${s[`statusDot-${row.statusColor}`]}`}
          ></span>
          <span
            className={`${s.statusBadge} ${s[`status-${row.statusColor}`]}`}
          >
            {value}
          </span>
        </div>
      ),
    },
  ];

  const handleRowClick = (row) => {
    router.push(`/operator/services/${row.id}`);
  };

  return (
    <div className={s.container}>
      <UITable
        columns={columns}
        rows={services}
        showCheckbox={true}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
