import React from "react";
import s from "./Container.module.scss";

export default function Container({
  children,
  variant = "default",
  size = "md",
  padding = "md",
  className = "",
}) {
  const containerClasses = [
    s.container,
    s[`variant-${variant}`],
    s[`size-${size}`],
    s[`padding-${padding}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={containerClasses}>{children}</div>;
}
