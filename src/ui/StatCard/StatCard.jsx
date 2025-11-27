"use client";

import React from "react";
import s from "./StatCard.module.scss";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";

export default function StatCard({
  icon: Icon,
  title = "",
  change = 0,
  trend = "down",
  unit = "",
  color = null || "#2563eb",
  onClick = null,
  ariaLabel = "",
}) {
  const isNegative = trend === "down" || change < 0;
  const absChange = Math.abs(change);
  const isInteractive = typeof onClick === "function";

  const handleKeyDown = (event) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={`${s.block} ${isInteractive ? s.interactive : ""}`}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={handleKeyDown}
      aria-label={isInteractive ? ariaLabel || title : undefined}
    >
      <div className={s.card}>
        <div>
          <div className={s.iconWrapper}>
            {Icon && <Icon className={s.icon} color={color} />}
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
