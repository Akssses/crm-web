import React from "react";
import s from "../styles/Profile.module.scss";
import MyProfile from "./MyProfile";
import PersonalData from "./PersonalData";
import Safety from "./Safety";
import Integrations from "./Integrations";

export default function Profile() {
  return (
    <div className={s.main}>
      <MyProfile />
      <div className={s.flex}>
        <PersonalData />
        <Safety />
      </div>
      <Integrations />
    </div>
  );
}
