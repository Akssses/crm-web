"use client";
import React, { useState } from "react";
import s from "../styles/Table.module.scss";
import { Container, Input } from "@/ui";
import { MdSearch, MdPeople } from "react-icons/md";

export default function SuppliersTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const data = [
    {
      id: 1,
      supplier: "Booking.com",
      orders: 234,
      avgCheck: "52 300 ₽",
      margin: "16%",
    },
    {
      id: 2,
      supplier: "Booking.com",
      orders: 234,
      avgCheck: "52 300 ₽",
      margin: "16%",
    },
    {
      id: 3,
      supplier: "Booking.com",
      orders: 234,
      avgCheck: "52 300 ₽",
      margin: "16%",
    },
  ];

  const filteredData = data.filter((item) =>
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container size="full">
      <div className={s.header}>
        <div className={s.headerLeft}>
          <MdPeople size={24} />
          <h3 className={s.headerTitle}>Топ поставщики</h3>
        </div>
        <div className={s.headerRight}>
          <Input
            icon={MdSearch}
            placeholder="Поиск..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>

      {/* Table */}
      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead>
            <tr className={s.headerRow}>
              <th className={s.headerCell}>Поставщик</th>
              <th className={s.headerCell}>Кол-во заказов</th>
              <th className={s.headerCell}>Средний чек</th>
              <th className={s.headerCell}>Маржа</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id} className={s.bodyRow}>
                <td className={s.bodyCell}>
                  <div className={s.supplierName}>{item.supplier}</div>
                </td>
                <td className={s.bodyCell}>
                  <div className={s.cellValue}>{item.orders}</div>
                </td>
                <td className={s.bodyCell}>
                  <div className={s.cellValue}>{item.avgCheck}</div>
                </td>
                <td className={s.bodyCell}>
                  <div className={s.cellValue}>{item.margin}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className={s.emptyState}>
            <p>Поставщики не найдены</p>
          </div>
        )}
      </div>
    </Container>
  );
}
