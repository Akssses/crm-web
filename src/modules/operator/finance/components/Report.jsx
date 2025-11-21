import React from "react";
import ShiftInfo from "./ShiftInfo";
import ShiftOrdersTable from "./ShiftOrdersTable";
import s from "../styles/Report.module.scss";

export default function Report() {
  return (
    <div className={s.report}>
      <ShiftInfo />
      <ShiftOrdersTable />
    </div>
  );
}

