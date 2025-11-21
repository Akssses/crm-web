"use client";
import React from "react";
import { Container, UITable, Button } from "@/ui";
import { MdAdd } from "react-icons/md";
import s from "../../styles/RelatedContacts.module.scss";

export default function RelatedContacts() {
  const contacts = [
    {
      id: 1,
      name: "Айсулуу М.",
      position: "Оператор",
      phone: "+996 555 333 445",
      email: "manager@asiatravel.kg",
    },
    {
      id: 2,
      name: "Адильбек Т.",
      position: "Бухгалтер",
      phone: "+996 555 667 001",
      email: "finance@asiatravel.kg",
    },
  ];

  const columns = [
    { key: "name", label: "Имя" },
    { key: "position", label: "Должность" },
    { key: "phone", label: "Телефон" },
    { key: "email", label: "Email" },
  ];

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>Связанные контакты</h3>
        <Button variant="primary" icon={MdAdd}>
          Добавить контакт
        </Button>
      </div>
      <UITable columns={columns} rows={contacts} showCheckbox={false} />
    </Container>
  );
}

