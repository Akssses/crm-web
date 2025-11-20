import React from "react";
import s from "./StatCard.module.scss";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";

export default function StatCard({
  icon: Icon,
  title = "",
  change = 0,
  trend = "down",
  unit = "",
}) {
  const isNegative = trend === "down" || change < 0;
  const absChange = Math.abs(change);

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
      <div
        className={`${s.changeSection} ${isNegative ? s.negative : s.positive}`}
      >
        {isNegative ? (
          <MdOutlineArrowDownward size={16} className={s.trendIcon} />
        ) : (
          <MdOutlineArrowUpward size={16} className={s.trendIcon} />
        )}
        <span className={s.changeText}>
          {isNegative ? "-" : "+"}
          {absChange}%
        </span>
      </div>
    </div>
  );
}
