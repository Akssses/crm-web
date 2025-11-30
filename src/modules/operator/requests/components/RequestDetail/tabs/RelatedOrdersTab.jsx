"use client";

import React from "react";
import { useRouter } from "next/navigation";
import s from "../../../styles/RequestDetail.module.scss";

export default function RelatedOrdersTab({ request }) {
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
          <span className={s.relatedOrderDate}>25.10.2025</span>
        </div>
        <div
          className={s.relatedOrderItem}
          onClick={() => router.push("/operator/orders/ORD-003")}
        >
          <span className={s.relatedOrderId}>ORD-003</span>
          <span className={s.relatedOrderType}>Дополнительная услуга</span>
          <span className={s.relatedOrderDate}>26.10.2025</span>
        </div>
      </div>
    </section>
  );
}
