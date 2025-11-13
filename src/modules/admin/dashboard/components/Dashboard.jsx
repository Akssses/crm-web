import React from "react";
import s from "../styles/Dashboard.module.scss";
import Date from "./Date";
import State from "./State";
import Schedule from "./Schedule";
import ScheduleOrder from "./ScheduleOrder";
import SuppliersTable from "./SuppliersTable";
import Fast from "./Fast";
import Systema from "./Systema";

export default function Dashboard() {
  return (
    <div className={s.dashboard}>
      <Date date={"Feb 28, 2024"} />
      <State />
      <div className={s.flex}>
        <Schedule />
        <ScheduleOrder />
      </div>
      <div className={s.flex}>
        <div className={s.width}>
          <SuppliersTable />
        </div>
        <div className={s.width1}>
          <Fast />
          <Systema />
        </div>
      </div>
    </div>
  );
}
