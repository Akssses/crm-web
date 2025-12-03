"use client";

import React from "react";
import {
  IoStar,
  IoStarOutline,
  IoTrashOutline,
  IoTimeOutline,
} from "react-icons/io5";
import {
  IoChatbubbleEllipsesOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoAlertCircleOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { MdOutlineReceiptLong } from "react-icons/md";
import s from "../styles/Notifications.module.scss";

const ICON_MAP = {
  message: IoChatbubbleEllipsesOutline,
  status: IoCheckmarkCircle,
  invoice: MdOutlineReceiptLong,
  document: IoDocumentTextOutline,
  reminder: IoAlertCircleOutline,
  system: IoNotificationsOutline,
};

const ICON_COLOR_MAP = {
  message: "#3b82f6",
  status: "#10b981",
  invoice: "#3b82f6",
  document: "#6b7280",
  reminder: "#f59e0b",
  system: "#6b7280",
};

const STATUS_CONFIG = {
  "в работе": { color: "#3b82f6", bg: "#dbeafe" },
  выполнено: { color: "#10b981", bg: "#d1fae5" },
};

export default function NotificationItem({
  type = "message",
  title,
  description,
  time,
  tag,
  unread = false,
  important = false,
  starred = false,
  status,
  orderId,
  comment,
  deadline,
  onStar,
  onDelete,
  onClick,
  onOrderClick,
}) {
  const Icon = ICON_MAP[type] || IoNotificationsOutline;
  const iconColor = ICON_COLOR_MAP[type] || "#6b7280";

  return (
    <div
      className={`${s.notificationItem} ${unread ? s.unread : ""} ${
        important ? s.important : ""
      }`}
      onClick={onClick}
    >
      <div
        className={s.iconWrapper}
        style={{ backgroundColor: `${iconColor}15` }}
      >
        <Icon size={24} style={{ color: iconColor }} />
      </div>

      <div className={s.content}>
        <div className={s.header}>
          <h4 className={s.title}>
            {title}
            {unread && <span className={s.unreadDot}></span>}
          </h4>
          {status && (
            <span
              className={s.statusBadge}
              style={{
                backgroundColor: STATUS_CONFIG[status]?.bg || "#f3f4f6",
                color: STATUS_CONFIG[status]?.color || "#6b7280",
              }}
            >
              {status}
            </span>
          )}
        </div>
        <p className={s.description}>{description}</p>

        {comment && (
          <div className={s.comment}>
            <p>{comment}</p>
          </div>
        )}

        <div className={s.meta}>
          <span className={s.time}>{time}</span>
          {tag && <span className={s.tag}>{tag}</span>}
          {orderId && (
            <button
              className={s.orderLink}
              onClick={(e) => {
                e.stopPropagation();
                onOrderClick?.(orderId);
              }}
            >
              {orderId}
            </button>
          )}
          {deadline && (
            <span className={s.deadline}>
              <IoTimeOutline size={14} />
              {deadline}
            </span>
          )}
        </div>
      </div>

      <div className={s.actions}>
        <button
          className={s.actionBtn}
          onClick={(e) => {
            e.stopPropagation();
            onStar?.();
          }}
        >
          {starred ? (
            <IoStar size={20} style={{ color: "#3b82f6" }} />
          ) : (
            <IoStarOutline size={20} />
          )}
        </button>
        <button
          className={s.actionBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          <IoTrashOutline size={20} />
        </button>
      </div>
    </div>
  );
}
