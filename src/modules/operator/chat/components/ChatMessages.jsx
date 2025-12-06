"use client";
import React, { useMemo, useState } from "react";
import { Button, Textarea } from "@/ui";
import { MdAttachFile, MdSend, MdInfoOutline, MdArrowBack } from "react-icons/md";
import s from "../styles/ChatMessages.module.scss";
import { channelMeta, MESSAGE_CHANNELS } from "../constants/roleConfigs";

const statusLabels = {
  sent: "Отправлено",
  delivered: "Доставлено",
  read: "Прочитано",
  error: "Ошибка",
};

const toneClass = (prefix, tone) => {
  if (!tone) return "";
  const normalized = tone.charAt(0).toUpperCase() + tone.slice(1);
  return s[`${prefix}${normalized}`] || "";
};

export default function ChatMessages({
  className,
  isDetailsOpen,
  onOpenDetails,
  onBack,
  isMobile,
  context,
  messages = [],
  messageTypes = [],
  visibleChannels = [],
  permissions = {},
  headerActions = [],
}) {
  const [activeMessageType, setActiveMessageType] = useState(
    messageTypes[0]?.id || null
  );
  const [draft, setDraft] = useState("");

  const filteredMessages = useMemo(() => {
    if (!visibleChannels?.length) return messages;
    return messages.filter((msg) =>
      msg.channel ? visibleChannels.includes(msg.channel) : true
    );
  }, [messages, visibleChannels]);

  const composerEnabled = permissions.canSend && messageTypes.length > 0;
  const placeholder =
    channelMeta[activeMessageType]?.placeholder ||
    "Сообщение...";

  const handleSend = () => {
    if (!draft.trim()) return;
    // Future integration: send via transport.
    setDraft("");
  };

  const getMessageClass = (msg) => {
    const key = msg.variant || msg.channel || "client";
    return s[`message-${key}`] || "";
  };

  const renderMessageMeta = (msg) => {
    const status = msg.status ? statusLabels[msg.status] : null;
    const channelLabel = msg.channel ? channelMeta[msg.channel]?.label : null;

    if (!status && !channelLabel) {
      return null;
    }

    return (
      <div className={s.messageMeta}>
        {channelLabel && <span className={s.messageChannel}>{channelLabel}</span>}
        {status && (
          <span className={`${s.messageStatus} ${s[`messageStatus-${msg.status}`] || ""}`}>
            {status}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={`${s.messages} ${className || ""}`}>
      <div className={s.header}>
        <div className={s.headerLeft}>
          {isMobile && (
            <button className={s.backButton} onClick={onBack}>
              <MdArrowBack size={20} />
            </button>
          )}
          <div className={s.chatInfo}>
            <h3 className={s.clientName}>{context?.clientName}</h3>
            <span className={s.orderInfo}>
              {context?.orderId}
              {context?.title ? ` • ${context.title}` : ""}
            </span>
            {context?.channelSummary && (
              <span className={s.channelSummary}>{context.channelSummary}</span>
            )}
          </div>
        </div>
        <div className={s.headerRight}>
          <div className={s.badges}>
            {context?.status && (
              <span
                className={`${s.statusBadge} ${toneClass("status", context.status.tone)}`}
              >
                {context.status.label}
              </span>
            )}
            {context?.sla && (
              <span
                className={`${s.slaBadge} ${toneClass("sla", context.sla.tone)}`}
              >
                {context.sla.label}
              </span>
            )}
          </div>
          {headerActions?.length > 0 && (
            <div className={s.headerActions}>
              {headerActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button key={action.id} className={s.headerAction}>
                    {Icon && <Icon size={16} />}
                    {action.label}
                  </button>
                );
              })}
            </div>
          )}
          {!isDetailsOpen && (
            <button
              className={s.detailsButton}
              onClick={onOpenDetails}
              title="Открыть детали заявки"
            >
              <MdInfoOutline size={20} />
            </button>
          )}
        </div>
      </div>

      <div className={s.messagesList}>
        {filteredMessages.map((msg) => (
          <div key={msg.id} className={`${s.message} ${getMessageClass(msg)}`}>
            {msg.channel === MESSAGE_CHANNELS.SYSTEM ? (
              <div className={s.systemMessage}>{msg.text}</div>
            ) : (
              <>
                <div className={s.messageHeader}>
                  {msg.author && <span className={s.author}>{msg.author}</span>}
                  <span className={s.time}>{msg.time}</span>
                </div>
                <div className={s.messageBubble}>
                  <p>{msg.text}</p>
                  {msg.attachments?.length > 0 && (
                    <div className={s.attachments}>
                      {msg.attachments.map((file) => (
                        <span key={file.name} className={s.attachment}>
                          {file.name} • {file.size}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {renderMessageMeta(msg)}
                {msg.actions && (
                  <div className={s.messageActions}>
                    {msg.actions.map((action) => (
                      <button key={action} className={s.actionLink}>
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {composerEnabled ? (
        <div className={s.inputSection}>
          {messageTypes.length > 1 && (
            <div className={s.messageTypeTabs}>
              {messageTypes.map((type) => (
                <button
                  key={type.id}
                  className={`${s.typeTab} ${activeMessageType === type.id ? s.active : ""}`}
                  onClick={() => setActiveMessageType(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
          <div className={s.inputWrapper}>
            <Textarea
              placeholder={placeholder}
              value={draft}
              onChange={setDraft}
              className={s.textarea}
              minRows={2}
              maxRows={6}
            />
            <div className={s.inputActions}>
              {permissions.canUploadFiles && (
                <button className={s.actionIconButton}>
                  <MdAttachFile size={20} />
                </button>
              )}
              <Button
                variant="primary"
                icon={MdSend}
                onClick={handleSend}
                className={s.sendButton}
                disabled={!draft.trim()}
              />
            </div>
          </div>
          {permissions.note && <p className={s.permissionNote}>{permissions.note}</p>}
        </div>
      ) : (
        <div className={s.readOnlyBanner}>
          <p>{permissions.note || "Отправка сообщений недоступна для этой роли."}</p>
        </div>
      )}
    </div>
  );
}
