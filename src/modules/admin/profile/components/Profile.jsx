import React from "react";
import MyProfile from "./MyProfile";
import PersonalData from "./PersonalData";
import s from "../styles/Profile.module.scss";
import Safety from "./Safety";

export default function Profile() {
  return (
    <div className={s.main}>
      <MyProfile />
      <div className={s.flex}>
        <PersonalData />
        <Safety />
      </div>
    </div>
  );
}
