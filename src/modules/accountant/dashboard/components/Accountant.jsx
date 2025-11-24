import React from "react";
import s from "../styles/Accountant.module.scss";
import { Button } from "@/ui";
import { CiCalendar } from "react-icons/ci";
import State from "./State";
import Schedule from "@/modules/admin/dashboard/components/Schedule";
import ScheduleOrder from "@/modules/admin/dashboard/components/ScheduleOrder";

export default function Accountant() {
  return (
    <div className={s.main}>
      <div>
        <Button variant="outline" icon={CiCalendar}>
          Feb 28, 2024
        </Button>
      </div>{" "}
      <State />
      <div className={s.flex}>
        <Schedule />
        <ScheduleOrder />
      </div>
    </div>
  );
}
