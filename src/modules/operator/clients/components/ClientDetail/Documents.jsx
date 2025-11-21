"use client";
import React from "react";
import { Container, Button } from "@/ui";
import { MdUpload, MdPictureAsPdf, MdImage } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import s from "../../styles/Documents.module.scss";

export default function Documents() {
  const documents = [
    {
      id: 1,
      name: "Договор",
      type: "PDF",
      size: "2.1 MB",
      icon: MdPictureAsPdf,
      iconColor: "#ef4444",
    },
    {
      id: 2,
      name: "Паспорт",
      type: "JPG",
      size: "1.5 MB",
      icon: MdImage,
      iconColor: "#10b981",
    },
    {
      id: 3,
      name: "Счет",
      type: "PDF",
      size: "890 KB",
      icon: MdPictureAsPdf,
      iconColor: "#ef4444",
    },
  ];

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>Документы</h3>
        <Button variant="primary" icon={MdUpload}>
          Загрузить документ
        </Button>
      </div>
      <div className={s.documents}>
        {documents.map((doc) => {
          const Icon = doc.icon;
          return (
            <div key={doc.id} className={s.documentCard}>
              <div
                className={s.iconWrapper}
                style={{ background: `${doc.iconColor}15` }}
              >
                <Icon size={24} style={{ color: doc.iconColor }} />
              </div>
              <div className={s.content}>
                <span className={s.documentName}>{doc.name}</span>
                <span className={s.documentInfo}>
                  {doc.type}, {doc.size}
                </span>
              </div>
            </div>
          );
        })}
        <div className={`${s.documentCard} ${s.addCard}`}>
          <MdAdd size={24} className={s.addIcon} />
        </div>
      </div>
    </Container>
  );
}

