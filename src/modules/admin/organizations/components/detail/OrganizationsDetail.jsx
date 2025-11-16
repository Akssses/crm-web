import React from "react";
import HeaderOrganizations from "./HeaderOrganizations";
import s from "../../styles/OrganizationsDetail.module.scss";
import MainInfo from "./MainInfo";
import Finance from "./Finance";
import { OrdersTable } from "@/modules/admin/users/components/Table";

export default function OrganizationsDetail() {
  return (
    <div className={s.main}>
      <HeaderOrganizations />
      <div className={s.flex}>
        <MainInfo />
        <Finance />
      </div>
      <OrdersTable />
    </div>
  );
}
