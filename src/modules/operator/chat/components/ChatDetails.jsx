"use client";
import React from "react";
import { Button } from "@/ui";
import { MdClose, MdDownload } from "react-icons/md";
import s from "../styles/ChatDetails.module.scss";

const FieldList = ({ fields }) => {
  if (!fields?.length) return null;

  return fields.map((field) => (
    <div key={field.label} className={s.field}>
      <span className={s.label}>{field.label}</span>
      <span className={s.value}>{field.value}</span>
    </div>
  ));
};

const getToneClass = (prefix, tone) => {
  if (!tone) return "";
  const normalized = tone.charAt(0).toUpperCase() + tone.slice(1);
  return s[`${prefix}${normalized}`] || "";
};

export default function ChatDetails({
  className,
  onClose,
  details,
}) {
  if (!details) {
    return null;
  }

  const { request, client, service, finance, files = [], actions = [] } = details;

  return (
    <div className={`${s.details} ${className || ""}`}>
      <div className={s.header}>
        <h3 className={s.title}>Детали заявки</h3>
        <button className={s.closeButton} onClick={onClose}>
          <MdClose size={20} />
        </button>
      </div>

      <div className={s.content}>
        {request && (
          <div className={s.section}>
            <div className={s.field}>
              <span className={s.label}>Номер заявки</span>
              <span className={s.value}>{request.number}</span>
            </div>
            {request.status && (
              <div className={s.field}>
                <span className={s.label}>Статус</span>
                <span className={`${s.statusBadge} ${getToneClass("status", request.status.tone)}`}>
                  {request.status.label}
                </span>
              </div>
            )}
            {request.owner && (
              <div className={s.field}>
                <span className={s.label}>Ответственный</span>
                <span className={s.value}>{request.owner}</span>
              </div>
            )}
            {request.sla && (
              <div className={s.field}>
                <span className={s.label}>SLA</span>
                <span className={`${s.slaText} ${getToneClass("sla", request.sla.tone)}`}>
                  {request.sla.label}
                </span>
              </div>
            )}
          </div>
        )}

        {client && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Клиент</h4>
            {client.name && (
              <div className={s.clientInfo}>
                <span className={s.clientName}>{client.name}</span>
                {client.type && <span className={s.clientType}>{client.type}</span>}
              </div>
            )}
            {client.contacts?.length && (
              <div className={s.contactInfo}>
                {client.contacts.map((contact) => (
                  <div key={contact.label} className={s.contactItem}>
                    <span className={s.contactLabel}>{contact.label}:</span>
                    <span className={s.contactValue}>{contact.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {service?.length > 0 && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Услуга</h4>
            <FieldList fields={service} />
          </div>
        )}

        {finance?.length > 0 && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Финансы</h4>
            <FieldList fields={finance} />
          </div>
        )}

        {files.length > 0 && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Файлы</h4>
            <div className={s.filesList}>
              {files.map((file) => (
                <div key={file.name} className={s.fileItem}>
                  <span className={s.fileName}>{file.name}</span>
                  {file.size && <span className={s.fileSize}>{file.size}</span>}
                  <button className={s.downloadButton}>
                    <MdDownload size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {actions.length > 0 && (
          <div className={s.actions}>
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant={action.variant || "primary"}
                  icon={Icon}
                  className={s.actionButton}
                  disabled={action.disabled}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
