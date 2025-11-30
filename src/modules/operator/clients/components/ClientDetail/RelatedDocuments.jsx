"use client";
import React from "react";
import { Container, Button } from "@/ui";
import { MdDescription, MdFlightTakeoff, MdHealthAndSafety, MdPermIdentity, MdDownload } from "react-icons/md";
import s from "../../styles/RelatedDocuments.module.scss";

export default function RelatedDocuments() {
  const sections = [
    {
      title: "Визы",
      icon: MdFlightTakeoff,
      items: [
        { name: "Шенген (Италия)", info: "до 10.01.2025", status: "active" },
        { name: "США (B1/B2)", info: "до 14.05.2029", status: "active" }
      ]
    },
    {
      title: "Страховки",
      icon: MdHealthAndSafety,
      items: [
        { name: "Ингосстрах", info: "до 31.12.2024", status: "active" }
      ]
    },
    {
      title: "Паспорт",
      icon: MdPermIdentity,
      items: [
        { name: "Загранпаспорт", info: "v3 • обновлен 21.10.2025", status: "active" }
      ]
    }
  ];

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Связанные документы</h3>
      
      <div className={s.grid}>
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={idx} className={s.section}>
              <div className={s.sectionHeader}>
                <div className={s.iconWrapper}>
                  <Icon size={18} />
                </div>
                <span className={s.sectionTitle}>{section.title}</span>
              </div>
              
              <div className={s.list}>
                {section.items.map((item, i) => (
                  <div key={i} className={s.item}>
                    <div className={s.itemInfo}>
                      <span className={s.itemName}>{item.name}</span>
                      <span className={s.itemMeta}>{item.info}</span>
                    </div>
                    <button className={s.downloadBtn}>
                      <MdDownload size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
