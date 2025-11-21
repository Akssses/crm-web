import React from "react";
import s from "../styles/Dashboard.module.scss";
import Header from "./Header";
import State from "./State";
import MyRequests from "./MyRequests";
import MyOrders from "./MyOrders";
import Efficiency from "./Efficiency";
import Notifications from "./Notifications";
import MyTasks from "./MyTasks";

export default function Dashboard() {
  return (
    <div className={s.dashboard}>
      <Header />
      <State />
      <div className={s.firstBlock}>
        <div className={s.firstBlockChildMain}>
          <MyRequests />
          <div className={s.firstBlockChild}>
            <MyOrders />
            <Efficiency />
          </div>
        </div>

        <div className={s.secondBlock}>
          <Notifications />
          <MyTasks />
        </div>
      </div>
    </div>
  );
}
