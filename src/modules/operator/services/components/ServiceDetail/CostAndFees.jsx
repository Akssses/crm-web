"use client";
import React from "react";
import { Container, UITable, Button } from "@/ui";
import { MdAdd, MdCalculate } from "react-icons/md";
import s from "../../styles/ServiceDetail.module.scss";

export default function CostAndFees() {
  const costItems = [
    {
      component: "Базовый тариф",
      amount: "25 000",
      currency: "KGS",
      comment: "",
    },
    {
      component: "Таксы (аэропорт, топливо, страховка)",
      amount: "5 000",
      currency: "KGS",
      comment: "автоиз справочника",
      color: "default",
    },
    {
      component: "Агентская комиссия",
      amount: "-1 200",
      currency: "KGS",
      comment: "5% от тарифа",
      color: "red",
    },
    {
      component: "Сервисный сбор",
      amount: "+700",
      currency: "KGS",
      comment: "фиксировано",
      color: "green",
    },
    {
      component: "Удержание поставщика",
      amount: "-400",
      currency: "KGS",
      comment: "по API",
      color: "red",
    },
    {
      component: "Маркап",
      amount: "+1 000",
      currency: "KGS",
      comment: "надбавка организации",
      color: "green",
    },
    {
      component: "НДС",
      amount: "20%",
      currency: "KGS",
      comment: "по правилам организации",
      color: "default",
    },
    {
      component: "Итоговая сумма",
      amount: "30 100",
      currency: "KGS",
      comment: "",
      color: "default",
      isTotal: true,
    },
  ];

  const columns = [
    {
      key: "component",
      label: "Компонент",
      render: (value, row) => (
        <span className={row.isTotal ? s.totalLabel : ""}>{value}</span>
      ),
    },
    {
      key: "amount",
      label: "Сумма",
      render: (value, row) => (
        <span
          className={`${s.amount} ${
            row.color === "red"
              ? s.amountRed
              : row.color === "green"
              ? s.amountGreen
              : ""
          } ${row.isTotal ? s.totalAmount : ""}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "currency",
      label: "Валюта",
    },
    {
      key: "comment",
      label: "Комментарий",
    },
  ];

  return (
    <Container size="full" className={s.section}>
      <div className={s.sectionHeader}>
        <h3 className={s.sectionTitle}>Стоимость и сборы</h3>
        <div className={s.sectionActions}>
          <Button variant="outline" icon={MdAdd}>
            + Добавить сбор
          </Button>
          <Button variant="outline" icon={MdCalculate}>
            Пересчитать
          </Button>
        </div>
      </div>
      <UITable columns={columns} rows={costItems} showCheckbox={false} />
    </Container>
  );
}

