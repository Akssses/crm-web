"use client";
import React, { useState } from "react";
import s from "../styles/Organizations.module.scss";
import { CiFilter } from "react-icons/ci";
import { Button, Container, Input } from "@/ui";
import { TiPlus } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { UsersTable } from "../../users/components/Table";
import AddOrgModal from "./AddOrgModal";

export default function Organizations() {
  const [formData, setFormData] = useState({
    filter: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOrganization = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.users}>
      <div className={s.justi}>
        <Button variant="outline" icon={CiFilter}>
          Filter
        </Button>
        <div className={s.flex}>
          <Input
            icon={CiSearch}
            label=""
            placeholder="Поиск..."
            value={formData.filter}
            onChange={(val) => handleChange("filter", val)}
          />
          <Button icon={TiPlus} onClick={() => setIsModalOpen(true)}>
            Добавить организацию
          </Button>
        </div>
      </div>
      <UsersTable />
      <AddOrgModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrganization}
      />
    </div>
  );
}
