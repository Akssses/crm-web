"use client";

import React from "react";
import { useRouter } from "next/navigation";
import s from "../../../styles/OrderDetail.module.scss";

export default function RelatedOrdersTab({ order }) {
  const router = useRouter();

  return (
    <section className={s.relatedOrdersSection}>
      <div className={s.sectionTitle}>Связанные заказы</div>
      <div className={s.relatedOrdersList}>
        <div
          className={s.relatedOrderItem}
          onClick={() => router.push("/operator/orders/ORD-002")}
        >
          <span className={s.relatedOrderId}>ORD-002</span>
          <span className={s.relatedOrderType}>Корректировка</span>
          <span className={s.relatedOrderDate}>16.11.2024</span>
        </div>
        <div
          className={s.relatedOrderItem}
          onClick={() => router.push("/operator/orders/ORD-003")}
        >
          <span className={s.relatedOrderId}>ORD-003</span>
          <span className={s.relatedOrderType}>Дополнительная услуга</span>
          <span className={s.relatedOrderDate}>17.11.2024</span>
        </div>
      </div>
    </section>
  );
}
