"use client";
import React, { useState } from "react";
import { UsersTable } from "./Table";
import s from "../styles/Users.module.scss";
import { CiFilter } from "react-icons/ci";
import { Button } from "@/ui";
import { TiPlus } from "react-icons/ti";
import AddUserModal from "./AddUserModal";
import AddTaskModal from "./AddTaskModal";

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTask, SetIsTask] = useState(false);

  const handleAddUser = (userData) => {
    setIsModalOpen(false);
  };

  const handleAddTask = (userData) => {
    SetIsTask(false);
  };
  return (
    <div className={s.users}>
      <div className={s.justi}>
        <Button variant="outline" icon={CiFilter}>
          Filter
        </Button>
        <div className={s.flex}>
          <Button
            icon={TiPlus}
            onClick={() => SetIsTask(true)}
            variant="bgyellow"
          >
            Добавить задачу
          </Button>
          <Button icon={TiPlus} onClick={() => setIsModalOpen(true)}>
            Добавить пользователя
          </Button>
        </div>
      </div>
      <UsersTable />
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />
      <AddTaskModal
        isOpen={isTask}
        onClose={() => SetIsTask(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
}
