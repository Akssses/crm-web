"use client";

import dynamic from "next/dynamic";

const NotificationsList = dynamic(
  () => import("@/modules/customer/notifications/components/NotificationsList"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function CustomerNotificationsPage() {
  return <NotificationsList />;
}
