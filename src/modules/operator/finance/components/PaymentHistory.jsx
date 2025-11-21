import React from "react";
import { Container, Button } from "@/ui";
import { MdDownload } from "react-icons/md";
import s from "../styles/PaymentHistory.module.scss";

export default function PaymentHistory() {
  const history = [
    {
      month: "Сентябрь 2025",
      details: "15 заказов • 480 000 Р",
      amount: "51 000 Р",
      status: "Выплачено",
      statusColor: "green",
    },
    {
      month: "Октябрь 2025",
      details: "18 заказов • 512 000 Р",
      amount: "55 600 Р",
      status: "На утверждении",
      statusColor: "orange",
    },
  ];

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>История выплат</h3>
      <div className={s.list}>
        {history.map((item, index) => (
          <div key={index} className={s.item}>
            <div className={s.itemHeader}>
              <span className={s.month}>{item.month}</span>
              <span
                className={`${s.statusBadge} ${s[`status-${item.statusColor}`]}`}
              >
                {item.status}
              </span>
            </div>
            <p className={s.details}>{item.details}</p>
            <span className={s.amount}>{item.amount}</span>
          </div>
        ))}
      </div>
      <Button variant="primary" icon={MdDownload} className={s.downloadButton}>
        Скачать расчёт (Excel)
      </Button>
    </Container>
  );
}

