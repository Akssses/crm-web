"use client";
import React, { useState } from "react";
import s from "../styles/CRMStructure.module.scss";
import { Input, Select } from "@/ui";
import { MdDelete } from "react-icons/md";
import { TiPlus } from "react-icons/ti";

export default function CRMStructure() {
  const [mappings, setMappings] = useState([
    {
      id: 1,
      field: "Tariff",
      example: "12000 RUB",
      mapping: "tariff_base",
      type: "number",
      comment: "",
    },
    {
      id: 2,
      field: "YQ",
      example: "2000",
      mapping: "tax_yq",
      type: "number",
      comment: "можно редактировать",
    },
    {
      id: 3,
      field: "YR",
      example: "1000",
      mapping: "tax_yr",
      type: "number",
      comment: "можно редактировать",
    },
    {
      id: 4,
      field: "Airport Tax",
      example: "800",
      mapping: "tax_xt",
      type: "number",
      comment: "",
    },
    {
      id: 5,
      field: "TAX-4900",
      example: "4900",
      mapping: "tax_supplier_raw",
      type: "string",
      comment: "без разабики",
    },
    {
      id: 6,
      field: "Total",
      example: "15800",
      mapping: "supplier_total",
      type: "number",
      comment: "",
    },
    {
      id: 7,
      field: "Passenger",
      example: "Ivanov I",
      mapping: "passenger_name",
      type: "number",
      comment: "нельзя править",
    },
  ]);

  const typeOptions = [
    { value: "number", label: "число" },
    { value: "string", label: "строка" },
    { value: "date", label: "дата" },
  ];

  const handleDeleteMapping = (id) => {
    setMappings(mappings.filter((m) => m.id !== id));
  };

  const handleAddMapping = () => {
    setMappings([
      ...mappings,
      {
        id: Math.max(...mappings.map((m) => m.id), 0) + 1,
        field: "",
        example: "",
        mapping: "",
        type: "number",
        comment: "",
      },
    ]);
  };

  const handleUpdateMapping = (id, field, value) => {
    setMappings(
      mappings.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <div className={s.container}>
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Структура CRM (куда что попадает)</h2>

        <div className={s.tableContainer}>
          <div className={s.tableHeader}>
            <span className={s.col1}>Поле поставщика</span>
            <span className={s.col1}>Пример</span>
            <span className={s.col1}>Маппинг → CRM</span>
            <span className={s.col1}>Тип</span>
            <span className={s.col1}>Комментарий</span>
            <span className={s.col1}>Действие</span>
          </div>

          <div className={s.tableBody}>
            {mappings.map((mapping) => (
              <div key={mapping.id} className={s.tableRow}>
                <span className={s.col1}>
                  <Input
                    value={mapping.field}
                    onChange={(val) =>
                      handleUpdateMapping(mapping.id, "field", val)
                    }
                    placeholder="Поле"
                  />
                </span>

                <span className={s.col2}>
                  <Input
                    value={mapping.example}
                    onChange={(val) =>
                      handleUpdateMapping(mapping.id, "example", val)
                    }
                    placeholder="Пример"
                  />
                </span>

                <span className={s.col3}>
                  <Input
                    value={mapping.mapping}
                    onChange={(val) =>
                      handleUpdateMapping(mapping.id, "mapping", val)
                    }
                    placeholder="Маппинг"
                  />
                </span>

                <span className={s.col2}>
                  <Select
                    options={typeOptions}
                    value={mapping.type}
                    onChange={(val) =>
                      handleUpdateMapping(mapping.id, "type", val)
                    }
                  />
                </span>

                <span className={s.col4}>
                  <Input
                    value={mapping.comment}
                    onChange={(val) =>
                      handleUpdateMapping(mapping.id, "comment", val)
                    }
                    placeholder="Комментарий"
                  />
                </span>

                <button
                  className={s.deleteBtn}
                  onClick={() => handleDeleteMapping(mapping.id)}
                  title="Удалить"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* <button className={s.addMappingBtn} onClick={handleAddMapping}>
          <TiPlus size={18} />
          Добавить маппинг
        </button> */}
      </section>
    </div>
  );
}
