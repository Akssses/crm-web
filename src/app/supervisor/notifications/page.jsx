"use client";

import dynamic from "next/dynamic";

const Notifications = dynamic(
  () => import("@/modules/operator/notifications/components/Notifications"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SupervisorNotificationsPage() {
  return <Notifications />;
}
