import React from "react";
import NotificationStats from "./NotificationStats";
import NotificationTable from "./NotificationTable";
import s from "../styles/Notifications.module.scss";

export default function Notifications() {
  return (
    <div className={s.notifications}>
      <NotificationStats />
      <NotificationTable />
    </div>
  );
}

