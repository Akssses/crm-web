import React from "react";
import s from "./State.module.scss";

export default function State({ icon: Icon, title = "", unit = "" }) {
  return (
    <div className={s.block}>
      <div className={s.card}>
        <div>
          <div className={s.iconWrapper}>
            {Icon && <Icon className={s.icon} />}
          </div>
          <div className={s.content}>
            <span className={s.title}>{title}</span>
            <p className={s.unit}>{unit}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
